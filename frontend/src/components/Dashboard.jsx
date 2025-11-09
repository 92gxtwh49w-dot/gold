import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PriceCard from '../components/PriceCard';
import { retailerAPI } from '../services/api';

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch all rates
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['allRates'],
    queryFn: retailerAPI.getAllRates,
    refetchInterval: 30 * 60 * 1000, // Auto-refresh every 30 minutes
  });

  const handleRefresh = () => {
    refetch();
    setLastUpdated(new Date());
  };

  // Calculate statistics
  const getLowestPrice = () => {
    if (!data) return null;
    const prices = [
      data.grt?.pricePerGram,
      data.bhima?.pricePerGram,
      data.lalitha?.pricePerGram,
    ].filter(Boolean);
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  const getHighestPrice = () => {
    if (!data) return null;
    const prices = [
      data.grt?.pricePerGram,
      data.bhima?.pricePerGram,
      data.lalitha?.pricePerGram,
    ].filter(Boolean);
    return prices.length > 0 ? Math.max(...prices) : null;
  };

  const lowestPrice = getLowestPrice();
  const highestPrice = getHighestPrice();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Live Gold Rates
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Compare prices across premium jewellers in real-time
            </p>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="btn-premium inline-flex items-center space-x-2"
            >
              <svg
                className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{isLoading ? 'Refreshing...' : 'Refresh Rates'}</span>
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
            </p>
          </div>

          {/* Stats Cards */}
          {!isLoading && lowestPrice && highestPrice && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="glass rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Lowest Rate Today</p>
                    <p className="text-3xl font-bold text-green-400">
                      ₹{lowestPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Highest Rate Today</p>
                    <p className="text-3xl font-bold text-red-400">
                      ₹{highestPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PriceCard retailer={data?.grt} loading={isLoading} />
            <PriceCard retailer={data?.bhima} loading={isLoading} />
            <PriceCard retailer={data?.lalitha} loading={isLoading} />
          </div>

          {/* Error State */}
          {isError && (
            <div className="glass rounded-xl p-8 text-center border border-red-500/20 mt-6">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Failed to Load Rates</h3>
              <p className="text-gray-400 mb-4">Please check your backend connection and try again.</p>
              <button onClick={handleRefresh} className="btn-premium">
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
