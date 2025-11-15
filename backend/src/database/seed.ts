import getDatabase from './connection';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const seedUsers = async () => {
  try {
    console.log('Seeding users...');
    const db = await getDatabase();

    const users = [
      {
        email: 'admin@eventfreelancer.com',
        password: 'admin123',
        full_name: 'Administrador',
        phone: '+55 11 99999-9999',
        bio: 'Administrador do sistema Event Freelancer',
        location: 'São Paulo, SP',
        skills: JSON.stringify(['Gestão', 'Administração', 'Eventos'])
      },
      {
        email: 'joao@eventfreelancer.com',
        password: 'joao123',
        full_name: 'João Silva',
        phone: '+55 11 88888-8888',
        bio: 'Fotógrafo profissional com 5 anos de experiência em eventos',
        location: 'Rio de Janeiro, RJ',
        skills: JSON.stringify(['Fotografia', 'Edição', 'Eventos Sociais'])
      },
      {
        email: 'maria@eventfreelancer.com',
        password: 'maria123',
        full_name: 'Maria Santos',
        phone: '+55 11 77777-7777',
        bio: 'Decoradora de eventos especializada em casamentos',
        location: 'Belo Horizonte, MG',
        skills: JSON.stringify(['Decoração', 'Cenografia', 'Casamentos'])
      }
    ];

    for (const user of users) {
      const passwordHash = await bcrypt.hash(user.password, 12);
      const userId = uuidv4();

      await db.run(
        `INSERT OR IGNORE INTO users (id, email, password_hash, full_name, phone, bio, location, skills, rating, total_reviews, is_verified, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [
          userId,
          user.email,
          passwordHash,
          user.full_name,
          user.phone,
          user.bio,
          user.location,
          user.skills,
          4.5, // rating
          10, // total_reviews
          1 // is_verified
        ]
      );
    }

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

const seedJobs = async () => {
  try {
    console.log('Seeding jobs...');
    const db = await getDatabase();

    // Get category IDs
    const categoriesResult = await db.all('SELECT id, name FROM categories');
    const categories = categoriesResult;

    // Get user IDs
    const usersResult = await db.all('SELECT id FROM users LIMIT 2');
    const users = usersResult;

    if (categories.length === 0 || users.length === 0) {
      console.log('No categories or users found. Skipping job seeding.');
      return;
    }

    const jobs = [
      {
        id: '1',
        title: 'Fotógrafo para Casamento',
        description: 'Precisamos de um fotógrafo profissional para capturar os momentos especiais do nosso casamento. Evento será realizado em São Paulo com aproximadamente 200 convidados.',
        category_id: categories.find((c: any) => c.name === 'Fotografia')?.id || categories[0].id,
        event_date: '2024-06-15',
        event_time: '18:00',
        location: 'São Paulo, SP',
        budget_min: 1500,
        budget_max: 3000,
        budget_type: 'fixed',
        requirements: JSON.stringify(['Experiência em casamentos', 'Equipamento profissional', 'Portfolio disponível'])
      },
      {
        title: 'Decoração para Evento Corporativo',
        description: 'Empresa precisa de serviço de decoração para evento corporativo de fim de ano. Tema: elegante e sofisticado.',
        category_id: categories.find((c: any) => c.name === 'Decoração')?.id || categories[0].id,
        event_date: '2024-12-20',
        event_time: '19:00',
        location: 'Rio de Janeiro, RJ',
        budget_min: 2000,
        budget_max: 5000,
        budget_type: 'fixed',
        requirements: JSON.stringify(['Experiência em eventos corporativos', 'Portfolio de trabalhos', 'Disponibilidade para reuniões'])
      },
      {
        title: 'Equipamentos de Som para Show',
        description: 'Precisamos de equipamentos de som profissionais para show ao ar livre com capacidade para 500 pessoas.',
        category_id: categories.find((c: any) => c.name === 'Som e Iluminação')?.id || categories[0].id,
        event_date: '2024-07-10',
        event_time: '20:00',
        location: 'Belo Horizonte, MG',
        budget_min: 800,
        budget_max: 1500,
        budget_type: 'hourly',
        requirements: JSON.stringify(['Equipamentos de qualidade profissional', 'Técnico disponível', 'Backup de equipamentos'])
      }
    ];

    for (const job of jobs) {
      const userId = users[Math.floor(Math.random() * users.length)].id;

      await db.run(
        `INSERT OR IGNORE INTO jobs (id, user_id, category_id, title, description, event_date, event_time, location, budget_min, budget_max, budget_type, requirements, status, is_featured, views_count, applications_count, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [
          job.id,  // Use the static ID from the jobs array
          userId,
          job.category_id,
          job.title,
          job.description,
          job.event_date,
          job.event_time,
          job.location,
          job.budget_min,
          job.budget_max,
          job.budget_type,
          job.requirements,
          'open',
          Math.random() > 0.7 ? 1 : 0, // 30% chance of being featured
          Math.floor(Math.random() * 100), // Random views
          Math.floor(Math.random() * 10) // Random applications
        ]
      );
    }

    console.log('Jobs seeded successfully!');
  } catch (error) {
    console.error('Error seeding jobs:', error);
    throw error;
  }
};

const seedApplications = async () => {
  try {
    console.log('Seeding applications...');
    const db = await getDatabase();

    // Get job IDs
    const jobsResult = await db.all('SELECT id FROM jobs LIMIT 3');
    const jobs = jobsResult;

    // Get user IDs (excluding job creators)
    const usersResult = await db.all('SELECT id FROM users LIMIT 2');
    const users = usersResult;

    if (jobs.length === 0 || users.length === 0) {
      console.log('No jobs or users found. Skipping application seeding.');
      return;
    }

    const applications = [
      {
        proposal: 'Tenho 5 anos de experiência em fotografia de casamentos. Possuo equipamento profissional e portfolio extenso. Posso oferecer pacote completo incluindo álbum digital e impresso.',
        proposed_price: 2500,
        estimated_duration: '8 horas',
        portfolio_links: JSON.stringify(['https://portfolio.com/joao', 'https://instagram.com/joaofotografo'])
      },
      {
        proposal: 'Sou decoradora especializada em eventos corporativos. Já trabalhei com grandes empresas e posso criar ambiente elegante e sofisticado conforme solicitado.',
        proposed_price: 3500,
        estimated_duration: '6 horas',
        portfolio_links: JSON.stringify(['https://portfolio.com/maria', 'https://behance.net/mariadecoradora'])
      }
    ];

    for (const application of applications) {
      const jobId = jobs[Math.floor(Math.random() * jobs.length)].id;
      const userId = users[Math.floor(Math.random() * users.length)].id;
      const applicationId = uuidv4();

      await db.run(
        `INSERT OR IGNORE INTO applications (id, job_id, user_id, proposal, proposed_price, estimated_duration, portfolio_links, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [
          applicationId,
          jobId,
          userId,
          application.proposal,
          application.proposed_price,
          application.estimated_duration,
          application.portfolio_links,
          'pending'
        ]
      );
    }

    console.log('Applications seeded successfully!');
  } catch (error) {
    console.error('Error seeding applications:', error);
    throw error;
  }
};

const seedProducts = async () => {
  try {
    console.log('Seeding products...');
    const db = await getDatabase();

    // Get category IDs
    const categoriesResult = await db.all('SELECT id, name FROM categories');
    const categories = categoriesResult;

    // Get user IDs
    const usersResult = await db.all('SELECT id FROM users LIMIT 3');
    const users = usersResult;

    if (categories.length === 0 || users.length === 0) {
      console.log('No categories or users found. Skipping product seeding.');
      return;
    }

    const products = [
      {
        name: 'Cadeira de Evento',
        description: 'Cadeira confortável para eventos.',
        price: 15.00,
        price_type: 'rental',
        condition: 'like_new',
        category_id: categories.find((c: any) => c.name === 'Equipamentos')?.id || categories[0].id,
        user_id: users[0].id,
      },
      {
        name: 'Mesa de Buffet',
        description: 'Mesa grande para buffet.',
        price: 50.00,
        price_type: 'rental',
        condition: 'good',
        category_id: categories.find((c: any) => c.name === 'Equipamentos')?.id || categories[0].id,
        user_id: users[1].id,
      },
      {
        name: 'Sistema de Som Completo',
        description: 'Sistema de som com dois alto-falantes e microfone.',
        price: 350.00,
        price_type: 'sale',
        condition: 'new',
        category_id: categories.find((c: any) => c.name === 'Som e Iluminação')?.id || categories[1].id,
        user_id: users[0].id,
      },
      {
        name: 'Projetor HD',
        description: 'Projetor de alta definição para apresentações.',
        price: 120.00,
        price_type: 'rental',
        condition: 'like_new',
        category_id: categories.find((c: any) => c.name === 'Som e Iluminação')?.id || categories[1].id,
        user_id: users[2].id,
      },
    ];

    for (const product of products) {
      const productId = uuidv4();

      await db.run(
        `INSERT OR IGNORE INTO products (id, user_id, category_id, name, description, price, price_type, condition, is_available, views_count, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [
          productId,
          product.user_id,
          product.category_id,
          product.name,
          product.description,
          product.price,
          product.price_type,
          product.condition,
          1, // is_available
          Math.floor(Math.random() * 200), // Random views
        ]
      );
    }

    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    await seedUsers();
    await seedJobs();
    await seedApplications();
    await seedProducts();
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}