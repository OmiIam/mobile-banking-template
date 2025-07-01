import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricSetupForm = ({ onNext, onBack, onSkip, currentLanguage }) => {
  const [enrollmentStep, setEnrollmentStep] = useState('intro');
  const [progress, setProgress] = useState(0);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const translations = {
    en: {
      biometricSetup: 'Biometric Setup',
      secureAccess: 'Secure Access',
      fingerprintTitle: 'Set up Fingerprint',
      faceIdTitle: 'Set up Face ID',
      intro: 'Choose your preferred biometric authentication method for quick and secure access to your account.',
      fingerprintInstructions: 'Place your finger on the sensor and lift repeatedly until the enrollment is complete.',
      faceIdInstructions: 'Position your face within the frame and follow the on-screen guidance.',
      enrolling: 'Enrolling...',
      enrollmentComplete: 'Enrollment Complete!',
      setupFingerprint: 'Set up Fingerprint',
      setupFaceId: 'Set up Face ID',
      skip: 'Skip for Now',
      continue: 'Continue',
      back: 'Back',
      tryAgain: 'Try Again',
      enrollmentSuccess: 'Your biometric authentication has been successfully configured.',
      placeFinger: 'Place your finger on the sensor',
      liftFinger: 'Lift and place again',
      positionFace: 'Position your face in the frame',
      moveSlowly: 'Move your head slowly in a circle'
    },
    es: {
      biometricSetup: 'Configuración Biométrica',
      secureAccess: 'Acceso Seguro',
      fingerprintTitle: 'Configurar Huella Digital',
      faceIdTitle: 'Configurar Face ID',
      intro: 'Elija su método de autenticación biométrica preferido para un acceso rápido y seguro a su cuenta.',
      fingerprintInstructions: 'Coloque su dedo en el sensor y levántelo repetidamente hasta completar la inscripción.',
      faceIdInstructions: 'Posicione su rostro dentro del marco y siga las instrucciones en pantalla.',
      enrolling: 'Inscribiendo...',
      enrollmentComplete: '¡Inscripción Completa!',
      setupFingerprint: 'Configurar Huella Digital',
      setupFaceId: 'Configurar Face ID',
      skip: 'Omitir por Ahora',
      continue: 'Continuar',
      back: 'Atrás',
      tryAgain: 'Intentar de Nuevo',
      enrollmentSuccess: 'Su autenticación biométrica ha sido configurada exitosamente.',
      placeFinger: 'Coloque su dedo en el sensor',
      liftFinger: 'Levante y coloque nuevamente',
      positionFace: 'Posicione su rostro en el marco',
      moveSlowly: 'Mueva su cabeza lentamente en círculo'
    },
    fr: {
      biometricSetup: 'Configuration Biométrique',
      secureAccess: 'Accès Sécurisé',
      fingerprintTitle: 'Configurer l\'Empreinte',
      faceIdTitle: 'Configurer Face ID',
      intro: 'Choisissez votre méthode d\'authentification biométrique préférée pour un accès rapide et sécurisé à votre compte.',
      fingerprintInstructions: 'Placez votre doigt sur le capteur et soulevez-le répétitivement jusqu\'à ce que l\'inscription soit terminée.',
      faceIdInstructions: 'Positionnez votre visage dans le cadre et suivez les instructions à l\'écran.',
      enrolling: 'Inscription...',
      enrollmentComplete: 'Inscription Terminée!',
      setupFingerprint: 'Configurer l\'Empreinte',
      setupFaceId: 'Configurer Face ID',
      skip: 'Ignorer pour l\'instant',
      continue: 'Continuer',
      back: 'Retour',
      tryAgain: 'Réessayer',
      enrollmentSuccess: 'Votre authentification biométrique a été configurée avec succès.',
      placeFinger: 'Placez votre doigt sur le capteur',
      liftFinger: 'Soulevez et placez à nouveau',
      positionFace: 'Positionnez votre visage dans le cadre',
      moveSlowly: 'Bougez votre tête lentement en cercle'
    }
  };

  const startEnrollment = (type) => {
    setEnrollmentStep(type);
    setIsEnrolling(true);
    setProgress(0);
    
    // Simulate enrollment progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsEnrolling(false);
          setEnrollmentStep('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const FingerprintAnimation = () => (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse"></div>
      <div className="absolute inset-4 bg-accent/20 rounded-full animate-ping"></div>
      <div className="absolute inset-8 bg-accent rounded-full flex items-center justify-center">
        <Icon name="Fingerprint" size={48} color="white" strokeWidth={1.5} />
      </div>
      {isEnrolling && (
        <div className="absolute inset-0 border-4 border-accent rounded-full animate-spin border-t-transparent"></div>
      )}
    </div>
  );

  const FaceIdAnimation = () => (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse"></div>
      <div className="absolute inset-4 bg-accent/20 rounded-full animate-ping"></div>
      <div className="absolute inset-8 bg-accent rounded-full flex items-center justify-center">
        <Icon name="Scan" size={48} color="white" strokeWidth={1.5} />
      </div>
      {isEnrolling && (
        <div className="absolute inset-0 border-4 border-accent rounded-full animate-spin border-t-transparent"></div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Scan" size={32} color="var(--color-accent)" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-semibold text-text-primary mb-2">
          {translations[currentLanguage].biometricSetup}
        </h3>
        <p className="text-text-secondary">
          {translations[currentLanguage].secureAccess}
        </p>
      </div>

      {enrollmentStep === 'intro' && (
        <div className="space-y-6">
          <p className="text-center text-text-secondary">
            {translations[currentLanguage].intro}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => startEnrollment('fingerprint')}
              className="w-full p-6 border-2 border-border hover:border-accent rounded-xl transition-all duration-200 hover:bg-accent/5"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Fingerprint" size={24} color="var(--color-accent)" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-text-primary">
                    {translations[currentLanguage].setupFingerprint}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Quick and secure access with your fingerprint
                  </p>
                </div>
                <Icon name="ChevronRight" size={20} color="var(--color-text-secondary)" />
              </div>
            </button>

            <button
              onClick={() => startEnrollment('faceid')}
              className="w-full p-6 border-2 border-border hover:border-accent rounded-xl transition-all duration-200 hover:bg-accent/5"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Scan" size={24} color="var(--color-accent)" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-text-primary">
                    {translations[currentLanguage].setupFaceId}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Hands-free access with facial recognition
                  </p>
                </div>
                <Icon name="ChevronRight" size={20} color="var(--color-text-secondary)" />
              </div>
            </button>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="flex-1"
            >
              {translations[currentLanguage].back}
            </Button>
            <Button
              variant="ghost"
              onClick={onSkip}
              className="flex-1"
            >
              {translations[currentLanguage].skip}
            </Button>
          </div>
        </div>
      )}

      {enrollmentStep === 'fingerprint' && (
        <div className="text-center space-y-6">
          <h4 className="text-xl font-semibold text-text-primary">
            {translations[currentLanguage].fingerprintTitle}
          </h4>
          
          <FingerprintAnimation />
          
          <div className="space-y-2">
            <p className="text-text-primary font-medium">
              {isEnrolling 
                ? `${translations[currentLanguage].enrolling} ${progress}%`
                : translations[currentLanguage].placeFinger
              }
            </p>
            <p className="text-sm text-text-secondary">
              {translations[currentLanguage].fingerprintInstructions}
            </p>
          </div>

          {isEnrolling && (
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 bg-accent rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {enrollmentStep === 'faceid' && (
        <div className="text-center space-y-6">
          <h4 className="text-xl font-semibold text-text-primary">
            {translations[currentLanguage].faceIdTitle}
          </h4>
          
          <FaceIdAnimation />
          
          <div className="space-y-2">
            <p className="text-text-primary font-medium">
              {isEnrolling 
                ? `${translations[currentLanguage].enrolling} ${progress}%`
                : translations[currentLanguage].positionFace
              }
            </p>
            <p className="text-sm text-text-secondary">
              {translations[currentLanguage].faceIdInstructions}
            </p>
          </div>

          {isEnrolling && (
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 bg-accent rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {enrollmentStep === 'complete' && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
            <Icon name="Check" size={40} color="white" strokeWidth={2.5} />
          </div>
          
          <div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              {translations[currentLanguage].enrollmentComplete}
            </h4>
            <p className="text-text-secondary">
              {translations[currentLanguage].enrollmentSuccess}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={onNext}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            {translations[currentLanguage].continue}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BiometricSetupForm;