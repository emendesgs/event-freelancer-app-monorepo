import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Star, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-warning-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Conectando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Talentos
            </span>{' '}
            com{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning-600 to-error-600">
              Eventos
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A plataforma completa para freelancers de eventos. Publique vagas, 
            encontre profissionais qualificados, alugue equipamentos e muito mais.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-soft"
            >
              Explorar Vagas
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-soft"
            >
              Começar Agora
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600">Eventos Ativos</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">2.5k+</div>
              <div className="text-sm sm:text-base text-gray-600">Profissionais</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-warning-100 rounded-full mx-auto mb-4">
                <Star className="w-8 h-8 text-warning-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="text-sm sm:text-base text-gray-600">Avaliação Média</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-success-100 rounded-full mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm sm:text-base text-gray-600">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para eventos de sucesso
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas completas para conectar 
              organizadores de eventos com profissionais qualificados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-medium transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gestão de Vagas
              </h3>
              <p className="text-gray-600">
                Publique vagas detalhadas com requisitos específicos e 
                encontre os profissionais ideais para seu evento.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-medium transition-shadow">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Rede de Profissionais
              </h3>
              <p className="text-gray-600">
                Conecte-se com uma rede crescente de freelancers 
                especializados em diferentes áreas de eventos.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-medium transition-shadow">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sistema de Avaliações
              </h3>
              <p className="text-gray-600">
                Avalie e seja avaliado para construir uma 
                reputação sólida na comunidade de eventos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;