import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInfoForm = ({ formData, onInputChange, onNext, currentLanguage }) => {
  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      continue: 'Continue',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      firstNamePlaceholder: 'Enter your first name',
      lastNamePlaceholder: 'Enter your last name',
      emailPlaceholder: 'Enter your email address',
      phonePlaceholder: '+1 (555) 123-4567',
      dobPlaceholder: 'Select your date of birth'
    },
    es: {
      personalInfo: 'Información Personal',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      dateOfBirth: 'Fecha de Nacimiento',
      continue: 'Continuar',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Por favor ingrese un email válido',
      invalidPhone: 'Por favor ingrese un número válido',
      firstNamePlaceholder: 'Ingrese su nombre',
      lastNamePlaceholder: 'Ingrese su apellido',
      emailPlaceholder: 'Ingrese su correo electrónico',
      phonePlaceholder: '+1 (555) 123-4567',
      dobPlaceholder: 'Seleccione su fecha de nacimiento'
    },
    fr: {
      personalInfo: 'Informations Personnelles',
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      dateOfBirth: 'Date de Naissance',
      continue: 'Continuer',
      required: 'Ce champ est obligatoire',
      invalidEmail: 'Veuillez saisir une adresse email valide',
      invalidPhone: 'Veuillez saisir un numéro valide',
      firstNamePlaceholder: 'Entrez votre prénom',
      lastNamePlaceholder: 'Entrez votre nom de famille',
      emailPlaceholder: 'Entrez votre adresse email',
      phonePlaceholder: '+1 (555) 123-4567',
      dobPlaceholder: 'Sélectionnez votre date de naissance'
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = translations[currentLanguage].required;
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = translations[currentLanguage].required;
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = translations[currentLanguage].required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations[currentLanguage].invalidEmail;
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = translations[currentLanguage].required;
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = translations[currentLanguage].invalidPhone;
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = translations[currentLanguage].required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    onInputChange(field, value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="User" size={32} color="var(--color-accent)" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-semibold text-text-primary mb-2">
          {translations[currentLanguage].personalInfo}
        </h3>
        <p className="text-text-secondary">
          Let's start with some basic information about you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {translations[currentLanguage].firstName}
            </label>
            <Input
              type="text"
              placeholder={translations[currentLanguage].firstNamePlaceholder}
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-error' : ''}
            />
            {errors.firstName && (
              <p className="text-error text-sm mt-1 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {translations[currentLanguage].lastName}
            </label>
            <Input
              type="text"
              placeholder={translations[currentLanguage].lastNamePlaceholder}
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-error' : ''}
            />
            {errors.lastName && (
              <p className="text-error text-sm mt-1 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {translations[currentLanguage].email}
          </label>
          <Input
            type="email"
            placeholder={translations[currentLanguage].emailPlaceholder}
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {translations[currentLanguage].phone}
          </label>
          <Input
            type="tel"
            placeholder={translations[currentLanguage].phonePlaceholder}
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-error' : ''}
          />
          {errors.phone && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {translations[currentLanguage].dateOfBirth}
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-error' : ''}
            max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          className="mt-8"
        >
          {translations[currentLanguage].continue}
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;