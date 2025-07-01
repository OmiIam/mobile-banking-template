import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySetupForm = ({ formData, onInputChange, onNext, onBack, currentLanguage }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const translations = {
    en: {
      securitySetup: 'Security Setup',
      createPassword: 'Create Password',
      confirmPassword: 'Confirm Password',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      requirements: 'Password Requirements:',
      minLength: 'At least 8 characters',
      uppercase: 'One uppercase letter',
      lowercase: 'One lowercase letter',
      number: 'One number',
      special: 'One special character',
      continue: 'Continue',
      back: 'Back',
      required: 'This field is required',
      passwordMismatch: 'Passwords do not match',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordPlaceholder: 'Confirm your password'
    },
    es: {
      securitySetup: 'Configuración de Seguridad',
      createPassword: 'Crear Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      passwordStrength: 'Fortaleza de Contraseña',
      weak: 'Débil',
      fair: 'Regular',
      good: 'Buena',
      strong: 'Fuerte',
      requirements: 'Requisitos de Contraseña:',
      minLength: 'Al menos 8 caracteres',
      uppercase: 'Una letra mayúscula',
      lowercase: 'Una letra minúscula',
      number: 'Un número',
      special: 'Un carácter especial',
      continue: 'Continuar',
      back: 'Atrás',
      required: 'Este campo es obligatorio',
      passwordMismatch: 'Las contraseñas no coinciden',
      passwordPlaceholder: 'Ingrese su contraseña',
      confirmPasswordPlaceholder: 'Confirme su contraseña'
    },
    fr: {
      securitySetup: 'Configuration de Sécurité',
      createPassword: 'Créer un Mot de Passe',
      confirmPassword: 'Confirmer le Mot de Passe',
      passwordStrength: 'Force du Mot de Passe',
      weak: 'Faible',
      fair: 'Correct',
      good: 'Bon',
      strong: 'Fort',
      requirements: 'Exigences du Mot de Passe:',
      minLength: 'Au moins 8 caractères',
      uppercase: 'Une lettre majuscule',
      lowercase: 'Une lettre minuscule',
      number: 'Un chiffre',
      special: 'Un caractère spécial',
      continue: 'Continuer',
      back: 'Retour',
      required: 'Ce champ est obligatoire',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      passwordPlaceholder: 'Entrez votre mot de passe',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe'
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const requirements = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    
    strength = requirements.filter(Boolean).length;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    const strengthTexts = [
      translations[currentLanguage].weak,
      translations[currentLanguage].weak,
      translations[currentLanguage].fair,
      translations[currentLanguage].good,
      translations[currentLanguage].strong,
      translations[currentLanguage].strong
    ];
    return strengthTexts[strength] || translations[currentLanguage].weak;
  };

  const getPasswordStrengthColor = (strength) => {
    const colors = ['bg-error', 'bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    return colors[strength] || 'bg-error';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password?.trim()) {
      newErrors.password = translations[currentLanguage].required;
    } else if (calculatePasswordStrength(formData.password) < 3) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    if (!formData.confirmPassword?.trim()) {
      newErrors.confirmPassword = translations[currentLanguage].required;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = translations[currentLanguage].passwordMismatch;
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

  const handlePasswordChange = (value) => {
    onInputChange('password', value);
    setPasswordStrength(calculatePasswordStrength(value));
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleConfirmPasswordChange = (value) => {
    onInputChange('confirmPassword', value);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const passwordRequirements = [
    { key: 'minLength', test: (pwd) => pwd.length >= 8, text: translations[currentLanguage].minLength },
    { key: 'uppercase', test: (pwd) => /[A-Z]/.test(pwd), text: translations[currentLanguage].uppercase },
    { key: 'lowercase', test: (pwd) => /[a-z]/.test(pwd), text: translations[currentLanguage].lowercase },
    { key: 'number', test: (pwd) => /\d/.test(pwd), text: translations[currentLanguage].number },
    { key: 'special', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), text: translations[currentLanguage].special }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} color="var(--color-accent)" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-semibold text-text-primary mb-2">
          {translations[currentLanguage].securitySetup}
        </h3>
        <p className="text-text-secondary">
          Create a strong password to secure your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {translations[currentLanguage].createPassword}
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={translations[currentLanguage].passwordPlaceholder}
              value={formData.password || ''}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={`pr-12 ${errors.password ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.password}
            </p>
          )}
          
          {formData.password && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">
                  {translations[currentLanguage].passwordStrength}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {translations[currentLanguage].confirmPassword}
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={translations[currentLanguage].confirmPasswordPlaceholder}
              value={formData.confirmPassword || ''}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className={`pr-12 ${errors.confirmPassword ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-sm font-medium text-text-primary mb-3">
            {translations[currentLanguage].requirements}
          </h4>
          <div className="space-y-2">
            {passwordRequirements.map((req) => (
              <div key={req.key} className="flex items-center space-x-2">
                <Icon 
                  name={req.test(formData.password || '') ? 'CheckCircle' : 'Circle'} 
                  size={16} 
                  color={req.test(formData.password || '') ? 'var(--color-success)' : 'var(--color-text-secondary)'}
                />
                <span className={`text-sm ${req.test(formData.password || '') ? 'text-success' : 'text-text-secondary'}`}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            {translations[currentLanguage].back}
          </Button>
          <Button
            type="submit"
            variant="primary"
            iconName="ArrowRight"
            iconPosition="right"
            className="flex-1"
          >
            {translations[currentLanguage].continue}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySetupForm;