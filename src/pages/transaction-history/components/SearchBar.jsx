import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onFilterToggle, currentLanguage, searchValue, recentSearches }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const translations = {
    en: {
      searchTransactions: 'Search transactions...',
      recentSearches: 'Recent Searches',
      suggestions: 'Suggestions',
      clearSearch: 'Clear search',
      filters: 'Filters'
    },
    es: {
      searchTransactions: 'Buscar transacciones...',
      recentSearches: 'Búsquedas Recientes',
      suggestions: 'Sugerencias',
      clearSearch: 'Limpiar búsqueda',
      filters: 'Filtros'
    },
    fr: {
      searchTransactions: 'Rechercher des transactions...',
      recentSearches: 'Recherches récentes',
      suggestions: 'Suggestions',
      clearSearch: 'Effacer la recherche',
      filters: 'Filtres'
    }
  };

  const searchSuggestions = [
    'Amazon',
    'Starbucks',
    'Netflix',
    'Uber',
    'McDonald\'s',
    'Apple Store',
    'Walmart',
    'Target'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(value.length === 0 || value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setShowSuggestions(false);
    setIsSearchFocused(false);
  };

  const handleClearSearch = () => {
    onSearch('');
    searchRef.current?.focus();
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon
              name="Search"
              size={18}
              color="var(--color-text-secondary)"
            />
          </div>
          <Input
            type="search"
            placeholder={translations[currentLanguage].searchTransactions}
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            className="pl-10 pr-10 bg-muted border-0 focus:bg-surface focus:border-border"
          />
          {searchValue && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-border-light rounded-full transition-colors duration-200"
              aria-label={translations[currentLanguage].clearSearch}
            >
              <Icon
                name="X"
                size={16}
                color="var(--color-text-secondary)"
              />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilterToggle}
          className="p-3 bg-muted hover:bg-border-light rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          aria-label={translations[currentLanguage].filters}
        >
          <Icon
            name="SlidersHorizontal"
            size={20}
            color="var(--color-text-primary)"
          />
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (isSearchFocused || searchValue) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-3 z-50 max-h-64 overflow-y-auto">
          {/* Recent Searches */}
          {searchValue === '' && recentSearches.length > 0 && (
            <div className="p-3 border-b border-border">
              <h4 className="text-sm font-medium text-text-secondary mb-2">
                {translations[currentLanguage].recentSearches}
              </h4>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full flex items-center space-x-2 p-2 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
                  >
                    <Icon
                      name="Clock"
                      size={14}
                      color="var(--color-text-secondary)"
                    />
                    <span className="text-sm text-text-primary">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {(searchValue === '' || filteredSuggestions.length > 0) && (
            <div className="p-3">
              <h4 className="text-sm font-medium text-text-secondary mb-2">
                {translations[currentLanguage].suggestions}
              </h4>
              <div className="space-y-1">
                {(searchValue === '' ? searchSuggestions : filteredSuggestions)
                  .slice(0, 5)
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
                    >
                      <Icon
                        name="Search"
                        size={14}
                        color="var(--color-text-secondary)"
                      />
                      <span className="text-sm text-text-primary">{suggestion}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;