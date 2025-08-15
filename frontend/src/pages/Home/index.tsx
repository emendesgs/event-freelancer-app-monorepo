import React from 'react';
import Hero from '../../components/Home/Hero';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Bem-vindo ao Event Freelancer</h2>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
          Conectamos freelancers talentosos com oportunidades incríveis em eventos. 
          Encontre seu próximo projeto ou contrate profissionais qualificados.
        </p>
      </div>
    </div>
  );
};

export default Home;
