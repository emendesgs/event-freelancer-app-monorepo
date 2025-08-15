import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import { User } from '../../types';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  portfolio: string;
  hourlyRate: string;
  availability: string;
  languages: string[];
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [''],
    experience: '',
    portfolio: '',
    hourlyRate: '',
    availability: '',
    languages: ['']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  const availabilityOptions = [
    'Disponível imediatamente',
    'Disponível em 1 semana',
    'Disponível em 2 semanas',
    'Disponível em 1 mês',
    'Sob consulta'
  ];

  const commonSkills = [
    'Fotografia', 'Design Gráfico', 'Videomaker', 'DJ', 'Músico',
    'Decoração', 'Organização de Eventos', 'Marketing Digital',
    'Social Media', 'Iluminação', 'Som', 'Catering', 'Transporte'
  ];

  const commonLanguages = [
    'Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano'
  ];

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills || [''],
        experience: '',
        portfolio: '',
        hourlyRate: '',
        availability: '',
        languages: ['']
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ProfileData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...profileData.skills];
    newSkills[index] = value;
    setProfileData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    if (profileData.skills.length > 1) {
      const newSkills = profileData.skills.filter((_, i) => i !== index);
      setProfileData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...profileData.languages];
    newLanguages[index] = value;
    setProfileData(prev => ({
      ...prev,
      languages: newLanguages
    }));
  };

  const addLanguage = () => {
    setProfileData(prev => ({
      ...prev,
      languages: [...prev.languages, '']
    }));
  };

  const removeLanguage = (index: number) => {
    if (profileData.languages.length > 1) {
      const newLanguages = profileData.languages.filter((_, i) => i !== index);
      setProfileData(prev => ({
        ...prev,
        languages: newLanguages
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {};

    if (!profileData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório';
    if (!profileData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!profileData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!profileData.location.trim()) newErrors.location = 'Localização é obrigatória';
    if (!profileData.bio.trim()) newErrors.bio = 'Biografia é obrigatória';
    if (!profileData.experience.trim()) newErrors.experience = 'Experiência é obrigatória';
    if (!profileData.hourlyRate.trim()) newErrors.hourlyRate = 'Taxa horária é obrigatória';

    // Validate skills and languages
    if (profileData.skills.length === 0 || profileData.skills.some(skill => !skill.trim())) {
      newErrors.skills = ['Pelo menos uma habilidade é obrigatória'];
    }
    if (profileData.languages.length === 0 || profileData.languages.some(lang => !lang.trim())) {
      newErrors.languages = ['Pelo menos um idioma é obrigatório'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Update profile via API
      const updateData = {
        full_name: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        skills: profileData.skills
      };

      const response = await apiService.updateProfile(updateData);
      
      if (response.success && response.data) {
        updateUser(response.data as User);
      }
      
      alert('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h2>
          <p className="text-gray-600">Você precisa estar logado para acessar seu perfil.</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="mt-2 text-gray-600">Gerencie suas informações pessoais e profissionais</p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isSaving
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Informações Pessoais</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } ${!isEditing ? 'bg-gray-50' : ''}`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${!isEditing ? 'bg-gray-50' : ''}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Localização *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  } ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="Ex: São Paulo, SP"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Biografia *
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                } ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="Conte um pouco sobre você, suas experiências e o que te motiva..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>

            {/* Professional Info */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Profissionais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Experiência *
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={3}
                    value={profileData.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    } ${!isEditing ? 'bg-gray-50' : ''}`}
                    placeholder="Descreva sua experiência profissional..."
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                    Taxa Horária *
                  </label>
                  <input
                    type="text"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={profileData.hourlyRate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                    } ${!isEditing ? 'bg-gray-50' : ''}`}
                    placeholder="Ex: R$ 80/hora"
                  />
                  {errors.hourlyRate && <p className="mt-1 text-sm text-red-600">{errors.hourlyRate}</p>}
                </div>

                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Website
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={profileData.portfolio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    placeholder="https://seu-portfolio.com"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilidade
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={profileData.availability}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  >
                    <option value="">Selecione a disponibilidade</option>
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Habilidades *</h3>
              <div className="space-y-3">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <select
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="">Selecione uma habilidade</option>
                      {commonSkills.map(skillOption => (
                        <option key={skillOption} value={skillOption}>{skillOption}</option>
                      ))}
                    </select>
                    {isEditing && profileData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    type="button"
                    onClick={addSkill}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Adicionar Habilidade
                  </button>
                )}
                {errors.skills && <p className="mt-1 text-sm text-red-600">Pelo menos uma habilidade é obrigatória</p>}
              </div>
            </div>

            {/* Languages */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Idiomas *</h3>
              <div className="space-y-3">
                {profileData.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(index, e.target.value)}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="">Selecione um idioma</option>
                      {commonLanguages.map(langOption => (
                        <option key={langOption} value={langOption}>{langOption}</option>
                      ))}
                    </select>
                    {isEditing && profileData.languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Adicionar Idioma
                  </button>
                )}
                {errors.languages && <p className="mt-1 text-sm text-red-600">Pelo menos um idioma é obrigatório</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
