"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const createTables = async () => {
    try {
        console.log('Creating database tables...');
        const db = await (0, connection_1.default)();
        await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT,
        bio TEXT,
        profile_image_url TEXT,
        location TEXT,
        skills TEXT,
        rating REAL DEFAULT 0.00,
        total_reviews INTEGER DEFAULT 0,
        is_verified INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        color TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        category_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        event_date TEXT,
        event_time TEXT,
        location TEXT,
        budget_min REAL,
        budget_max REAL,
        budget_type TEXT DEFAULT 'fixed',
        requirements TEXT,
        images TEXT,
        status TEXT DEFAULT 'open',
        is_featured INTEGER DEFAULT 0,
        views_count INTEGER DEFAULT 0,
        applications_count INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        category_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        price_type TEXT DEFAULT 'sale',
        rental_duration TEXT,
        condition TEXT,
        images TEXT,
        is_available INTEGER DEFAULT 1,
        location TEXT,
        views_count INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        proposal TEXT NOT NULL,
        proposed_price REAL,
        estimated_duration TEXT,
        portfolio_links TEXT,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE(job_id, user_id)
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        product_id TEXT NOT NULL,
        buyer_id TEXT NOT NULL,
        seller_id TEXT NOT NULL,
        quantity INTEGER DEFAULT 1,
        total_price REAL NOT NULL,
        rental_start_date TEXT,
        rental_end_date TEXT,
        status TEXT DEFAULT 'pending',
        shipping_address TEXT,
        payment_status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
        FOREIGN KEY (buyer_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (seller_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        reviewer_id TEXT NOT NULL,
        reviewed_user_id TEXT NOT NULL,
        job_id TEXT,
        product_id TEXT,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (reviewer_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (reviewed_user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE SET NULL,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        sender_id TEXT NOT NULL,
        receiver_id TEXT NOT NULL,
        content TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL,
        reference_id TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        job_id TEXT,
        product_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS contracts (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        freelancer_id TEXT NOT NULL,
        terms TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending', -- pending, active, completed, terminated
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
        FOREIGN KEY (freelancer_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS certifications (
        id TEXT PRIMARY KEY,
        freelancer_id TEXT NOT NULL,
        name TEXT NOT NULL,
        issuer TEXT NOT NULL,
        date_issued TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (freelancer_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        freelancer_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (freelancer_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        await db.exec(`
      CREATE TABLE IF NOT EXISTS social_links (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
        console.log('Database tables created successfully!');
    }
    catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
};
const createIndexes = async () => {
    try {
        console.log('Creating database indexes...');
        const db = await (0, connection_1.default)();
        const indexes = [
            'CREATE INDEX IF NOT EXISTS idx_jobs_category_id ON jobs(category_id)',
            'CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status)',
            'CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location)',
            'CREATE INDEX IF NOT EXISTS idx_jobs_event_date ON jobs(event_date)',
            'CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id)',
            'CREATE INDEX IF NOT EXISTS idx_products_price ON products(price)',
            'CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id)',
            'CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id)',
            'CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id)',
            'CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id)',
            'CREATE INDEX IF NOT EXISTS idx_reviews_reviewed_user_id ON reviews(reviewed_user_id)',
            'CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id)',
        ];
        for (const index of indexes) {
            await db.exec(index);
        }
        console.log('Database indexes created successfully!');
    }
    catch (error) {
        console.error('Error creating indexes:', error);
        throw error;
    }
};
const seedCategories = async () => {
    try {
        console.log('Seeding categories...');
        const db = await (0, connection_1.default)();
        const categories = [
            { name: 'Transporte', description: 'Serviços de transporte para eventos', icon: '🚚', color: '#FF6B6B' },
            { name: 'Montagem', description: 'Montagem e desmontagem de estruturas', icon: '🔨', color: '#4ECDC4' },
            { name: 'Som e Iluminação', description: 'Equipamentos de áudio e iluminação', icon: '🎵', color: '#45B7D1' },
            { name: 'Decoração', description: 'Decoração e cenografia', icon: '🎨', color: '#96CEB4' },
            { name: 'Fotografia', description: 'Serviços fotográficos', icon: '📸', color: '#FFEAA7' },
            { name: 'Buffet', description: 'Serviços de alimentação', icon: '🍽️', color: '#DDA0DD' },
            { name: 'Segurança', description: 'Serviços de segurança', icon: '🛡️', color: '#98D8C8' },
            { name: 'Equipamentos', description: 'Aluguel de equipamentos', icon: '⚙️', color: '#F7DC6F' },
        ];
        for (const category of categories) {
            await db.run('INSERT OR IGNORE INTO categories (id, name, description, icon, color) VALUES (?, ?, ?, ?, ?)', [crypto.randomUUID(), category.name, category.description, category.icon, category.color]);
        }
        console.log('Categories seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
};
const setupDatabase = async () => {
    try {
        await createTables();
        await createIndexes();
        await seedCategories();
        console.log('Database setup completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Database setup failed:', error);
        process.exit(1);
    }
};
if (require.main === module) {
    setupDatabase();
}
//# sourceMappingURL=setup.js.map