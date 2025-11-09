import React from 'react';

const PriceCard = ({ retailer, loading }) => {
  if (loading) {
    return (
      <div className="glass rounded-xl p-6 shimmer">
        <div className="h-8 w-32 bg-white/10 rounded mb-4"></div>
        <div className="h-12 w-40 bg-white/10 rounded mb-2"></div>
        <div className="h-4 w-24 bg-white/10 rounded"></div>
      </div>
    );
  }

  if (!retailer) {
    return (
      <div className="glass rounded-xl p-6 border border-red-500/20">
        <p className="text-red-400">Failed to load data</p>
      </div>
    );
  }

  const { vendor, city, pricePerGram, purity, timestamp, note } = retailer;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="glass rounded-xl p-6 card-hover relative overflow-hidden group">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold"></div>

      {/* Vendor Name */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-display font-bold text-white">
          {vendor}
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-gold-500/20 text-gold-300 font-medium">
          {purity}
        </span>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">
          {formatPrice(pricePerGram)}
        </div>
        <p className="text-sm text-gray-400 mt-1">per gram</p>
      </div>

      {/* City & Time */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-300">{city}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs">{formatTime(timestamp)}</span>
        </div>
      </div>

      {/* Note if present */}
      {note && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-gold-400 italic">
            ℹ️ {note}
          </p>
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default PriceCard;
