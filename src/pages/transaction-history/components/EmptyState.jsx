import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters, onStartTransfer, currentLanguage }) => {
  const translations = {
    en: {
      noTransactions: 'No transactions found',
      noTransactionsDesc: 'You haven\'t made any transactions yet. Start by making your first transfer or payment.',
      noFilterResults: 'No transactions match your filters',
      noFilterResultsDesc: 'Try adjusting your search criteria or clearing some filters to see more results.',
      clearFilters: 'Clear Filters',
      makeTransfer: 'Make a Transfer',
      startTransacting: 'Start Transacting'
    },
    es: {
      noTransactions: 'No se encontraron transacciones',
      noTransactionsDesc: 'Aún no has realizado ninguna transacción. Comienza haciendo tu primera transferencia o pago.',
      noFilterResults: 'Ninguna transacción coincide con tus filtros',
      noFilterResultsDesc: 'Intenta ajustar tus criterios de búsqueda o eliminar algunos filtros para ver más resultados.',
      clearFilters: 'Limpiar Filtros',
      makeTransfer: 'Hacer una Transferencia',
      startTransacting: 'Comenzar a Transaccionar'
    },
    fr: {
      noTransactions: 'Aucune transaction trouvée',
      noTransactionsDesc: 'Vous n\'avez encore effectué aucune transaction. Commencez par faire votre premier transfert ou paiement.',
      noFilterResults: 'Aucune transaction ne correspond à vos filtres',
      noFilterResultsDesc: 'Essayez d\'ajuster vos critères de recherche ou d\'effacer certains filtres pour voir plus de résultats.',
      clearFilters: 'Effacer les filtres',
      makeTransfer: 'Faire un transfert',
      startTransacting: 'Commencer les transactions'
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon
          name={hasFilters ? "Search" : "Receipt"}
          size={40}
          color="var(--color-text-secondary)"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        {hasFilters 
          ? translations[currentLanguage].noFilterResults
          : translations[currentLanguage].noTransactions
        }
      </h3>
      
      <p className="text-text-secondary mb-8 max-w-sm">
        {hasFilters 
          ? translations[currentLanguage].noFilterResultsDesc
          : translations[currentLanguage].noTransactionsDesc
        }
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {hasFilters ? (
          <Button
            variant="primary"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            {translations[currentLanguage].clearFilters}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onStartTransfer}
            iconName="Send"
            iconPosition="left"
          >
            {translations[currentLanguage].makeTransfer}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;