import React, { useState, useEffect } from 'react';
import { ArrowRight, Info, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { BundleCard } from './BundleCard';
import { EcosystemBenefits } from './EcosystemBenefits';
import { plansService, bundleCalculator } from '../../services';

// Vista principal del hub de planes - Muestra todos los productos del ecosistema T1
export function PlansHub({ onProductSelect }) {
  const [products, setProducts] = useState([]);
  const [userPlans, setUserPlans] = useState({});
  const [bundles, setBundles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar datos (simulado - en producción vendría del backend)
    const loadData = () => {
      setIsLoading(true);
      
      // Obtener productos disponibles
      const availableProducts = plansService.getProducts();
      setProducts(availableProducts);
      
      // Obtener planes actuales del usuario
      const currentUserPlans = {};
      let totalMonthly = 0;
      let activeProducts = 0;
      
      availableProducts.forEach(product => {
        const userPlan = plansService.getUserPlan(product.id);
        if (userPlan) {
          currentUserPlans[product.id] = userPlan;
          totalMonthly += userPlan.price;
          activeProducts++;
        }
      });
      
      setUserPlans({
        ...currentUserPlans,
        totalMonthly,
        activeProducts,
        totalProducts: availableProducts.length
      });
      
      // Cargar bundles - Usar directamente los bundles sin calcular precios para evitar modificar la estructura
      setBundles(bundleCalculator.bundles.map(bundle => {
        const pricing = bundleCalculator.calculateBundlePrice(bundle.id, 'monthly');
        return {
          ...bundle,
          originalPrice: pricing.originalPrice,
          finalPrice: pricing.finalPrice
          // No sobrescribir products para mantener el formato original de strings
        };
      }));
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleViewPlans = (productId) => {
    // En el futuro esto navegará a /planes/[productId]
    console.log('Ver planes de:', productId);
    alert(`Ver planes de ${productId} - Esta funcionalidad estará disponible pronto`);
  };

  const handleViewCurrentSubscriptions = () => {
    // Navegar a la vista actual de suscripciones
    console.log('Ver suscripciones actuales');
    alert('Ver suscripciones actuales - Esta funcionalidad estará disponible pronto');
  };

  const handleConfigureBundle = (bundleId) => {
    console.log('Configurar bundle:', bundleId);
    alert(`Configurar bundle ${bundleId} - Esta funcionalidad estará disponible pronto`);
  };

  if (isLoading) {
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

  const hasActiveSubscriptions = userPlans.activeProducts > 0;
  const bundleDiscount = hasActiveSubscriptions ? 200 : 0; // Ejemplo de descuento

  return (
    <div style={{
      marginLeft: '240px',
      padding: '32px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      {/* Header Principal */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Planes y Productos T1
          </h1>
          <Sparkles className="text-yellow-500" size={24} />
        </div>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Encuentra la solución perfecta para hacer crecer tu negocio
        </p>
      </div>

      {/* Resumen de cuenta (solo si tiene planes activos) */}
      {hasActiveSubscriptions && (
        <div style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          color: '#ffffff',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '4px' }}>
                Tu inversión mensual actual
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <p style={{ fontSize: '36px', fontWeight: '700', margin: 0 }}>
                  ${userPlans.totalMonthly.toLocaleString()}
                </p>
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>MXN/mes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%'
                  }}></div>
                  <span>{userPlans.activeProducts} de {userPlans.totalProducts} productos activos</span>
                </div>
                {bundleDiscount > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} className="text-green-400" />
                    <span style={{ color: '#10b981' }}>
                      Ahorrando ${bundleDiscount}/mes con bundles
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleViewCurrentSubscriptions}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Ver mis suscripciones actuales
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Grid de Productos */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
          Productos disponibles
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {products.map((product) => {
            const userPlan = userPlans[product.id];
            const planDisplay = userPlan 
              ? {
                  status: 'active',
                  planName: userPlan.plan,
                  price: userPlan.price
                }
              : {
                  status: 'not_contracted',
                  planName: null,
                  price: null
                };

            return (
              <ProductCard
                key={product.id}
                product={product}
                status={planDisplay.status}
                currentPlan={planDisplay.planName}
                price={planDisplay.price}
                onViewPlans={() => onProductSelect(product.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Bundles Recomendados */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0 }}>
              Bundles recomendados
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
              Ahorra más al combinar servicios
            </p>
          </div>
          <button style={{
            fontSize: '14px',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            Ver todos los bundles
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {bundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onSelect={() => handleConfigureBundle(bundle.id)}
            />
          ))}
        </div>
      </div>

      {/* Beneficios del Ecosistema */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
          ¿Por qué elegir el ecosistema T1?
        </h2>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <EcosystemBenefits />
        </div>
      </div>

      {/* Call to Action Final */}
      {!hasActiveSubscriptions && (
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '12px'
          }}>
            Comienza tu prueba gratuita hoy
          </h3>
          <p style={{
            color: '#4b5563',
            marginBottom: '24px',
            maxWidth: '672px',
            margin: '0 auto 24px'
          }}>
            Únete a miles de emprendedores que están haciendo crecer sus negocios con T1. 
            Sin compromisos, cancela cuando quieras.
          </p>
          <button 
            onClick={() => alert('Comenzar prueba - Esta funcionalidad estará disponible pronto')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }}
          >
            Comenzar prueba de 7 días
          </button>
        </div>
      )}

      {/* Info Box */}
      <div style={{
        marginTop: '32px',
        backgroundColor: '#eff6ff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Info className="text-blue-600" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Información importante sobre los planes
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              color: '#374151',
              fontSize: '14px',
              lineHeight: '1.75'
            }}>
              <li>• Todos los precios son más IVA (16%)</li>
              <li>• Puedes cambiar de plan en cualquier momento con prorrateo automático</li>
              <li>• Los planes anuales incluyen 2 meses gratis (16.7% de descuento)</li>
              <li>• Los usuarios son globales: con cualquier plan pagado, usuarios ilimitados en TODO el ecosistema</li>
              <li>• Facturación consolidada: una sola factura mensual para todos tus servicios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}