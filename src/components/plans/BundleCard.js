import React from 'react';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';

// Card para mostrar bundles recomendados
export function BundleCard({ bundle, onSelect }) {
  const { 
    name, 
    description, 
    products, 
    originalPrice, 
    finalPrice, 
    discount,
    featured 
  } = bundle;

  // Mapeo de productos a información visual
  const productInfo = {
    't1tienda:basico': { icon: '🛍️', name: 'T1tienda Básico' },
    't1tienda:intermedio': { icon: '🛍️', name: 'T1tienda Intermedio' },
    't1tienda:avanzado': { icon: '🛍️', name: 'T1tienda Avanzado' },
    't1envios:starter': { icon: '📦', name: 'T1envíos Starter' },
    't1envios:professional': { icon: '📦', name: 'T1envíos Professional' },
    't1envios:business': { icon: '📦', name: 'T1envíos Business' },
    't1pos:advance': { icon: '💳', name: 'T1 POS Advance' }
  };

  const getProductsDisplay = () => {
    // Verificar si products es un array de objetos o de strings
    if (!Array.isArray(products)) return [];
    
    // Si products viene del bundle original (array de strings)
    if (products.length > 0 && typeof products[0] === 'string') {
      return products.map(p => {
        const info = productInfo[p];
        return info ? { icon: info.icon, name: info.name.split(' ')[0] } : null;
      }).filter(Boolean);
    }
    
    // Si products viene del bundleCalculator (array de objetos)
    if (products.length > 0 && typeof products[0] === 'object') {
      return products.map(p => {
        const key = `${p.productId}:${p.planId}`;
        const info = productInfo[key];
        return info ? { icon: info.icon, name: info.name.split(' ')[0] } : null;
      }).filter(Boolean);
    }
    
    return [];
  };

  const productsDisplay = getProductsDisplay();
  const savingsPercentage = originalPrice > 0 ? Math.round((discount / originalPrice) * 100) : 0;

  const baseCardStyle = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: featured ? '' : '#ffffff',
    background: featured ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : '',
    border: featured ? 'none' : '2px solid #e5e7eb',
    boxShadow: featured 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  };

  return (
    <div 
      style={baseCardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        if (featured) {
          e.currentTarget.style.transform = 'scale(1.02)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = featured 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        if (featured) {
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <div style={{
            backgroundColor: '#fde047',
            color: '#111827',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <Sparkles size={12} />
            Más popular
          </div>
        </div>
      )}

      <div style={{ padding: '24px' }}>
        {/* Header */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '8px',
          color: featured ? '#ffffff' : '#111827'
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: '14px',
          marginBottom: '16px',
          color: featured ? '#fecaca' : '#4b5563'
        }}>
          {description}
        </p>

        {/* Products Included */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          {productsDisplay.map((product, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '24px' }}>{product.icon}</span>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: featured ? '#ffffff' : '#374151'
              }}>
                {product.name}
              </span>
              {index < productsDisplay.length - 1 && (
                <span style={{
                  margin: '0 4px',
                  color: featured ? '#fecaca' : '#9ca3af'
                }}>+</span>
              )}
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div style={{ marginBottom: '24px' }}>
          {discount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontSize: '18px',
                textDecoration: 'line-through',
                color: featured ? '#fecaca' : '#9ca3af'
              }}>
                ${originalPrice.toLocaleString()}
              </span>
              {savingsPercentage > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: featured ? 'rgba(255, 255, 255, 0.2)' : '#d1fae5',
                  color: featured ? '#ffffff' : '#047857'
                }}>
                  <Tag size={12} />
                  Ahorra {savingsPercentage}%
                </div>
              )}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{
              fontSize: '30px',
              fontWeight: '700',
              color: featured ? '#ffffff' : '#111827'
            }}>
              ${finalPrice.toLocaleString()}
            </span>
            <span style={{
              fontSize: '14px',
              color: featured ? '#fecaca' : '#6b7280'
            }}>/mes</span>
          </div>
          {discount > 0 && (
            <p style={{
              fontSize: '14px',
              marginTop: '4px',
              color: featured ? '#fecaca' : '#059669'
            }}>
              Ahorras ${discount.toLocaleString()} al mes
            </p>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={onSelect}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: featured ? '#ffffff' : '#ef4444',
            color: featured ? '#dc2626' : '#ffffff'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = featured ? '#f3f4f6' : '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = featured ? '#ffffff' : '#ef4444';
          }}
        >
          Configurar bundle
          <ArrowRight size={16} />
        </button>

        {/* Additional Benefits */}
        {featured && (
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#fecaca',
              textAlign: 'center'
            }}>
              Incluye soporte prioritario y onboarding personalizado
            </p>
          </div>
        )}
      </div>
    </div>
  );
}