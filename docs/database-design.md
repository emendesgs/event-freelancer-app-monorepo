# Design do Banco de Dados - Event Freelancer App

## Visão Geral
Sistema de freelancer para eventos com vagas, produtos, candidaturas e sistema de avaliações.

## Tabelas Principais

### 1. Users (Usuários)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  profile_image_url VARCHAR(500),
  location VARCHAR(255),
  skills TEXT[],
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Categories (Categorias de Eventos/Vagas)
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Jobs (Vagas/Eventos)
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_date DATE,
  event_time TIME,
  location VARCHAR(255),
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  budget_type VARCHAR(20) DEFAULT 'fixed', -- fixed, hourly, negotiable
  requirements TEXT[],
  images TEXT[],
  status VARCHAR(20) DEFAULT 'open', -- open, in_progress, completed, cancelled
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Products (Produtos para Aluguel/Venda)
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_type VARCHAR(20) DEFAULT 'sale', -- sale, rental
  rental_duration VARCHAR(50), -- daily, weekly, monthly
  condition VARCHAR(50), -- new, like_new, good, fair
  images TEXT[],
  is_available BOOLEAN DEFAULT true,
  location VARCHAR(255),
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Applications (Candidaturas para Vagas)
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  proposal TEXT NOT NULL,
  proposed_price DECIMAL(10,2),
  estimated_duration VARCHAR(100),
  portfolio_links TEXT[],
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, rejected, withdrawn
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(job_id, user_id)
);
```

### 6. Orders (Pedidos de Produtos)
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  rental_start_date DATE,
  rental_end_date DATE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, completed, cancelled
  shipping_address TEXT,
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Reviews (Avaliações)
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reviewed_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(reviewer_id, reviewed_user_id, job_id),
  UNIQUE(reviewer_id, reviewed_user_id, product_id)
);
```

### 8. Messages (Mensagens entre Usuários)
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9. Notifications (Notificações)
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- application, order, message, review
  reference_id UUID, -- job_id, order_id, etc.
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 10. Favorites (Favoritos)
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, job_id),
  UNIQUE(user_id, product_id)
);
```

## Índices Recomendados
```sql
-- Índices para performance
CREATE INDEX idx_jobs_category_id ON jobs(category_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_event_date ON jobs(event_date);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);
CREATE INDEX idx_reviews_reviewed_user_id ON reviews(reviewed_user_id);
CREATE INDEX idx_messages_sender_receiver ON messages(sender_id, receiver_id);
```

## Dados Iniciais
```sql
-- Categorias padrão
INSERT INTO categories (name, description, icon, color) VALUES
('Transporte', 'Serviços de transporte para eventos', '🚚', '#FF6B6B'),
('Montagem', 'Montagem e desmontagem de estruturas', '🔨', '#4ECDC4'),
('Som e Iluminação', 'Equipamentos de áudio e iluminação', '🎵', '#45B7D1'),
('Decoração', 'Decoração e cenografia', '🎨', '#96CEB4'),
('Fotografia', 'Serviços fotográficos', '📸', '#FFEAA7'),
('Buffet', 'Serviços de alimentação', '🍽️', '#DDA0DD'),
('Segurança', 'Serviços de segurança', '🛡️', '#98D8C8'),
('Equipamentos', 'Aluguel de equipamentos', '⚙️', '#F7DC6F');
```

## Relacionamentos
- Um usuário pode ter múltiplas vagas, produtos e candidaturas
- Uma vaga pode ter múltiplas candidaturas
- Um produto pode ter múltiplos pedidos
- Usuários podem avaliar uns aos outros
- Sistema de mensagens entre usuários
- Sistema de notificações para ações importantes
