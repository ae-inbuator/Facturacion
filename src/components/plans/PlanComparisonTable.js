import React from 'react';
import { Check, X } from 'lucide-react';

const PlanComparisonTable = ({ plans, productId, currentPlanId }) => {
  // Definir características según el producto
  const getFeaturesByProduct = () => {
    switch (productId) {
      case 't1tienda':
        return [
          { key: 'online_store', label: 'Tienda Online', category: 'Básico' },
          { key: 'products', label: 'Productos', category: 'Básico' },
          { key: 'marketplaces', label: 'Marketplaces', category: 'Canales' },
          { key: 'users', label: 'Usuarios Staff', category: 'Colaboración' },
          { key: 'branches', label: 'Sucursales', category: 'Ubicaciones' },
          { key: 'ai_monthly', label: 'Generaciones IA/mes', category: 'IA' },
          { key: 'templates', label: 'Plantillas', category: 'Diseño' },
          { key: 'cart_recovery', label: 'Carrito Abandonado', category: 'Marketing' },
          { key: 'discounts', label: 'Módulo Descuentos', category: 'Marketing' },
          { key: 'reports', label: 'Reportes', category: 'Analytics' },
          { key: 'api_limit', label: 'API Rate Limit', category: 'Técnico' },
          { key: 'support', label: 'Soporte', category: 'Servicio' }
        ];
      case 't1envios':
        return [
          { key: 'monthly_shipments', label: 'Envíos recomendados', category: 'Básico' },
          { key: 'quoter', label: 'Cotizador', category: 'Herramientas' },
          { key: 'tracking', label: 'Rastreo de Guías', category: 'Herramientas' },
          { key: 'insurance', label: 'Seguro de Guías', category: 'Protección' },
          { key: 'bulk_quotes', label: 'Cotización Masiva', category: 'Herramientas' },
          { key: 'incidents', label: 'Gestión Incidencias', category: 'Servicio' },
          { key: 'reports', label: 'Reportes', category: 'Analytics' },
          { key: 'hub_access', label: 'Hub Logístico', category: 'Avanzado' },
          { key: 'rules', label: 'Reglas de Orquestación', category: 'Avanzado' },
          { key: 'notifications', label: 'Notificaciones/mes', category: 'Comunicación' },
          { key: 'api', label: 'API T1envíos', category: 'Técnico' },
          { key: 'support', label: 'Soporte', category: 'Servicio' }
        ];
      case 't1pos':
        return [
          { key: 'branches', label: 'Sucursales', category: 'Básico' },
          { key: 'users', label: 'Usuarios', category: 'Básico' },
          { key: 'devices', label: 'Dispositivos/Sucursal', category: 'Hardware' },
          { key: 'pos_type', label: 'Tipo de POS', category: 'Sistema' },
          { key: 'online_store', label: 'Tienda Online', category: 'Omnicanal' },
          { key: 'reports', label: 'Reportes Detallados', category: 'Analytics' },
          { key: 'offline', label: 'Modo Offline', category: 'Avanzado' },
          { key: 'ai_forecasting', label: 'Pronóstico IA', category: 'Avanzado' },
          { key: 'loyalty', label: 'Programa Lealtad', category: 'Marketing' },
          { key: 'commissions', label: 'Comisiones Avanzadas', category: 'Personal' }
        ];
      default:
        return [];
    }
  };

  const features = getFeaturesByProduct();
  const categories = [...new Set(features.map(f => f.category))];

  const getFeatureValue = (plan, featureKey) => {
    // Esta función devolvería el valor real de cada característica
    // Por ahora usamos valores de ejemplo
    const values = {
      't1tienda': {
        free: {
          online_store: false,
          products: 'Ilimitados',
          marketplaces: 'Sears + Sanborns',
          users: '1',
          branches: '1',
          ai_monthly: '50',
          templates: '0',
          cart_recovery: false,
          discounts: false,
          reports: 'Básicos (24h delay)',
          api_limit: '10/min',
          support: 'Chat + Email'
        },
        basic: {
          online_store: true,
          products: 'Ilimitados',
          marketplaces: 'Sears + Sanborns + 2',
          users: '2',
          branches: '1',
          ai_monthly: '500',
          templates: '1',
          cart_recovery: 'Ilimitado',
          discounts: true,
          reports: 'Tiempo real',
          api_limit: '120/min',
          support: 'Chat + Email'
        },
        intermediate: {
          online_store: true,
          products: 'Ilimitados',
          marketplaces: 'Sears + Sanborns + 4',
          users: '5',
          branches: '3',
          ai_monthly: '2,000',
          templates: '5',
          cart_recovery: 'Ilimitado',
          discounts: true,
          reports: 'Avanzados',
          api_limit: '120/min',
          support: 'Chat + Email + Humano'
        },
        advanced: {
          online_store: true,
          products: 'Ilimitados',
          marketplaces: 'Sears + Sanborns + 6',
          users: '15',
          branches: '10',
          ai_monthly: '10,000',
          templates: '20',
          cart_recovery: 'Ilimitado',
          discounts: true,
          reports: 'Avanzados',
          api_limit: '240/min',
          support: 'Chat + Email + Humano'
        }
      }
    };

    return values[productId]?.[plan.id]?.[featureKey] || '-';
  };

  const renderValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? <Check size={20} color="#10b981" /> : <X size={20} color="#ef4444" />;
    }
    return <span style={{ color: '#374151' }}>{value}</span>;
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827',
                borderBottom: '2px solid #e5e7eb',
                position: 'sticky',
                left: 0,
                backgroundColor: '#f9fafb',
                zIndex: 10
              }}>
                Característica
              </th>
              {plans.map(plan => (
                <th key={plan.id} style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  borderBottom: '2px solid #e5e7eb',
                  backgroundColor: plan.id === currentPlanId ? '#f0fdf4' : '#f9fafb'
                }}>
                  <div style={{ marginBottom: '4px' }}>{plan.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ${plan.price.toLocaleString()}/mes
                  </div>
                  {plan.id === currentPlanId && (
                    <div style={{
                      fontSize: '11px',
                      color: '#059669',
                      marginTop: '4px',
                      fontWeight: '500'
                    }}>
                      Plan actual
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, catIndex) => (
              <React.Fragment key={category}>
                <tr>
                  <td colSpan={plans.length + 1} style={{
                    padding: '12px 16px',
                    backgroundColor: '#f3f4f6',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#4b5563',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {category}
                  </td>
                </tr>
                {features
                  .filter(f => f.category === category)
                  .map((feature, index) => (
                    <tr key={feature.key} style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                    }}>
                      <td style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#374151',
                        borderBottom: '1px solid #e5e7eb',
                        position: 'sticky',
                        left: 0,
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                      }}>
                        {feature.label}
                      </td>
                      {plans.map(plan => (
                        <td key={`${plan.id}-${feature.key}`} style={{
                          padding: '12px 16px',
                          textAlign: 'center',
                          borderBottom: '1px solid #e5e7eb',
                          backgroundColor: plan.id === currentPlanId 
                            ? (index % 2 === 0 ? '#f0fdf4' : '#dcfce7')
                            : (index % 2 === 0 ? '#ffffff' : '#f9fafb')
                        }}>
                          {renderValue(getFeatureValue(plan, feature.key))}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanComparisonTable;