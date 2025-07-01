import React from 'react';

const TransactionSkeleton = () => {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 animate-pulse">
      <div className="flex items-center space-x-3">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
        
        {/* Content Skeleton */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted rounded w-32"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-muted rounded w-24"></div>
            <div className="flex items-center space-x-2">
              <div className="h-3 bg-muted rounded w-16"></div>
              <div className="h-3 bg-muted rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSkeleton;