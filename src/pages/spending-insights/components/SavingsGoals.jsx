import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavingsGoals = ({ currentLanguage }) => {
  const [goals, setGoals] = useState([]);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  const translations = {
    en: {
      savingsGoals: 'Savings Goals',
      addGoal: 'Add Goal',
      progress: 'Progress',
      target: 'Target',
      saved: 'Saved',
      remaining: 'Remaining',
      onTrack: 'On Track',
      behindSchedule: 'Behind Schedule',
      completed: 'Completed',
      daysLeft: 'days left',
      monthsLeft: 'months left',
      addMoney: 'Add Money',
      editGoal: 'Edit Goal',
      newGoal: 'New Savings Goal',
      goalName: 'Goal Name',
      targetAmount: 'Target Amount',
      targetDate: 'Target Date',
      createGoal: 'Create Goal',
      cancel: 'Cancel'
    },
    es: {
      savingsGoals: 'Metas de Ahorro',
      addGoal: 'Agregar Meta',
      progress: 'Progreso',
      target: 'Objetivo',
      saved: 'Ahorrado',
      remaining: 'Restante',
      onTrack: 'En Camino',
      behindSchedule: 'Atrasado',
      completed: 'Completado',
      daysLeft: 'días restantes',
      monthsLeft: 'meses restantes',
      addMoney: 'Agregar Dinero',
      editGoal: 'Editar Meta',
      newGoal: 'Nueva Meta de Ahorro',
      goalName: 'Nombre de la Meta',
      targetAmount: 'Monto Objetivo',
      targetDate: 'Fecha Objetivo',
      createGoal: 'Crear Meta',
      cancel: 'Cancelar'
    },
    fr: {
      savingsGoals: 'Objectifs d\'Épargne',
      addGoal: 'Ajouter un Objectif',
      progress: 'Progrès',
      target: 'Cible',
      saved: 'Épargné',
      remaining: 'Restant',
      onTrack: 'Sur la Bonne Voie',
      behindSchedule: 'En Retard',
      completed: 'Terminé',
      daysLeft: 'jours restants',
      monthsLeft: 'mois restants',
      addMoney: 'Ajouter de l\'Argent',
      editGoal: 'Modifier l\'Objectif',
      newGoal: 'Nouvel Objectif d\'Épargne',
      goalName: 'Nom de l\'Objectif',
      targetAmount: 'Montant Cible',
      targetDate: 'Date Cible',
      createGoal: 'Créer l\'Objectif',
      cancel: 'Annuler'
    }
  };

  const goalIcons = {
    'Emergency Fund': 'Shield',
    'Vacation': 'Plane',
    'New Car': 'Car',
    'Home Down Payment': 'Home',
    'Wedding': 'Heart',
    'Education': 'GraduationCap',
    'Retirement': 'PiggyBank',
    'Electronics': 'Smartphone'
  };

  const goalColors = {
    'Emergency Fund': '#E74C3C',
    'Vacation': '#3498DB',
    'New Car': '#2ECC71',
    'Home Down Payment': '#F39C12',
    'Wedding': '#E91E63',
    'Education': '#9B59B6',
    'Retirement': '#34495E',
    'Electronics': '#1ABC9C'
  };

  useEffect(() => {
    const mockGoals = [
      {
        id: 1,
        name: 'Emergency Fund',
        targetAmount: 10000,
        savedAmount: 6750,
        targetDate: new Date('2024-12-31'),
        createdDate: new Date('2024-01-01'),
        status: 'active'
      },
      {
        id: 2,
        name: 'Vacation',
        targetAmount: 3500,
        savedAmount: 2100,
        targetDate: new Date('2024-07-15'),
        createdDate: new Date('2024-02-01'),
        status: 'active'
      },
      {
        id: 3,
        name: 'New Car',
        targetAmount: 25000,
        savedAmount: 8500,
        targetDate: new Date('2025-03-01'),
        createdDate: new Date('2023-12-01'),
        status: 'active'
      },
      {
        id: 4,
        name: 'Electronics',
        targetAmount: 1200,
        savedAmount: 1200,
        targetDate: new Date('2024-03-01'),
        createdDate: new Date('2023-11-01'),
        status: 'completed'
      }
    ];
    setGoals(mockGoals);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (saved, target) => {
    return Math.min((saved / target) * 100, 100);
  };

  const getDaysUntilTarget = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGoalStatus = (goal) => {
    if (goal.status === 'completed') return 'completed';
    
    const daysLeft = getDaysUntilTarget(goal.targetDate);
    const progressPercentage = getProgressPercentage(goal.savedAmount, goal.targetAmount);
    
    if (daysLeft < 0) return 'overdue';
    
    const expectedProgress = ((new Date() - goal.createdDate) / (goal.targetDate - goal.createdDate)) * 100;
    
    if (progressPercentage >= expectedProgress * 0.9) return 'onTrack';
    return 'behindSchedule';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'onTrack':
        return 'var(--color-success)';
      case 'behindSchedule':
        return 'var(--color-warning)';
      case 'overdue':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return translations[currentLanguage].completed;
      case 'onTrack':
        return translations[currentLanguage].onTrack;
      case 'behindSchedule':
        return translations[currentLanguage].behindSchedule;
      default:
        return '';
    }
  };

  const getTimeRemaining = (targetDate) => {
    const daysLeft = getDaysUntilTarget(targetDate);
    if (daysLeft < 0) return 'Overdue';
    if (daysLeft < 30) return `${daysLeft} ${translations[currentLanguage].daysLeft}`;
    
    const monthsLeft = Math.ceil(daysLeft / 30);
    return `${monthsLeft} ${translations[currentLanguage].monthsLeft}`;
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-elevation-1 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {translations[currentLanguage].savingsGoals}
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddGoalModal(true)}
          iconName="Plus"
          iconPosition="left"
          size="sm"
        >
          {translations[currentLanguage].addGoal}
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progressPercentage = getProgressPercentage(goal.savedAmount, goal.targetAmount);
          const status = getGoalStatus(goal);
          const remaining = goal.targetAmount - goal.savedAmount;
          const timeRemaining = getTimeRemaining(goal.targetDate);

          return (
            <div 
              key={goal.id}
              className="p-4 bg-muted rounded-xl hover:bg-border-light transition-colors duration-200"
            >
              {/* Goal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${goalColors[goal.name] || '#95A5A6'}20` }}
                  >
                    <Icon 
                      name={goalIcons[goal.name] || 'Target'} 
                      size={20} 
                      color={goalColors[goal.name] || '#95A5A6'}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{goal.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(status)}20`,
                          color: getStatusColor(status)
                        }}
                      >
                        {getStatusText(status)}
                      </span>
                      {status !== 'completed' && (
                        <span className="text-xs text-text-secondary">
                          {timeRemaining}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-text-primary">
                    {formatCurrency(goal.savedAmount)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    of {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    {translations[currentLanguage].progress}
                  </span>
                  <span className="font-medium text-text-primary">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="w-full bg-border-light rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${progressPercentage}%`,
                      backgroundColor: goalColors[goal.name] || '#95A5A6'
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{formatCurrency(0)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>

              {/* Goal Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">
                    {translations[currentLanguage].saved}
                  </p>
                  <p className="font-mono font-semibold text-success">
                    {formatCurrency(goal.savedAmount)}
                  </p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">
                    {translations[currentLanguage].remaining}
                  </p>
                  <p className="font-mono font-semibold text-text-primary">
                    {formatCurrency(Math.max(remaining, 0))}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {status !== 'completed' && (
                <div className="flex items-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    className="flex-1"
                  >
                    {translations[currentLanguage].addMoney}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                    className="flex-1"
                  >
                    {translations[currentLanguage].editGoal}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-200 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowAddGoalModal(false)}
          />
          <div className="relative w-full max-w-md mx-4 bg-surface rounded-2xl shadow-elevation-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">
                {translations[currentLanguage].newGoal}
              </h3>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={20} color="var(--color-text-secondary)" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].goalName}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Emergency Fund"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].targetAmount}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {translations[currentLanguage].targetDate}
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-3 pt-4">
                <Button
                  variant="primary"
                  onClick={() => setShowAddGoalModal(false)}
                  fullWidth
                >
                  {translations[currentLanguage].createGoal}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowAddGoalModal(false)}
                  fullWidth
                >
                  {translations[currentLanguage].cancel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoals;