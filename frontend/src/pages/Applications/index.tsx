import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'interview';
  message: string;
  salary: string;
  location: string;
  category: string;
}

const Applications: React.FC = () => {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  // Dados mockados para demonstração (fallback)
  const mockApplications: Application[] = [
    {
      id: '1',
      jobId: '1',
      jobTitle: 'Fotógrafo de Eventos',
      company: 'Eventos Plus',
      appliedDate: '2024-01-15',
      status: 'accepted',
      message: 'Tenho experiência em fotografia de eventos corporativos e sociais há mais de 3 anos. Possuo equipamento próprio e portfolio diversificado.',
      salary: 'R$ 800 - R$ 1.200 por evento',
      location: 'São Paulo, SP',
      category: 'Fotografia'
    },
    {
      id: '2',
      jobId: '2',
      jobTitle: 'Designer Gráfico',
      company: 'Marketing Digital',
      appliedDate: '2024-01-14',
      status: 'reviewed',
      message: 'Sou designer com 5 anos de experiência em branding e materiais promocionais. Trabalho com Adobe Creative Suite e tenho portfolio criativo.',
      salary: 'R$ 60 - R$ 80 por hora',
      location: 'Remoto',
      category: 'Design'
    },
    {
      id: '3',
      jobId: '3',
      jobTitle: 'Videomaker',
      company: 'Produções ABC',
      appliedDate: '2024-01-13',
      status: 'pending',
      message: 'Videomaker experiente em produção de vídeos corporativos. Domino After Effects e tenho equipamento próprio.',
      salary: 'R$ 1.500 - R$ 2.500 por projeto',
      location: 'Rio de Janeiro, RJ',
      category: 'Vídeo'
    },
    {
      id: '4',
      jobId: '4',
      jobTitle: 'DJ para Eventos',
      company: 'Som & Luz',
      appliedDate: '2024-01-12',
      status: 'interview',
      message: 'DJ profissional com 8 anos de experiência em eventos corporativos e festas. Possuo equipamento próprio e repertório variado.',
      salary: 'R$ 300 - R$ 500 por hora',
      location: 'São Paulo, SP',
      category: 'Música'
    },
    {
      id: '5',
      jobId: '5',
      jobTitle: 'Organizador de Eventos',
      company: 'Eventos VIP',
      appliedDate: '2024-01-11',
      status: 'rejected',
      message: 'Organizador de eventos com experiência em casamentos e eventos corporativos. Trabalho com equipe própria e fornecedores certificados.',
      salary: 'R$ 2.000 - R$ 5.000 por evento',
      location: 'São Paulo, SP',
      category: 'Organização'
    }
  ];

  const statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: 'pending', label: 'Pendente' },
    { value: 'reviewed', label: 'Em Análise' },
    { value: 'interview', label: 'Entrevista' },
    { value: 'accepted', label: 'Aceita' },
    { value: 'rejected', label: 'Rejeitada' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'reviewed':
        return 'Em Análise';
      case 'interview':
        return 'Entrevista';
      case 'accepted':
        return 'Aceita';
      case 'rejected':
        return 'Rejeitada';
      default:
        return 'Desconhecido';
    }
  };

  const filteredApplications = (applications.length > 0 ? applications : mockApplications).filter(app => {
    if (selectedStatus === '') return true;
    return app.status === selectedStatus;
  });

  const getStatusCount = (status: string) => {
    return mockApplications.filter(app => app.status === status).length;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h2>
          <p className="text-gray-600">Você precisa estar logado para ver suas candidaturas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Minhas Candidaturas</h1>
              <p className="mt-2 text-gray-600">Acompanhe o status de suas candidaturas</p>
            </div>
            <Link
              to="/jobs"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium"
            >
              Buscar Novas Vagas
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando candidaturas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{mockApplications.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{getStatusCount('reviewed')}</div>
            <div className="text-sm text-gray-600">Em Análise</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{getStatusCount('interview')}</div>
            <div className="text-sm text-gray-600">Entrevistas</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getStatusCount('accepted')}</div>
            <div className="text-sm text-gray-600">Aceitas</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{getStatusCount('rejected')}</div>
            <div className="text-sm text-gray-600">Rejeitadas</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Filtros</h3>
              <p className="text-sm text-gray-600">
                {filteredApplications.length} candidatura{filteredApplications.length !== 1 ? 's' : ''} encontrada{filteredApplications.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map(application => (
            <div key={application.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          <Link to={`/jobs/${application.jobId}`} className="hover:text-blue-600">
                            {application.jobTitle}
                          </Link>
                        </h3>
                        <p className="text-gray-600">{application.company}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {getStatusLabel(application.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {application.location}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        {application.salary}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Candidatura enviada em {new Date(application.appliedDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {application.category}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Sua Mensagem:</h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
                        {application.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <Link
                      to={`/jobs/${application.jobId}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver Detalhes da Vaga
                    </Link>
                    {application.status === 'accepted' && (
                      <span className="text-green-600 text-sm font-medium">
                        🎉 Parabéns! Sua candidatura foi aceita!
                      </span>
                    )}
                    {application.status === 'interview' && (
                      <span className="text-purple-600 text-sm font-medium">
                        📞 Prepare-se para a entrevista!
                      </span>
                    )}
                    {application.status === 'rejected' && (
                      <span className="text-red-600 text-sm font-medium">
                        Não desanime, continue se candidatando!
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {application.status === 'pending' && (
                      <button className="text-gray-500 hover:text-gray-700 text-sm">
                        Cancelar Candidatura
                      </button>
                    )}
                    {application.status === 'accepted' && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Aceitar Oferta
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma candidatura encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedStatus ? 'Tente ajustar os filtros.' : 'Comece se candidatando a vagas!'}
            </p>
            {!selectedStatus && (
              <div className="mt-6">
                <Link
                  to="/jobs"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium"
                >
                  Buscar Vagas
                </Link>
              </div>
            )}
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;