import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const RecipientSelector = ({ selectedRecipient, onRecipientSelect, currentLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    accountNumber: '',
    bankName: ''
  });

  const translations = {
    en: {
      selectRecipient: 'Select Recipient',
      recentContacts: 'Recent Contacts',
      savedBeneficiaries: 'Saved Beneficiaries',
      addNewRecipient: 'Add New Recipient',
      searchContacts: 'Search contacts...',
      recipientName: 'Recipient Name',
      emailAddress: 'Email Address',
      accountNumber: 'Account Number',
      bankName: 'Bank Name',
      addRecipient: 'Add Recipient',
      cancel: 'Cancel',
      scanQR: 'Scan QR Code',
      noResults: 'No contacts found',
      required: 'This field is required'
    },
    es: {
      selectRecipient: 'Seleccionar Destinatario',
      recentContacts: 'Contactos Recientes',
      savedBeneficiaries: 'Beneficiarios Guardados',
      addNewRecipient: 'Agregar Nuevo Destinatario',
      searchContacts: 'Buscar contactos...',
      recipientName: 'Nombre del Destinatario',
      emailAddress: 'Dirección de Email',
      accountNumber: 'Número de Cuenta',
      bankName: 'Nombre del Banco',
      addRecipient: 'Agregar Destinatario',
      cancel: 'Cancelar',
      scanQR: 'Escanear Código QR',
      noResults: 'No se encontraron contactos',
      required: 'Este campo es obligatorio'
    },
    fr: {
      selectRecipient: 'Sélectionner le destinataire',
      recentContacts: 'Contacts récents',
      savedBeneficiaries: 'Bénéficiaires sauvegardés',
      addNewRecipient: 'Ajouter un nouveau destinataire',
      searchContacts: 'Rechercher des contacts...',
      recipientName: 'Nom du destinataire',
      emailAddress: 'Adresse e-mail',
      accountNumber: 'Numéro de compte',
      bankName: 'Nom de la banque',
      addRecipient: 'Ajouter un destinataire',
      cancel: 'Annuler',
      scanQR: 'Scanner le code QR',
      noResults: 'Aucun contact trouvé',
      required: 'Ce champ est obligatoire'
    }
  };

  const recentContacts = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      accountNumber: '****1234',
      bankName: 'Chase Bank',
      lastTransfer: '2 days ago'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      accountNumber: '****5678',
      bankName: 'Bank of America',
      lastTransfer: '1 week ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      accountNumber: '****9012',
      bankName: 'Wells Fargo',
      lastTransfer: '2 weeks ago'
    }
  ];

  const savedBeneficiaries = [
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      accountNumber: '****3456',
      bankName: 'Citibank',
      category: 'Family'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      accountNumber: '****7890',
      bankName: 'TD Bank',
      category: 'Business'
    }
  ];

  const allContacts = [...recentContacts, ...savedBeneficiaries];

  const filteredContacts = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contact) => {
    onRecipientSelect(contact);
  };

  const handleAddNewRecipient = () => {
    if (newRecipient.name && newRecipient.email && newRecipient.accountNumber && newRecipient.bankName) {
      const recipient = {
        id: Date.now(),
        ...newRecipient,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newRecipient.name)}&background=2C3E50&color=fff`
      };
      onRecipientSelect(recipient);
      setShowAddNew(false);
      setNewRecipient({ name: '', email: '', accountNumber: '', bankName: '' });
    }
  };

  const handleScanQR = () => {
    // Simulate QR code scanning
    const mockQRData = {
      id: Date.now(),
      name: 'QR Contact',
      email: 'qr.contact@email.com',
      accountNumber: '****1111',
      bankName: 'Digital Bank',
      avatar: 'https://ui-avatars.com/api/?name=QR+Contact&background=E67E22&color=fff'
    };
    onRecipientSelect(mockQRData);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          {translations[currentLanguage].selectRecipient}
        </h2>
      </div>

      {!showAddNew ? (
        <>
          {/* Search Bar */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              color="var(--color-text-secondary)"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <Input
              type="text"
              placeholder={translations[currentLanguage].searchContacts}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddNew(true)}
              iconName="UserPlus"
              iconPosition="left"
            >
              {translations[currentLanguage].addNewRecipient}
            </Button>
            <Button
              variant="outline"
              onClick={handleScanQR}
              iconName="QrCode"
              iconPosition="left"
            >
              {translations[currentLanguage].scanQR}
            </Button>
          </div>

          {/* Recent Contacts */}
          {recentContacts.some(contact => 
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase())
          ) && (
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
                {translations[currentLanguage].recentContacts}
              </h3>
              <div className="space-y-2">
                {recentContacts
                  .filter(contact => 
                    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleContactSelect(contact)}
                      className={`
                        w-full flex items-center space-x-4 p-4 rounded-xl border transition-all duration-200
                        ${selectedRecipient?.id === contact.id
                          ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-muted'
                        }
                      `}
                    >
                      <div className="relative">
                        <Image
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-text-primary">{contact.name}</p>
                        <p className="text-sm text-text-secondary">{contact.email}</p>
                        <p className="text-xs text-text-secondary">
                          {contact.bankName} • {contact.accountNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-text-secondary">{contact.lastTransfer}</p>
                        <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Saved Beneficiaries */}
          {savedBeneficiaries.some(contact => 
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase())
          ) && (
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
                {translations[currentLanguage].savedBeneficiaries}
              </h3>
              <div className="space-y-2">
                {savedBeneficiaries
                  .filter(contact => 
                    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleContactSelect(contact)}
                      className={`
                        w-full flex items-center space-x-4 p-4 rounded-xl border transition-all duration-200
                        ${selectedRecipient?.id === contact.id
                          ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-muted'
                        }
                      `}
                    >
                      <div className="relative">
                        <Image
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-medium">
                          {contact.category}
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-text-primary">{contact.name}</p>
                        <p className="text-sm text-text-secondary">{contact.email}</p>
                        <p className="text-xs text-text-secondary">
                          {contact.bankName} • {contact.accountNumber}
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredContacts.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <Icon name="Users" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
              <p className="text-text-secondary">{translations[currentLanguage].noResults}</p>
            </div>
          )}
        </>
      ) : (
        /* Add New Recipient Form */
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">
              {translations[currentLanguage].addNewRecipient}
            </h3>
            <Button
              variant="ghost"
              onClick={() => setShowAddNew(false)}
              iconName="X"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {translations[currentLanguage].recipientName} *
              </label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={newRecipient.name}
                onChange={(e) => setNewRecipient(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {translations[currentLanguage].emailAddress} *
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={newRecipient.email}
                onChange={(e) => setNewRecipient(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {translations[currentLanguage].accountNumber} *
              </label>
              <Input
                type="text"
                placeholder="Enter account number"
                value={newRecipient.accountNumber}
                onChange={(e) => setNewRecipient(prev => ({ ...prev, accountNumber: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {translations[currentLanguage].bankName} *
              </label>
              <Input
                type="text"
                placeholder="Enter bank name"
                value={newRecipient.bankName}
                onChange={(e) => setNewRecipient(prev => ({ ...prev, bankName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddNew(false)}
              fullWidth
            >
              {translations[currentLanguage].cancel}
            </Button>
            <Button
              variant="primary"
              onClick={handleAddNewRecipient}
              disabled={!newRecipient.name || !newRecipient.email || !newRecipient.accountNumber || !newRecipient.bankName}
              fullWidth
            >
              {translations[currentLanguage].addRecipient}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientSelector;