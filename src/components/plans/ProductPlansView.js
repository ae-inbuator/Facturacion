import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, X, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';
import { BillingToggle } from './BillingToggle';
import PlanCard from './PlanCard';
import PlanComparisonTable from './PlanComparisonTable';
import PlanFAQ from './PlanFAQ';
import { plansService } from '../../services/plansService';

const ProductPlansView = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulación de plan actual del usuario
  const currentUserPlan = productId === 't1tienda' ? 'intermediate' : null;

  // Estilos reutilizables
  const billingContainerStyle = {
    marginLeft: '240px',
    padding: '32px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh'
  };

  const planBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#dcfce7',
    color: '#166534'
  };

  useEffect(() => {
    const loadProductData = () => {
      try {
        setLoading(true);
        console.log('Loading data for product:', productId);
        
        const productData = plansService.getProductById(productId);
        const plansData = plansService.getPlansForProduct(productId);
        
        console.log('Product data:', productData);
        console.log('Plans data:', plansData);
        
        if (!productData) {
          console.error('Product not found:', productId);
          // No ejecutar onBack() inmediatamente, mostrar error
          setProduct(null);
          setPlans([]);
        } else {
          setProduct(productData);
          setPlans(plansData || []);
        }
      } catch (error) {
        console.error('Error loading product data:', error);
        setProduct(null);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProductData();
    } else {
      console.error('No productId provided');
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <div style={{
          marginLeft: '240px',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '2px solid #fecaca',
              borderTopColor: '#ef4444',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 0.8s linear infinite'
            }}></div>
            <p style={{ color: '#6b7280' }}>Cargando planes...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product || !plans || plans.length === 0) {
    return (
      <div style={billingContainerStyle}>
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <h2 style={{ color: '#111827', marginBottom: '16px' }}>No se pudo cargar la información del producto</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>Por favor, intenta nuevamente</p>
          <button
            onClick={onBack}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Volver a planes
          </button>
        </div>
      </div>
    );
  }

  const getProductIcon = () => {
    switch (productId) {
      case 't1tienda':
        return '🛍️';
      case 't1envios':
        return '📦';
      case 't1pos':
        return '💳';
      default:
        return '📦';
    }
  };

  const handlePlanSelect = (planId) => {
    console.log('Plan seleccionado:', planId);
    // Aquí iría la lógica para cambiar de plan
  };

  return (
    <div style={billingContainerStyle}>
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: '24px' }}>
        <button 
          onClick={onBack}
          className="breadcrumb-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            fontSize: '14px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ChevronLeft size={16} />
          <span>Planes</span>
        </button>
        <span style={{ margin: '0 8px', color: '#d1d5db' }}>/</span>
        <span style={{ color: '#111827', fontSize: '14px' }}>{product.name}</span>
      </div>

      {/* Header del Producto */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontSize: '32px' }}>{getProductIcon()}</span>
          <h1 style={{ fontSize: '30px', fontWeight: '600', color: '#111827', margin: 0 }}>Planes de {product.name}</h1>
          {currentUserPlan && (
            <span style={planBadgeStyle}>
              Plan {plans.find(p => p.id === currentUserPlan)?.name || 'Activo'}
            </span>
          )}
        </div>
        <p style={{ color: '#6b7280', fontSize: '18px', maxWidth: '800px' }}>
          {product.description}
        </p>
      </div>

      {/* Toggle de Facturación */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '48px',
        background: '#f9fafb',
        padding: '24px',
        borderRadius: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <BillingToggle 
            value={billingCycle} 
            onChange={setBillingCycle} 
          />
          {billingCycle === 'annual' && (
            <p style={{ 
              marginTop: '12px', 
              color: '#059669', 
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <Sparkles size={16} />
              Ahorra hasta 2 meses al pagar anualmente
            </p>
          )}
        </div>
      </div>

      {/* Grid de Planes */}
      <div className="plans-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            isCurrentPlan={plan.id === currentUserPlan}
            onSelect={handlePlanSelect}
            productIcon={getProductIcon()}
          />
        ))}
      </div>

      {/* Botón de Comparación */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <button
          onClick={() => setShowComparison(!showComparison)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: 'transparent',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            color: '#111827',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          {showComparison ? 'Ocultar' : 'Ver'} comparación detallada
        </button>
      </div>

      {/* Tabla de Comparación */}
      {showComparison && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            marginBottom: '24px',
            textAlign: 'center' 
          }}>
            Comparación detallada de características
          </h2>
          <PlanComparisonTable 
            plans={plans} 
            productId={productId}
            currentPlanId={currentUserPlan}
          />
        </div>
      )}

      {/* FAQ */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          marginBottom: '24px' 
        }}>
          Preguntas frecuentes sobre {product.name}
        </h2>
        <PlanFAQ productId={productId} />
      </div>

      {/* Call to Action Final */}
      {!currentUserPlan && (
      <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>¿Necesitas ayuda para elegir?</h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Nuestro equipo está aquí para ayudarte a encontrar el plan perfecto para tu negocio
          </p>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            marginRight: '12px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            Contactar a ventas
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#111827',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
          >
            Ver guía de planes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPlansView;