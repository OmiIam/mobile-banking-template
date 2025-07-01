import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportTickets = ({ currentLanguage }) => {
  const [tickets, setTickets] = useState([
    {
      id: 'TK-2024-001',
      subject: 'Transaction dispute for $250.00',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      lastUpdate: new Date('2024-01-16'),
      category: 'dispute'
    },
    {
      id: 'TK-2024-002',
      subject: 'Unable to reset password',
      status: 'resolved',
      priority: 'medium',
      createdAt: new Date('2024-01-10'),
      lastUpdate: new Date('2024-01-12'),
      category: 'account'
    },
    {
      id: 'TK-2024-003',
      subject: 'Mobile app login issues',
      status: 'open',
      priority: 'low',
      createdAt: new Date('2024-01-08'),
      lastUpdate: new Date('2024-01-08'),
      category: 'technical'
    }
  ]);

  const translations = {
    en: {
      supportTickets: "Support Tickets",
      createTicket: "Create New Ticket",
      ticketId: "Ticket ID",
      subject: "Subject",
      status: "Status",
      priority: "Priority",
      created: "Created",
      lastUpdate: "Last Update",
      viewDetails: "View Details",
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
      closed: "Closed",
      high: "High",
      medium: "Medium",
      low: "Low",
      noTickets: "No support tickets found",
      createFirstTicket: "Create your first support ticket to get help with any issues."
    },
    es: {
      supportTickets: "Tickets de Soporte",
      createTicket: "Crear Nuevo Ticket",
      ticketId: "ID del Ticket",
      subject: "Asunto",
      status: "Estado",
      priority: "Prioridad",
      created: "Creado",
      lastUpdate: "Última Actualización",
      viewDetails: "Ver Detalles",
      open: "Abierto",
      inProgress: "En Progreso",
      resolved: "Resuelto",
      closed: "Cerrado",
      high: "Alto",
      medium: "Medio",
      low: "Bajo",
      noTickets: "No se encontraron tickets de soporte",
      createFirstTicket: "Crea tu primer ticket de soporte para obtener ayuda con cualquier problema."
    },
    fr: {
      supportTickets: "Tickets de Support",
      createTicket: "Créer Nouveau Ticket",
      ticketId: "ID du Ticket",
      subject: "Sujet",
      status: "Statut",
      priority: "Priorité",
      created: "Créé",
      lastUpdate: "Dernière Mise à Jour",
      viewDetails: "Voir Détails",
      open: "Ouvert",
      inProgress: "En Cours",
      resolved: "Résolu",
      closed: "Fermé",
      high: "Élevé",
      medium: "Moyen",
      low: "Bas",
      noTickets: "Aucun ticket de support trouvé",
      createFirstTicket: "Créez votre premier ticket de support pour obtenir de l\'aide avec tout problème."
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'in-progress':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'resolved':
        return 'text-success bg-success/10 border-success/20';
      case 'closed':
        return 'text-text-secondary bg-muted border-border';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'dispute':
        return 'AlertTriangle';
      case 'account':
        return 'User';
      case 'technical':
        return 'Settings';
      default:
        return 'HelpCircle';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCreateTicket = () => {
    console.log('Creating new support ticket...');
  };

  const handleViewTicket = (ticketId) => {
    console.log(`Viewing ticket: ${ticketId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          {translations[currentLanguage].supportTickets}
        </h2>
        <Button
          variant="primary"
          onClick={handleCreateTicket}
          iconName="Plus"
          iconPosition="left"
        >
          {translations[currentLanguage].createTicket}
        </Button>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-surface border border-border rounded-xl">
          <Icon name="Ticket" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            {translations[currentLanguage].noTickets}
          </h3>
          <p className="text-text-secondary mb-6">
            {translations[currentLanguage].createFirstTicket}
          </p>
          <Button
            variant="primary"
            onClick={handleCreateTicket}
            iconName="Plus"
            iconPosition="left"
          >
            {translations[currentLanguage].createTicket}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon 
                      name={getCategoryIcon(ticket.category)} 
                      size={20} 
                      color="var(--color-accent)" 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono text-sm font-medium text-text-secondary">
                        {ticket.id}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`}>
                        {translations[currentLanguage][ticket.status.replace('-', '')]}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                        {translations[currentLanguage][ticket.priority]}
                      </span>
                    </div>
                    <h3 className="font-medium text-text-primary mb-2">
                      {ticket.subject}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span>
                        {translations[currentLanguage].created}: {formatDate(ticket.createdAt)}
                      </span>
                      <span>
                        {translations[currentLanguage].lastUpdate}: {formatDate(ticket.lastUpdate)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleViewTicket(ticket.id)}
                  iconName="ExternalLink"
                  iconPosition="right"
                  size="sm"
                >
                  {translations[currentLanguage].viewDetails}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportTickets;