import React from 'react';
import { Check, TrendingUp, Zap, Crown } from 'lucide-react';

const PlanCard = ({ plan, billingCycle, isCurrentPlan, onSelect, productIcon }) => {
  const price = billingCycle === 'monthly' ? plan.price : plan.annualPrice;
  const isPopular = plan.badge === 'popular';
  const isEnterprise = plan.id === 'enterprise';

  const getPlanIcon = () => {
    switch (plan.id) {
      case 'free':
      case 'starter':
        return '🎯';
      case 'basic':
      case 'professional':
        return '🚀';
      case 'intermediate':
      case 'business':
        return '⚡';
      case 'advanced':
      case 'corporate':
        return '👑';
      case 'enterprise':
        return '🏢';
      default:
        return productIcon;
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan) return 'Plan actual';
    if (isEnterprise) return 'Contactar ventas';
    if (plan.trial) return 'Comenzar prueba gratuita';
    return 'Seleccionar plan';
  };

  const getButtonStyle = () => {
    const baseStyle = {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: isCurrentPlan ? 'default' : 'pointer',
      transition: 'all 0.2s ease',
      border: 'none'
    };

    if (isCurrentPlan) {
      return {
        ...baseStyle,
        backgroundColor: '#e5e7eb',
        color: '#6b7280',
        cursor: 'not-allowed'
      };
    }
    
    if (isPopular || plan.recommended) {
      return {
        ...baseStyle,
        backgroundColor: '#ef4444',
        color: '#ffffff'
      };
    }
    
    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      color: '#111827',
      border: '2px solid #e5e7eb'
    };
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    border: isCurrentPlan ? '2px solid #10b981' : isPopular ? '2px solid #3b82f6' : '2px solid #e5e7eb',
    boxShadow: isPopular ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    position: 'relative',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const badgeCornerStyle = {
    position: 'absolute',
    top: '-1px',
    right: '-1px',
    backgroundColor: isCurrentPlan ? '#059669' : '#3b82f6',
    color: '#ffffff',
    padding: '4px 16px',
    borderRadius: '0 12px 0 12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  return (
    <div style={cardStyle}>
      {/* Badge */}
      {(isPopular || isCurrentPlan) && (
        <div style={badgeCornerStyle}>
          {isCurrentPlan ? <Check size={14} /> : <TrendingUp size={14} />}
          <span>{isCurrentPlan ? 'Tu plan actual' : 'Más popular'}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{getPlanIcon()}</div>
        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
          {plan.name}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          {plan.description}
        </p>
      </div>

      {/* Precio */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        {!isEnterprise ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
              <span style={{ fontSize: '36px', fontWeight: '700' }}>
                ${price.toLocaleString('es-MX')}
              </span>
              <span style={{ color: '#6b7280', fontSize: '16px' }}>
                MXN/{billingCycle === 'monthly' ? 'mes' : 'año'}
              </span>
            </div>
            {billingCycle === 'annual' && plan.monthlySavings && (
              <p style={{ 
                color: '#059669', 
                fontSize: '14px', 
                marginTop: '8px',
                fontWeight: '500' 
              }}>
                Ahorras ${plan.monthlySavings.toLocaleString('es-MX')} al año
              </p>
            )}
          </>
        ) : (
          <p style={{ fontSize: '24px', fontWeight: '600', color: '#4b5563' }}>
            Precio personalizado
          </p>
        )}
      </div>

      {/* Características principales */}
      <div style={{ marginBottom: '32px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {plan.features.slice(0, 6).map((feature, index) => (
            <li key={index} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px',
              marginBottom: '12px' 
            }}>
              <Check size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '14px', color: '#374151' }}>{feature}</span>
            </li>
          ))}
        </ul>
        {plan.features.length > 6 && (
        <button 
        style={{ 
          marginTop: '12px', 
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        color: '#2563eb',
          background: 'none',
            border: 'none',
          cursor: 'pointer',
          padding: 0
          }}
          >
            Ver todas las características
            <Zap size={14} />
          </button>
        )}
      </div>

      {/* Botón CTA */}
      <button
        onClick={() => !isCurrentPlan && onSelect(plan.id)}
        disabled={isCurrentPlan}
        style={getButtonStyle()}
        onMouseEnter={(e) => {
          if (!isCurrentPlan) {
            if (isPopular || plan.recommended) {
              e.currentTarget.style.backgroundColor = '#dc2626';
            } else {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!isCurrentPlan) {
            if (isPopular || plan.recommended) {
              e.currentTarget.style.backgroundColor = '#ef4444';
            } else {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }
          }
        }}
      >
        {getButtonText()}
      </button>

      {/* Información adicional */}
      {plan.trial && !isCurrentPlan && (
        <p style={{ 
          textAlign: 'center', 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#6b7280' 
        }}>
          {plan.trial} días de prueba gratis • Sin tarjeta de crédito
        </p>
      )}
    </div>
  );
};

export default PlanCard;