import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      full_name: 'John Doe',
      password_hash: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      full_name: 'Jane Smith',
      password_hash: 'password123',
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Fotografia',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Design',
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Vídeo',
    },
  });

  // Create Jobs
  await prisma.job.createMany({
    data: [
      {
        title: 'Fotógrafo de Eventos',
        description: 'Buscamos fotógrafo experiente para capturar momentos especiais em eventos corporativos e sociais.',
        budget_type: 'fixed',
        budget_min: 800,
        budget_max: 1200,
        location: 'São Paulo, SP',
        user_id: user1.id,
        category_id: category1.id,
      },
      {
        title: 'Designer Gráfico',
        description: 'Designer criativo para criação de materiais promocionais e identidade visual.',
        budget_type: 'hourly',
        budget_min: 60,
        budget_max: 80,
        location: 'Remoto',
        user_id: user2.id,
        category_id: category2.id,
      },
      {
        title: 'Videomaker',
        description: 'Videomaker para produção de vídeos corporativos e institucionais.',
        budget_type: 'fixed',
        budget_min: 1500,
        budget_max: 2500,
        location: 'Rio de Janeiro, RJ',
        user_id: user1.id,
        category_id: category3.id,
      },
    ],
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Câmera DSLR',
        description: 'Câmera profissional para fotos e vídeos de alta qualidade.',
        price: 1200.00,
        price_type: 'sale',
        user_id: user1.id,
        category_id: category1.id,
      },
      {
        name: 'Lente 50mm f/1.8',
        description: 'Lente de foco fixo ideal para retratos e condições de pouca luz.',
        price: 250.00,
        price_type: 'sale',
        user_id: user1.id,
        category_id: category1.id,
      },
      {
        name: 'Tripé Profissional',
        description: 'Tripé robusto e estável para todos os tipos de terreno.',
        price: 150.00,
        price_type: 'sale',
        user_id: user2.id,
        category_id: category1.id,
      },
      {
        name: 'Microfone de Lapela',
        description: 'Microfone discreto para gravação de áudio de alta fidelidade.',
        price: 80.00,
        price_type: 'sale',
        user_id: user1.id,
        category_id: category3.id,
      },
      {
        name: 'Kit de Iluminação de Estúdio',
        description: 'Conjunto completo de luzes para fotografia e vídeo em estúdio.',
        price: 450.00,
        price_type: 'rental',
        user_id: user2.id,
        category_id: category3.id,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });