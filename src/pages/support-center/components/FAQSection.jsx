import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = ({ searchQuery, currentLanguage }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [votedItems, setVotedItems] = useState(new Map());

  const translations = {
    en: {
      faq: "Frequently Asked Questions",
      accountManagement: "Account Management",
      transfers: "Transfers & Payments",
      security: "Security",
      technicalIssues: "Technical Issues",
      helpful: "Was this helpful?",
      yes: "Yes",
      no: "No",
      relatedArticles: "Related Articles",
      showMore: "Show More",
      showLess: "Show Less"
    },
    es: {
      faq: "Preguntas Frecuentes",
      accountManagement: "Gestión de Cuenta",
      transfers: "Transferencias y Pagos",
      security: "Seguridad",
      technicalIssues: "Problemas Técnicos",
      helpful: "¿Fue útil?",
      yes: "Sí",
      no: "No",
      relatedArticles: "Artículos Relacionados",
      showMore: "Mostrar Más",
      showLess: "Mostrar Menos"
    },
    fr: {
      faq: "Questions Fréquemment Posées",
      accountManagement: "Gestion de Compte",
      transfers: "Transferts et Paiements",
      security: "Sécurité",
      technicalIssues: "Problèmes Techniques",
      helpful: "Était-ce utile?",
      yes: "Oui",
      no: "Non",
      relatedArticles: "Articles Connexes",
      showMore: "Afficher Plus",
      showLess: "Afficher Moins"
    }
  };

  const faqCategories = [
    {
      id: 'account',
      title: translations[currentLanguage].accountManagement,
      icon: 'User',
      items: [
        {
          id: 'account-1',
          question: "How do I update my profile information?",
          answer: `To update your profile information:\n\n1. Go to Settings from the main menu\n2. Select 'Profile Information'\n3. Edit the fields you want to change\n4. Click 'Save Changes'\n\nYou can update your name, email, phone number, and address. Some changes may require verification.`
        },
        {
          id: 'account-2',
          question: "How do I change my account password?",
          answer: `To change your password:\n\n1. Go to Settings > Security\n2. Click 'Change Password'\n3. Enter your current password\n4. Enter your new password (must be at least 8 characters)\n5. Confirm your new password\n6. Click 'Update Password'\n\nFor security, you'll be logged out of all devices after changing your password.`
        },
        {
          id: 'account-3',
          question: "How do I close my account?",
          answer: `To close your account:\n\n1. Ensure your account balance is zero\n2. Cancel any pending transactions\n3. Contact our support team\n4. Provide account closure reason\n5. Confirm your identity\n\nAccount closure is permanent and cannot be undone. Please consider temporarily deactivating instead.`
        }
      ]
    },
    {
      id: 'transfers',
      title: translations[currentLanguage].transfers,
      icon: 'Send',
      items: [
        {
          id: 'transfer-1',
          question: "What are the transfer limits?",
          answer: `Daily transfer limits:\n\n• Standard accounts: $5,000 per day\n• Premium accounts: $25,000 per day\n• Business accounts: $100,000 per day\n\nMonthly limits:\n• Standard: $50,000\n• Premium: $250,000\n• Business: $1,000,000\n\nLimits can be increased by contacting support with proper documentation.`
        },
        {
          id: 'transfer-2',
          question: "How long do transfers take?",
          answer: `Transfer times vary by type:\n\n• Instant transfers: Immediate (fee applies)\n• Standard transfers: 1-3 business days\n• International transfers: 3-5 business days\n• Wire transfers: Same day if sent before 2 PM\n\nWeekends and holidays may extend processing times.`
        },
        {
          id: 'transfer-3',
          question: "What are the transfer fees?",
          answer: `Transfer fees:\n\n• Instant transfers: $2.99\n• Standard transfers: Free\n• International transfers: $15 + exchange rate\n• Wire transfers: $25 domestic, $45 international\n\nPremium account holders get reduced fees on all transfer types.`
        }
      ]
    },
    {
      id: 'security',
      title: translations[currentLanguage].security,
      icon: 'Shield',
      items: [
        {
          id: 'security-1',
          question: "How do I enable two-factor authentication?",
          answer: `To enable 2FA:\n\n1. Go to Settings > Security\n2. Click 'Two-Factor Authentication'\n3. Choose your preferred method (SMS or Authenticator app)\n4. Follow the setup instructions\n5. Enter the verification code\n6. Save your backup codes\n\n2FA adds an extra layer of security to your account.`
        },
        {
          id: 'security-2',
          question: "What should I do if my account is compromised?",
          answer: `If your account is compromised:\n\n1. Change your password immediately\n2. Enable 2FA if not already active\n3. Review recent transactions\n4. Contact support immediately\n5. File a dispute for unauthorized transactions\n6. Monitor your account closely\n\nWe'll help secure your account and investigate any unauthorized activity.`
        },
        {
          id: 'security-3',
          question: "How do I report suspicious activity?",
          answer: `To report suspicious activity:\n\n1. Use the 'Report Issue' button in the app\n2. Select 'Suspicious Activity'\n3. Provide details about the incident\n4. Include screenshots if available\n5. Submit the report\n\nOur security team will investigate within 24 hours and take appropriate action.`
        }
      ]
    },
    {
      id: 'technical',
      title: translations[currentLanguage].technicalIssues,
      icon: 'Settings',
      items: [
        {
          id: 'tech-1',
          question: "The app is not loading properly",
          answer: `If the app isn't loading:\n\n1. Check your internet connection\n2. Close and restart the app\n3. Clear the app cache\n4. Update to the latest version\n5. Restart your device\n6. Reinstall the app if needed\n\nIf problems persist, contact our technical support team.`
        },
        {
          id: 'tech-2',question: "I can\'t log into my account",answer: `If you can't log in:\n\n1. Check your email/username spelling\n2. Verify your password\n3. Try the 'Forgot Password' option\n4. Clear browser cache/cookies\n5. Try a different browser/device\n6. Check if your account is locked\n\nContact support if you still can't access your account.`
        },
        {
          id: 'tech-3',question: "Transactions are not showing up",answer: `If transactions aren't showing:\n\n1. Refresh the transaction list\n2. Check the date filter settings\n3. Verify the transaction was completed\n4. Wait a few minutes for processing\n5. Check your internet connection\n\nTransactions typically appear within 5 minutes of completion.`
        }
      ]
    }
  ];

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleVote = (itemId, helpful) => {
    setVotedItems(new Map(votedItems.set(itemId, helpful)));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-text-primary">
        {translations[currentLanguage].faq}
      </h2>

      {filteredCategories.map((category) => (
        <div key={category.id} className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-4 bg-muted border-b border-border">
            <div className="flex items-center space-x-3">
              <Icon 
                name={category.icon} 
                size={20} 
                color="var(--color-accent)" 
              />
              <h3 className="font-semibold text-text-primary">
                {category.title}
              </h3>
              <span className="text-sm text-text-secondary">
                ({category.items.length})
              </span>
            </div>
          </div>

          <div className="divide-y divide-border">
            {category.items.map((item) => (
              <div key={item.id} className="p-4">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full flex items-center justify-between text-left hover:bg-muted/50 p-2 rounded-lg transition-colors duration-200"
                >
                  <h4 className="font-medium text-text-primary pr-4">
                    {item.question}
                  </h4>
                  <Icon 
                    name={expandedItems.has(item.id) ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    color="var(--color-text-secondary)"
                    className="flex-shrink-0"
                  />
                </button>

                {expandedItems.has(item.id) && (
                  <div className="mt-4 pl-2">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-text-secondary whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>

                    {/* Helpful Vote */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">
                          {translations[currentLanguage].helpful}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVote(item.id, true)}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors duration-200 ${
                              votedItems.get(item.id) === true
                                ? 'bg-success text-success-foreground'
                                : 'hover:bg-muted text-text-secondary'
                            }`}
                          >
                            <Icon name="ThumbsUp" size={16} />
                            <span className="text-sm">{translations[currentLanguage].yes}</span>
                          </button>
                          <button
                            onClick={() => handleVote(item.id, false)}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors duration-200 ${
                              votedItems.get(item.id) === false
                                ? 'bg-error text-error-foreground'
                                : 'hover:bg-muted text-text-secondary'
                            }`}
                          >
                            <Icon name="ThumbsDown" size={16} />
                            <span className="text-sm">{translations[currentLanguage].no}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No results found
          </h3>
          <p className="text-text-secondary">
            Try searching with different keywords or browse our categories above.
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQSection;