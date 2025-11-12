import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../../types';
import { 
  Search, 
  ChevronDown, 
  Tag, 
  Package, 
  DollarSign, 
  Heart, 
  Filter, 
  X 
} from 'lucide-react';

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Cadeira de Jantar',
        description: 'Cadeira de jantar de madeira maciça, ideal para eventos formais.',
        price: 50.00,
        price_type: 'rental',
        category_id: '1',
        category_name: 'Mobiliário',
        user_id: '1',
        condition: 'new',
        is_available: true,
        views_count: 120,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Mesa de Som Behringer X32',
        description: 'Mesa de som digital de 32 canais, perfeita para shows e eventos de grande porte.',
        price: 350.00,
        price_type: 'rental',
        category_id: '2',
        category_name: 'Equipamento de Som',
        user_id: '2',
        condition: 'like_new',
        is_available: true,
        views_count: 250,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Projetor Epson PowerLite 1781W',
        description: 'Projetor WXGA sem fio, leve e portátil, ideal para apresentações de negócios.',
        price: 200.00,
        price_type: 'rental',
        category_id: '3',
        category_name: 'Equipamento de Vídeo',
        user_id: '3',
        condition: 'good',
        is_available: true,
        views_count: 80,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

const mockCategories: Category[] = [
    { id: '1', name: 'Mobiliário', created_at: new Date().toISOString() },
    { id: '2', name: 'Equipamento de Som', created_at: new Date().toISOString() },
    { id: '3', name: 'Equipamento de Vídeo', created_at: new Date().toISOString() },
    { id: '4', name: 'Estruturas', created_at: new Date().toISOString() },
    { id: '5', name: 'Decoração', created_at: new Date().toISOString() },
];

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setProducts(mockProducts);
        setCategories(mockCategories);
    }, []);

    const filteredProducts = products
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(product => 
            !selectedCategory || product.category_id === selectedCategory
        );

    const ProductCard = ({ product }: { product: Product }) => (
        <div key={product.id} className="bg-white rounded-lg shadow-soft overflow-hidden transition-transform duration-300 hover:-translate-y-1 group">
            <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                </div>
                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-500 group-hover:text-error-500" />
                </button>
            </div>
            <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.category_name}</p>
                <h3 className="text-md font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary-600">R$ {product.price.toFixed(2)}</p>
                    <span 
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${product.price_type === 'rental' 
                            ? 'bg-primary-100 text-primary-800' 
                            : 'bg-success-100 text-success-800'}`}>
                        {product.price_type === 'rental' ? 'Aluguel' : 'Venda'}
                    </span>
                </div>
                <Link to={`/products/${product.id}`} className="mt-4 block w-full text-center bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
                    Ver Detalhes
                </Link>
            </div>
        </div>
    );

    const FilterSidebar = () => (
        <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-72 p-6 transform transition-transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 md:w-64 md:h-auto md:shadow-none md:p-0`}>
            <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="text-lg font-bold">Filtros</h3>
                <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
            <ul className="space-y-2">
                <li>
                    <button 
                        onClick={() => setSelectedCategory(null)} 
                        className={`w-full text-left px-3 py-2 rounded-md ${!selectedCategory ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}>
                        Todas
                    </button>
                </li>
                {categories.map(category => (
                    <li key={category.id}>
                        <button 
                            onClick={() => setSelectedCategory(category.id.toString())} 
                            className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === category.id.toString() ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}>
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Encontre o que precisa</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-md sm:text-lg text-gray-600">Explore nossa seleção de produtos e equipamentos para o seu evento.</p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="relative w-full sm:flex-1 sm:max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text"
                            placeholder="Buscar por nome do produto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                    <button 
                        onClick={() => setIsFilterOpen(true)} 
                        className="w-full sm:w-auto flex items-center justify-center p-3 border rounded-lg sm:ml-4">
                        <Filter className="w-5 h-5 mr-2" />
                        <span>Filtros</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <FilterSidebar />

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800">Nenhum produto encontrado</h3>
                                <p className="text-gray-500 mt-2">Tente ajustar sua busca ou filtros.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;