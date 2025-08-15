import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
  contactEmail: string;
  contactPhone: string;
  applicationsCount: number;
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch job details from API
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await apiService.getJobById(id);
        if (response.success && response.data) {
          setJob(response.data as Job);
        }
      } catch (err) {
        setError('Erro ao carregar detalhes da vaga');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Dados mockados para demonstração (fallback)
  const mockJob: Job = {
    id: '1',
    title: 'Fotógrafo de Eventos',
    company: 'Eventos Plus',
    location: 'São Paulo, SP',
    salary: 'R$ 800 - R$ 1.200 por evento',
    type: 'Freelance',
    category: 'Fotografia',
    description: 'Buscamos fotógrafo experiente para capturar momentos especiais em eventos corporativos e sociais. O profissional será responsável por fotografar eventos de diferentes portes, desde pequenas reuniões até grandes conferências corporativas. Deve ter experiência em iluminação, composição e edição de fotos. Será necessário fornecer equipamento próprio e ter disponibilidade para trabalhar em finais de semana e feriados quando necessário.',
    requirements: [
      'Experiência mínima de 2 anos em fotografia de eventos',
      'Equipamento próprio (câmera DSLR ou mirrorless)',
      'Portfolio diversificado com diferentes tipos de eventos',
      'Conhecimento em edição de fotos (Lightroom/Photoshop)',
      'Disponibilidade para trabalhar em finais de semana',
      'Boa comunicação e relacionamento interpessoal'
    ],
    postedDate: '2024-01-15',
    deadline: '2024-01-30',
    contactEmail: 'contato@eventosplus.com.br',
    contactPhone: '(11) 99999-9999',
    applicationsCount: 12
  };

  const handleApply = async () => {
    if (!user) {
      alert('Você precisa estar logado para se candidatar a uma vaga.');
      return;
    }

    if (!applicationMessage.trim()) {
      alert('Por favor, escreva uma mensagem de candidatura.');
      return;
    }

    setIsApplying(true);
    try {
      // Chamada real à API
      const response = await apiService.createApplication({
        job_id: id,
        proposal: applicationMessage
      });
      if (response.success) {
        alert('Candidatura enviada com sucesso!');
        navigate('/dashboard');
      } else {
        alert(response.error || 'Erro ao enviar candidatura.');
      }
    } catch (error) {
      console.error('Erro ao enviar candidatura:', error);
      alert('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsApplying(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const currentJob = job || mockJob;
  const isDeadlinePassed = new Date(currentJob.deadline) < new Date();

  const requirements = Array.isArray(currentJob.requirements)
    ? currentJob.requirements
    : typeof currentJob.requirements === 'string'
      ? JSON.parse(currentJob.requirements)
      : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando detalhes da vaga...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/jobs')}
                  className="mr-4 p-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{currentJob.title}</h1>
                  <p className="mt-2 text-gray-600">{currentJob.company}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {currentJob.type}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {currentJob.category}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {currentJob.applicationsCount} candidatura{currentJob.applicationsCount !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {currentJob.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {currentJob.salary}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                  Publicada em {formatDate(currentJob.postedDate)}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prazo: {formatDate(currentJob.deadline)}
                </div>
              </div>

              {isDeadlinePassed && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800">
                      <strong>Prazo encerrado:</strong> Esta vaga não está mais aceitando candidaturas.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição da Vaga</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentJob.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
              <ul className="space-y-2">
                {requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidatar-se</h3>
              
              {!user ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Faça login para se candidatar a esta vaga</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Fazer Login
                  </button>
                </div>
              ) : isDeadlinePassed ? (
                <div className="text-center">
                  <p className="text-red-600 mb-4">Prazo para candidaturas encerrado</p>
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white px-4 py-2 rounded-md font-medium cursor-not-allowed"
                  >
                    Candidatura Encerrada
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem de Candidatura
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={applicationMessage}
                      onChange={(e) => setApplicationMessage(e.target.value)}
                      placeholder="Conte-nos por que você é a pessoa ideal para esta vaga..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <button
                    onClick={handleApply}
                    disabled={isApplying || !applicationMessage.trim()}
                    className={`w-full px-4 py-2 rounded-md font-medium ${
                      isApplying || !applicationMessage.trim()
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isApplying ? 'Enviando...' : 'Enviar Candidatura'}
                  </button>
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Empresa</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Empresa</p>
                  <p className="text-gray-900">{currentJob.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email de Contato</p>
                  <p className="text-gray-900">{currentJob.contactEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Telefone</p>
                  <p className="text-gray-900">{currentJob.contactPhone}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Candidaturas</span>
                  <span className="font-medium text-gray-900">{currentJob.applicationsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo</span>
                  <span className="font-medium text-gray-900">{currentJob.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria</span>
                  <span className="font-medium text-gray-900">{currentJob.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Localização</span>
                  <span className="font-medium text-gray-900">{currentJob.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
