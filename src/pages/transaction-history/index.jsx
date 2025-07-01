import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderContext from '../../components/ui/HeaderContext';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingSupport from '../../components/ui/FloatingSupport';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import TransactionCard from './components/TransactionCard';
import TransactionSkeleton from './components/TransactionSkeleton';
import MonthlyGroupHeader from './components/MonthlyGroupHeader';
import EmptyState from './components/EmptyState';
import Button from '../../components/ui/Button';


const TransactionHistory = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchValue, setSearchValue] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(['Amazon', 'Starbucks', 'Netflix']);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const translations = {
    en: {
      transactionHistory: 'Transaction History',
      export: 'Export',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      bulkActions: 'Bulk Actions',
      categorize: 'Categorize',
      exportSelected: 'Export Selected',
      loadingMore: 'Loading more transactions...',
      viewDetails: 'View Details',
      dispute: 'Dispute Transaction'
    },
    es: {
      transactionHistory: 'Historial de Transacciones',
      export: 'Exportar',
      selectAll: 'Seleccionar Todo',
      deselectAll: 'Deseleccionar Todo',
      bulkActions: 'Acciones en Lote',
      categorize: 'Categorizar',
      exportSelected: 'Exportar Seleccionados',
      loadingMore: 'Cargando más transacciones...',
      viewDetails: 'Ver Detalles',
      dispute: 'Disputar Transacción'
    },
    fr: {
      transactionHistory: 'Historique des transactions',
      export: 'Exporter',
      selectAll: 'Tout sélectionner',
      deselectAll: 'Tout désélectionner',
      bulkActions: 'Actions en lot',
      categorize: 'Catégoriser',
      exportSelected: 'Exporter la sélection',
      loadingMore: 'Chargement de plus de transactions...',
      viewDetails: 'Voir les détails',
      dispute: 'Contester la transaction'
    }
  };

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'TXN001',
      merchant: 'Amazon',
      merchantLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center',
      description: 'Online Purchase',
      amount: -89.99,
      date: new Date('2024-01-15T14:30:00'),
      status: 'completed',
      category: 'Shopping',
      account: 'Main Account',
      type: 'payment',
      paymentMethod: 'card',
      reference: 'REF001',
      balanceAfter: 12360.76,
      hasReceipt: true,
      notes: 'Electronics purchase'
    },
    {
      id: 'TXN002',
      merchant: 'Starbucks',
      merchantLogo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop&crop=center',
      description: 'Coffee & Pastries',
      amount: -12.45,
      date: new Date('2024-01-15T09:15:00'),
      status: 'completed',
      category: 'Food & Dining',
      account: 'Main Account',
      type: 'payment',
      paymentMethod: 'card',
      reference: 'REF002',
      balanceAfter: 12450.75,
      hasReceipt: true,
      notes: 'Morning coffee'
    },
    {
      id: 'TXN003',
      merchant: 'John Doe',
      description: 'Money Transfer',
      amount: -250.00,
      date: new Date('2024-01-14T16:45:00'),
      status: 'completed',
      category: 'Transfer',
      account: 'Main Account',
      type: 'transfer',
      paymentMethod: 'wallet',
      reference: 'REF003',
      balanceAfter: 12463.20,
      hasReceipt: false,
      notes: 'Dinner split payment'
    },
    {
      id: 'TXN004',
      merchant: 'Salary Deposit',
      description: 'Monthly Salary',
      amount: 3500.00,
      date: new Date('2024-01-01T00:00:00'),
      status: 'completed',
      category: 'Income',
      account: 'Main Account',
      type: 'deposit',
      paymentMethod: 'bank',
      reference: 'REF004',
      balanceAfter: 12713.20,
      hasReceipt: true,
      notes: 'January salary'
    },
    {
      id: 'TXN005',
      merchant: 'Netflix',
      merchantLogo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop&crop=center',
      description: 'Monthly Subscription',
      amount: -15.99,
      date: new Date('2024-01-13T12:00:00'),
      status: 'completed',
      category: 'Entertainment',
      account: 'Main Account',
      type: 'payment',
      paymentMethod: 'card',
      reference: 'REF005',
      balanceAfter: 9213.20,
      hasReceipt: true,
      notes: 'Streaming service'
    },
    {
      id: 'TXN006',
      merchant: 'Uber',
      merchantLogo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center',
      description: 'Ride to Airport',
      amount: -45.30,
      date: new Date('2024-01-12T07:30:00'),
      status: 'pending',
      category: 'Transportation',
      account: 'Main Account',
      type: 'payment',
      paymentMethod: 'card',
      reference: 'REF006',
      balanceAfter: 9229.19,
      hasReceipt: true,
      notes: 'Airport transfer'
    },
    {
      id: 'TXN007',
      merchant: 'Walmart',
      merchantLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center',
      description: 'Grocery Shopping',
      amount: -127.85,
      date: new Date('2024-01-11T18:20:00'),
      status: 'completed',
      category: 'Groceries',
      account: 'Main Account',
      type: 'payment',
      paymentMethod: 'card',
      reference: 'REF007',
      balanceAfter: 9274.49,
      hasReceipt: true,
      notes: 'Weekly groceries'
    },
    {
      id: 'TXN008',
      merchant: 'Gas Station',
      description: 'Fuel Purchase',
      amount: -65.20,
      date: new Date('2024-01-10T14:15:00'),
      status: 'failed',
      category: 'Gas & Fuel',
      account: 'Main Account',
      type: 'payment',
      paymentMethod: 'card',
      reference: 'REF008',
      balanceAfter: 9402.34,
      hasReceipt: false,
      notes: 'Card declined'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate loading transactions
    const loadTransactions = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setIsLoading(false);
    };

    loadTransactions();
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchValue(value);
    
    if (value.trim() === '') {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter(transaction =>
      transaction.merchant.toLowerCase().includes(value.toLowerCase()) ||
      transaction.description.toLowerCase().includes(value.toLowerCase()) ||
      transaction.category.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredTransactions(filtered);

    // Add to recent searches if not empty and not already present
    if (value.trim() && !recentSearches.includes(value)) {
      setRecentSearches(prev => [value, ...prev.slice(0, 4)]);
    }
  }, [transactions, recentSearches]);

  const handleApplyFilters = (filters) => {
    let filtered = [...transactions];
    const appliedFilters = [];

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
      appliedFilters.push({
        type: 'dateRange',
        startDate: filters.dateRange.start,
        endDate: filters.dateRange.end
      });
    }

    // Amount range filter
    if (filters.amountRange.min || filters.amountRange.max) {
      const min = parseFloat(filters.amountRange.min) || 0;
      const max = parseFloat(filters.amountRange.max) || Infinity;
      filtered = filtered.filter(transaction => {
        const amount = Math.abs(transaction.amount);
        return amount >= min && amount <= max;
      });
      appliedFilters.push({
        type: 'amount',
        min: filters.amountRange.min || '0',
        max: filters.amountRange.max || '∞'
      });
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(transaction =>
        filters.categories.includes(transaction.category)
      );
      filters.categories.forEach(category => {
        appliedFilters.push({ type: 'category', value: category });
      });
    }

    // Status filter
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(transaction =>
        filters.statuses.includes(transaction.status)
      );
      filters.statuses.forEach(status => {
        appliedFilters.push({ type: 'status', value: status });
      });
    }

    // Account filter
    if (filters.accounts.length > 0) {
      filtered = filtered.filter(transaction =>
        filters.accounts.includes(transaction.account)
      );
      filters.accounts.forEach(account => {
        appliedFilters.push({ type: 'account', value: account });
      });
    }

    // Type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(transaction =>
        filters.types.includes(transaction.type)
      );
      filters.types.forEach(type => {
        appliedFilters.push({ type: 'type', value: type });
      });
    }

    setFilteredTransactions(filtered);
    setActiveFilters(appliedFilters);
  };

  const handleRemoveFilter = (filterToRemove) => {
    const newFilters = activeFilters.filter(filter => 
      !(filter.type === filterToRemove.type && filter.value === filterToRemove.value)
    );
    setActiveFilters(newFilters);
    
    // Reapply remaining filters
    if (newFilters.length === 0) {
      setFilteredTransactions(transactions);
    }
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setFilteredTransactions(transactions);
    setSearchValue('');
  };

  const handleViewDetails = (transaction) => {
    console.log('View transaction details:', transaction);
    // Navigate to transaction details or open modal
  };

  const handleDispute = (transaction) => {
    console.log('Dispute transaction:', transaction);
    // Navigate to dispute flow
  };

  const handleStartTransfer = () => {
    navigate('/money-transfer');
  };

  const handleExport = () => {
    console.log('Export transactions');
    // Implement export functionality
  };

  const groupTransactionsByMonth = (transactions) => {
    const grouped = {};
    
    transactions.forEach(transaction => {
      const monthKey = new Date(transaction.date).toISOString().slice(0, 7); // YYYY-MM
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          date: transaction.date,
          transactions: [],
          totalAmount: 0,
          count: 0
        };
      }
      grouped[monthKey].transactions.push(transaction);
      grouped[monthKey].totalAmount += transaction.amount;
      grouped[monthKey].count += 1;
    });

    return Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const groupedTransactions = groupTransactionsByMonth(filteredTransactions);
  const hasFilters = activeFilters.length > 0 || searchValue.trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      <HeaderContext />
      
      <main className="pb-20 pt-4">
        <div className="px-4 space-y-4">
          {/* Search and Filter */}
          <SearchBar
            onSearch={handleSearch}
            onFilterToggle={() => setIsFilterPanelOpen(true)}
            currentLanguage={currentLanguage}
            searchValue={searchValue}
            recentSearches={recentSearches}
          />

          {/* Filter Chips */}
          <FilterChips
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
            currentLanguage={currentLanguage}
          />

          {/* Export Button */}
          {filteredTransactions.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
              >
                {translations[currentLanguage].export}
              </Button>
            </div>
          )}

          {/* Transaction List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, index) => (
                <TransactionSkeleton key={index} />
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <EmptyState
              hasFilters={hasFilters}
              onClearFilters={handleClearAllFilters}
              onStartTransfer={handleStartTransfer}
              currentLanguage={currentLanguage}
            />
          ) : (
            <div className="space-y-6">
              {groupedTransactions.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <MonthlyGroupHeader
                    date={group.date}
                    totalAmount={group.totalAmount}
                    transactionCount={group.count}
                    currentLanguage={currentLanguage}
                  />
                  <div className="space-y-3">
                    {group.transactions.map((transaction) => (
                      <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onViewDetails={handleViewDetails}
                        onDispute={handleDispute}
                        currentLanguage={currentLanguage}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={{
          dateRange: { start: '', end: '' },
          amountRange: { min: '', max: '' },
          categories: [],
          statuses: [],
          accounts: [],
          types: []
        }}
        currentLanguage={currentLanguage}
      />

      <BottomTabNavigation />
      <FloatingSupport />
    </div>
  );
};

export default TransactionHistory;