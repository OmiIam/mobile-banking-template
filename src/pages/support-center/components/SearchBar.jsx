import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, currentLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "How to transfer money",
    "Reset password",
    "Account locked"
  ]);

  const translations = {
    en: {
      searchPlaceholder: "Search for help...",
      recentSearches: "Recent Searches",
      suggestedQueries: "Suggested Queries",
      clearAll: "Clear All"
    },
    es: {
      searchPlaceholder: "Buscar ayuda...",
      recentSearches: "Búsquedas Recientes",
      suggestedQueries: "Consultas Sugeridas",
      clearAll: "Limpiar Todo"
    },
    fr: {
      searchPlaceholder: "Rechercher de l\'aide...",
      recentSearches: "Recherches Récentes",
      suggestedQueries: "Requêtes Suggérées",
      clearAll: "Tout Effacer"
    }
  };

  const suggestedQueries = [
    "How to transfer money internationally",
    "What are the transaction limits",
    "How to enable two-factor authentication",
    "How to dispute a transaction",
    "How to update my profile information"
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (query = searchQuery) => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearchSubmit(suggestion);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          color="var(--color-text-secondary)"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
        />
        <Input
          type="search"
          placeholder={translations[currentLanguage].searchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
          className="pl-10 pr-4 py-3 text-base"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors duration-200"
          >
            <Icon name="X" size={16} color="var(--color-text-secondary)" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevation-3 z-50 max-h-80 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-text-secondary">
                  {translations[currentLanguage].recentSearches}
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  {translations[currentLanguage].clearAll}
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
                  >
                    <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm text-text-primary">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Queries */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-text-secondary mb-3">
              {translations[currentLanguage].suggestedQueries}
            </h4>
            <div className="space-y-1">
              {suggestedQueries
                .filter(query => query.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(0, 5)
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
                  >
                    <Icon name="Search" size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm text-text-primary">{suggestion}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;