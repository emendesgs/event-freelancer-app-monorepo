import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types';

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

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Categoria:</p>
                        <p>{product.category_name}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Preço:</p>
                        <p>R$ {product.price.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Tipo de Preço:</p>
                        <p>{product.price_type}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Condição:</p>
                        <p>{product.condition}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Disponibilidade:</p>
                        <p>{product.is_available ? 'Disponível' : 'Indisponível'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Visualizações:</p>
                        <p>{product.views_count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;