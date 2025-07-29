import React from 'react';
import { ArrowRight, Check, TrendingUp } from 'lucide-react';

// Card individual para cada producto en el hub principal
export function ProductCard({ product, status, currentPlan, price, onViewPlans }) {
  const isActive = status === 'active';
  const isTrial = status === 'trial';
  
  const getStatusBadge = () => {
    if (isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Plan {currentPlan}
        </span>
      );
    }
    if (isTrial) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          En prueba
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        No contratado
      </span>
    );
  };

  const getProductStartingPrice = (productId) => {
    const startingPrices = {
      't1tienda': 399,
      't1envios': 0,
      't1pos': 0
    };
    return startingPrices[productId] || 0;
  };

  const getProductHighlights = (productId) => {
    const highlights = {
      't1tienda': [
        'Tienda online profesional',
        'Vende en marketplaces',
        'IA generativa incluida'
      ],
      't1envios': [
        'Las mejores tarifas',
        'Múltiples paqueterías',
        'Gestión de incidencias'
      ],
      't1pos': [
        'Punto de venta completo',
        'Multi-sucursal',
        'Sincronización en tiempo real'
      ]
    };
    return highlights[productId] || [];
  };

  const startingPrice = getProductStartingPrice(product.id);
  const highlights = getProductHighlights(product.id);

  return (
    <div 
      className="cursor-pointer"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: isActive ? '2px solid #bbf7d0' : '2px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '30px' }}>{product.icon}</div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>{product.name}</h3>
            <div style={{ marginTop: '4px' }}>
              {getStatusBadge()}
            </div>
          </div>
        </div>
        {isActive && (
          <TrendingUp className="text-green-500" size={20} />
        )}
      </div>

      {/* Description */}
      <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
        {product.description}
      </p>

      {/* Price Display */}
      <div style={{ marginBottom: '16px' }}>
        {isActive ? (
          <div>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>
              ${price?.toLocaleString()}<span style={{ fontSize: '14px', color: '#6b7280' }}>/mes</span>
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Plan actual</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Desde</p>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {startingPrice === 0 ? 'GRATIS' : `$${startingPrice.toLocaleString()}`}
              {startingPrice > 0 && <span style={{ fontSize: '14px', color: '#6b7280' }}>/mes</span>}
            </p>
          </div>
        )}
      </div>

      {/* Highlights */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '24px' }}>
        {highlights.map((highlight, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Check size={16} className="text-green-500" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: '#4b5563' }}>{highlight}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onViewPlans}
        style={{
          width: '100%',
          padding: '10px 16px',
          borderRadius: '8px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: isActive ? '#111827' : '#ef4444',
          color: '#ffffff'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isActive ? '#1f2937' : '#dc2626';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isActive ? '#111827' : '#ef4444';
        }}
      >
        {isActive ? 'Cambiar plan' : 'Ver planes'}
        <ArrowRight size={16} />
      </button>

      {/* Trial/Free Info */}
      {!isActive && product.id === 't1tienda' && (
        <p style={{ fontSize: '12px', textAlign: 'center', color: '#6b7280', marginTop: '8px' }}>
          7 días de prueba gratis
        </p>
      )}
    </div>
  );
}