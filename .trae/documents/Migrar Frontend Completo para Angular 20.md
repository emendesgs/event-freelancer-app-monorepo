## Objetivos

* Portar todo o frontend de React para Angular 20 com componentes standalone

* Aplicar melhores práticas de RxJS (composição de Observables, controle de efeitos, cache leve)

* Manter paridade funcional com páginas existentes (Jobs, Products, Auth, Applications, Profile)

* Integrar com o backend atual (`http://localhost:5000/api`) e preparar melhoria do README

## Arquitetura do Frontend Angular

* Standalone Components e `provideRouter` no `app.config.ts`

* `HttpClient` habilitado com interceptors para base URL, auth e erros

* Serviços por domínio com Observables tipados e sem `subscribe` imperativo nos componentes

* Estrutura de estado local por página usando RxJS (`BehaviorSubject`, `combineLatest`) ou `@ngrx/component-store` em telas mais complexas

## Estrutura de Pastas

* `frontend-angular/src/app/`

  * `models/` — tipos TS: `Job`, `Product`, `User`, `Application`, `Auth`

  * `services/` — `jobs.service.ts`, `products.service.ts`, `auth.service.ts`, `applications.service.ts`, `api.service.ts`

  * `core/` — `interceptors/auth.interceptor.ts`, `interceptors/error.interceptor.ts`, `guards/auth.guard.ts`

  * `shared/` — componentes reutilizáveis: `Header`, `SearchBar`, `FilterPanel`, `JobCard`, `ProductCard`

  * `features/` — páginas organizadas por domínio:

    * `jobs/` — `jobs-list.component`, `job-details.component`, `create-job.component`

    * `products/` — `products-list.component`, `product-details.component`

    * `auth/` — `login.component`, `register.component`

    * `profile/` — `profile.component`

    * `applications/` — `applications-list.component`, `create-application.component`

## Mapeamento de Funcionalidades

* Jobs

  * Listagem: filtros por busca, categoria, tipo; rota `GET /api/jobs`

  * Detalhes: rota `GET /api/jobs/:id`

  * Criação/Edição: `POST /api/jobs`, `PUT /api/jobs/:id`, `DELETE /api/jobs/:id`

* Products

  * Listagem e filtros; rota `GET /api/products`

  * Detalhes: `GET /api/products/:id`

* Auth & Profile

  * Registro/Login: `POST /api/auth/register`, `POST /api/auth/login`

  * Perfil: `GET/PUT /api/auth/profile`

* Applications

  * Criação e listagem por vaga: `POST /api/applications`, `GET /api/applications/job/:id`

## Roteamento

* `routes` principais

  * `/jobs`, `/jobs/:id`, `/jobs/create`

  * `/products`, `/products/:id`

  * `/auth/login`, `/auth/register`

  * `/profile`

  * `/applications`, `/applications/create`

* `AuthGuard` protege rotas que exigem login (ex.: criar vagas, editar perfil)

## Padrões RxJS

* Filtros reativos: `BehaviorSubject` + `combineLatest` + `map` + `debounceTime(250)` + `distinctUntilChanged`

* Cache leve de listagens: `shareReplay({ bufferSize: 1, refCount: true })`

* Submissões de formulário: `Subject` + `exhaustMap` para evitar envios duplicados

* Encerramento automático: `takeUntilDestroyed()` nos construtores de componentes

* Tratamento de erros: `catchError` com retornos seguros (`of([])`, `of(null)`), sem `subscribe` em componentes

## Autenticação e Interceptores

* `AuthService`: login/logout, armazenamento de token, estado de usuário

* `AuthInterceptor`: adiciona `Authorization: Bearer <token>` quando presente

* `ErrorInterceptor`: mapeia códigos HTTP, exibe mensagens amigáveis e realiza ações (ex.: 401 → logout opcional)

* `AuthGuard`: bloqueia acesso a rotas protegidas

## Estilização

* Reaproveitar design existente portando classes utilitárias

* Integrar Tailwind no Angular (opcional): configurar `tailwindcss` e `postcss` no projeto

* Alternativa: Angular Material/CDK para inputs, listas e responsividade (se desejado)

## Testes

* Serviços: `HttpClientTestingModule` com `expectOne` e asserts de `Observable`

* Guards/Interceptors: testes de fluxo de navegação e headers

* Componentes: TestBed + validação de template com `AsyncPipe`

## Fases de Implementação

1. Base & Infra

   * Configurar ambientes (`environment.ts`) com `apiBaseUrl`

   * Criar `core` (interceptors, guard) e `models`
2. Domínio Jobs

   * Implementar serviços e componentes (lista, detalhes, criação)

   * Filtros reativos e formulário reativo com `exhaustMap`
3. Domínio Products

   * Listagem, detalhes e filtros
4. Auth & Profile

   * Login/Register, estado de autenticação, perfil com edição
5. Applications

   * Criação e listagem por vaga
6. Shared

   * Portar componentes reutilizáveis (Header, SearchBar, FilterPanel, Cards)
7. Estilização

   * Integrar Tailwind ou Material (conforme preferência)
8. Testes & Verificação

   * Cobrir serviços/rotas/guards; rodar dev e validar páginas
9. Finalização

   * Atualizar scripts no `package.json` e README

   * Manter React em paralelo até atingir paridade; depois remover `frontend/` (se aprovado)

## Entregáveis

* Frontend Angular 20 completo com rotas e páginas portadas

* Serviços com RxJS seguindo boas práticas

* Interceptores de Auth e Error

* README atualizado com instruções Angular, arquitetura e padrões adotados

## Próximo Passo

* Confirmar a adoção de Tailwind (manter visual existente) ou usar Angular Material

* Após confirmação, inicio a implementação por fases seguindo o plano acima

