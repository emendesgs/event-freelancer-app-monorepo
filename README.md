# 🎉 Event Freelancer App

Uma plataforma completa para freelancers de eventos, conectando organizadores com profissionais qualificados.

## ✨ Funcionalidades

### 🎯 Sistema de Vagas
- **Publicação de vagas** para eventos (transporte, montagem, som, decoração, etc.)
- **Filtros avançados** por categoria, localização, orçamento e data
- **Sistema de candidaturas** com propostas e portfólios
- **Gestão completa** das vagas publicadas

### 🛍️ Sistema de Produtos
- **Venda e aluguel** de equipamentos e materiais
- **Categorização inteligente** por tipo de produto
- **Sistema de pedidos** com status de entrega
- **Gestão de estoque** e disponibilidade

### 👥 Sistema de Usuários
- **Perfis completos** com habilidades e avaliações
- **Sistema de verificação** de usuários
- **Portfólios** e histórico de trabalhos
- **Sistema de mensagens** entre usuários

### ⭐ Sistema de Avaliações
- **Avaliações bidirecionais** após trabalhos concluídos
- **Sistema de reputação** com pontuações
- **Comentários detalhados** sobre experiências

### 🔍 Busca e Filtros
- **Busca inteligente** por texto, categoria e localização
- **Filtros avançados** por preço, data e status
- **Feed personalizado** baseado em interesses

## 🏗️ Arquitetura

### Backend
- **Node.js** com **TypeScript**
- **Express.js** para API REST
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **Arquitetura MVC** com controllers e middlewares

### Frontend
- **React 18** com **TypeScript**
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **React Query** para gerenciamento de estado
- **Framer Motion** para animações

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 12+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <repository-url>
cd event-freelancer-app
```

### 2. Instale as dependências
```bash
npm run install:all
```

### 3. Configure o banco de dados
```bash
# Crie um banco PostgreSQL chamado 'event_freelancer'
# Configure as variáveis de ambiente no arquivo backend/env.example
# Renomeie para .env e ajuste os valores

# Execute o setup do banco
npm run setup:db
```

### 4. Configure as variáveis de ambiente

#### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=event_freelancer
DB_USER=postgres
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary (opcional para upload de imagens)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```

### 5. Inicie o desenvolvimento
```bash
# Inicia backend e frontend simultaneamente
npm run dev

# Ou individualmente:
npm run server:dev    # Backend na porta 5000
npm run client:dev    # Frontend na porta 3000
```

## 📁 Estrutura do Projeto

```
event-freelancer-app/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── controllers/    # Controladores da API
│   │   ├── middleware/     # Middlewares (auth, validação)
│   │   ├── routes/         # Rotas da API
│   │   ├── database/       # Configuração e setup do banco
│   │   ├── types/          # Tipos TypeScript
│   │   └── index.ts        # Servidor principal
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── contexts/       # Contextos React (Auth)
│   │   ├── services/       # Serviços de API
│   │   ├── types/          # Tipos TypeScript
│   │   └── App.tsx         # Componente principal
│   ├── package.json
│   └── tailwind.config.js
├── docs/                    # Documentação
│   └── database-design.md   # Design do banco de dados
├── package.json             # Scripts principais
└── README.md
```

## 🗄️ Banco de Dados

### Tabelas Principais
- **users** - Usuários da plataforma
- **categories** - Categorias de vagas/produtos
- **jobs** - Vagas de eventos
- **products** - Produtos para venda/aluguel
- **applications** - Candidaturas para vagas
- **orders** - Pedidos de produtos
- **reviews** - Avaliações entre usuários
- **messages** - Sistema de mensagens
- **notifications** - Notificações do sistema

### Setup Automático
O banco é configurado automaticamente com:
- Criação de tabelas
- Índices de performance
- Categorias padrão
- Relacionamentos e constraints

## 🔧 Desenvolvimento

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev              # Inicia backend + frontend
npm run server:dev       # Apenas backend
npm run client:dev       # Apenas frontend

# Build
npm run build            # Build do frontend
npm run start            # Inicia backend em produção

# Banco de dados
npm run setup:db         # Setup inicial do banco
npm run migrate          # Executa migrações
npm run seed             # Popula dados de teste
```

### Tecnologias Utilizadas

#### Backend
- **Express.js** - Framework web
- **TypeScript** - Linguagem tipada
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **multer** - Upload de arquivos
- **helmet** - Segurança
- **cors** - Cross-origin
- **morgan** - Logs

#### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Linguagem tipada
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **React Query** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Framer Motion** - Animações
- **Lucide React** - Ícones

## 🌐 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário
- `PUT /api/auth/profile` - Atualizar perfil

### Vagas
- `GET /api/jobs` - Listar vagas
- `GET /api/jobs/:id` - Detalhes da vaga
- `POST /api/jobs` - Criar vaga
- `PUT /api/jobs/:id` - Atualizar vaga
- `DELETE /api/jobs/:id` - Deletar vaga

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Candidaturas
- `POST /api/applications` - Criar candidatura
- `GET /api/applications/job/:id` - Candidaturas de uma vaga
- `PUT /api/applications/:id` - Atualizar candidatura

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/user/me` - Meus pedidos
- `PUT /api/orders/:id` - Atualizar pedido

## 🎨 Interface do Usuário

### Design System
- **Cores primárias** - Azul (#3B82F6)
- **Cores secundárias** - Cinza (#64748B)
- **Cores de sucesso** - Verde (#22C55E)
- **Cores de aviso** - Amarelo (#F59E0B)
- **Cores de erro** - Vermelho (#EF4444)

### Componentes
- **Header** - Navegação principal
- **Hero** - Seção de destaque
- **JobCard** - Card de vaga
- **ProductCard** - Card de produto
- **FilterPanel** - Painel de filtros
- **SearchBar** - Barra de busca
- **UserProfile** - Perfil do usuário

## 🔒 Segurança

### Autenticação
- **JWT tokens** com expiração configurável
- **Hash de senhas** com bcrypt
- **Middleware de autenticação** para rotas protegidas
- **Validação de dados** com Joi

### Proteções
- **Helmet** para headers de segurança
- **CORS** configurado
- **Rate limiting** para prevenir abuso
- **Validação de entrada** em todos os endpoints

## 🚀 Deploy

### Backend
```bash
# Build
npm run build

# Produção
npm run start
```

### Frontend
```bash
# Build
npm run build

# Servir arquivos estáticos
npx serve -s build
```

### Variáveis de Produção
- Configure `NODE_ENV=production`
- Use HTTPS em produção
- Configure CORS para domínio específico
- Use variáveis de ambiente seguras

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Issues**: Use o GitHub Issues para reportar bugs
- **Documentação**: Consulte a pasta `docs/`
- **Email**: [seu-email@exemplo.com]

## 🎯 Roadmap

### Versão 1.1
- [ ] Sistema de pagamentos
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] App mobile

### Versão 1.2
- [ ] Sistema de contratos
- [ ] Relatórios e analytics
- [ ] Integração com calendários
- [ ] API pública

### Versão 2.0
- [ ] IA para matching
- [ ] Sistema de certificações
- [ ] Marketplace de serviços
- [ ] Integração com redes sociais

---

**Desenvolvido com ❤️ pela equipe Event Freelancer**
# event-freelancer-app-monorepo
