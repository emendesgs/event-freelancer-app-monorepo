## Objetivo
Alinhar o novo frontend Angular ao visual e comportamento do site React anterior, atingindo o máximo de paridade visual (pixel parity) com navegação, tipografia, cores, espaçamentos, sombras e componentes.

## Levantamento e Mapeamento
1. Inventariar componentes do React: Header, Footer, Hero, SearchBar, FilterPanel, JobCard, ProductCard, StatusChip, StatsGrid.
2. Extrair tokens de design: paleta (primária, secundária, sucesso, aviso, erro), tipografia (fontes, tamanhos, pesos), espaçamentos, raios de borda, sombras, densidade.
3. Registrar comportamento responsivo (breakpoints, colunas, visibilidade mobile/desktop) e ícones utilizados.

## Theming Angular Material
1. Criar tema customizado Material em `styles.scss` usando `@use`:
   - Paletas: `primary`, `accent`, `warn` alinhadas às cores do projeto antigo.
   - Tipografia: fonte (ex.: Inter), tamanhos, pesos.
   - Configurar density/shape para aproximar bordas e espaçamento.
2. Aplicar tokens em `MatToolbar`, `MatButton`, `MatCard`, `MatChip`, `MatFormField`.

## Integração de Utilitários CSS
1. Integrar Tailwind ao projeto Angular para reutilizar classes utilitárias já presentes no React.
2. Habilitar breakpoints e plugins necessários (typography, forms) e garantir tree-shaking.

## Componentização Compartilhada
1. Criar componentes em `shared/`:
   - `HeaderComponent` com navegação idêntica, busca, menu de usuário e comportamento responsivo.
   - `FooterComponent` com conteúdo e espaçamentos como no antigo.
   - `HeroComponent` (título, subtítulo, CTAs, fundo/gradiente se houver).
   - `StatsGridComponent` com métricas (Eventos, Profissionais, Avaliação, Sucesso).
   - `FeatureCardsComponent` com três cards de recursos.
   - `StatusChipComponent` com variações de status (cores e rótulos).
   - `SearchBarComponent` e `FilterPanelComponent` reutilizáveis.
2. Substituir trechos inline por componentes, mantendo propriedades e outputs reativos.

## Páginas
1. Home: usar `Header`, `Hero`, `StatsGrid`, `FeatureCards` e `Footer` seguindo estrutura do React.
2. Jobs:
   - Lista: usar `JobCard` com ícones, chips, sombras e layout equivalente.
   - Detalhes: seções, ícones, chips e blocos laterais iguais, com gating e estados.
   - Criar: formularios com campos e espaçamentos equivalentes.
3. Products: `ProductCard` e detalhes com preços formatados, chips de tipo (Aluguel/Venda).
4. Applications: lista com filtro, status chips, mensagens contextuais e CTAs.
5. Auth/Profile: telas com inputs, botões e espaçamentos replicados.

## Ícones
- Padronizar Material Icons e/ou integrar pacote de ícones similar ao React para equivalência visual.
- Substituir SVGs custom por ícones configurados mantendo semântica e estilo.

## Responsividade e Navegação
- Replicar breakpoints e grid da Home e das páginas.
- Header responsivo com menu compacto, mantendo rotas e visibilidade condicional ao login.

## Validação e Ajustes Finos
1. Comparar página a página (Home, Jobs, Products, Applications, Auth, Profile) com o React, ajustando:
   - Tipografia: tamanhos/linhas/pesos idênticos.
   - Espaçamentos: margens/paddings.
   - Sombras e bordas: intensidade e raios.
   - Cores dos chips e botões.
2. Testar busca (Home → Jobs?q), filtros e navegação.
3. Corrigir estados de loading/erro com indicadores equivalentes.

## Entregáveis
- Tema Material custom e Tailwind integrado.
- Componentes compartilhados equivalentes ao React.
- Páginas atualizadas com layout e comportamento alinhados.
- Checklist de paridade visual por página e correções aplicadas.

## Próximo Passo
- Confirmar uso de Tailwind no Angular para reaproveitar classes do projeto antigo e aprovar paleta/tipografia exatas; iniciamos a aplicação do tema e a refatoração de componentes. 