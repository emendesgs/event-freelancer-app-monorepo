"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const seedUsers = async () => {
    try {
        console.log('Seeding users...');
        const db = await (0, connection_1.default)();
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
            const passwordHash = await bcryptjs_1.default.hash(user.password, 12);
            const userId = (0, uuid_1.v4)();
            await db.run(`INSERT OR IGNORE INTO users (id, email, password_hash, full_name, phone, bio, location, skills, rating, total_reviews, is_verified, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, [
                userId,
                user.email,
                passwordHash,
                user.full_name,
                user.phone,
                user.bio,
                user.location,
                user.skills,
                4.5,
                10,
                1
            ]);
        }
        console.log('Users seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
};
const seedJobs = async () => {
    try {
        console.log('Seeding jobs...');
        const db = await (0, connection_1.default)();
        const categoriesResult = await db.all('SELECT id, name FROM categories');
        const categories = categoriesResult;
        const usersResult = await db.all('SELECT id FROM users LIMIT 2');
        const users = usersResult;
        if (categories.length === 0 || users.length === 0) {
            console.log('No categories or users found. Skipping job seeding.');
            return;
        }
        const jobs = [
            {
                title: 'Fotógrafo para Casamento',
                description: 'Precisamos de um fotógrafo profissional para capturar os momentos especiais do nosso casamento. Evento será realizado em São Paulo com aproximadamente 200 convidados.',
                category_id: categories.find((c) => c.name === 'Fotografia')?.id || categories[0].id,
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
                category_id: categories.find((c) => c.name === 'Decoração')?.id || categories[0].id,
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
                category_id: categories.find((c) => c.name === 'Som e Iluminação')?.id || categories[0].id,
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
            const jobId = (0, uuid_1.v4)();
            await db.run(`INSERT OR IGNORE INTO jobs (id, user_id, category_id, title, description, event_date, event_time, location, budget_min, budget_max, budget_type, requirements, status, is_featured, views_count, applications_count, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, [
                jobId,
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
                Math.random() > 0.7 ? 1 : 0,
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 10)
            ]);
        }
        console.log('Jobs seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding jobs:', error);
        throw error;
    }
};
const seedApplications = async () => {
    try {
        console.log('Seeding applications...');
        const db = await (0, connection_1.default)();
        const jobsResult = await db.all('SELECT id FROM jobs LIMIT 3');
        const jobs = jobsResult;
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
            const applicationId = (0, uuid_1.v4)();
            await db.run(`INSERT OR IGNORE INTO applications (id, job_id, user_id, proposal, proposed_price, estimated_duration, portfolio_links, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, [
                applicationId,
                jobId,
                userId,
                application.proposal,
                application.proposed_price,
                application.estimated_duration,
                application.portfolio_links,
                'pending'
            ]);
        }
        console.log('Applications seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding applications:', error);
        throw error;
    }
};
const seedDatabase = async () => {
    try {
        await seedUsers();
        await seedJobs();
        await seedApplications();
        console.log('Database seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Database seeding failed:', error);
        process.exit(1);
    }
};
if (require.main === module) {
    seedDatabase();
}
//# sourceMappingURL=seed.js.map