// Lógica de comparación de planes
export const planComparison = {
  // Obtener características para comparar planes de un producto
  getComparisonFeatures: (productId) => {
    const features = {
      t1tienda: [
        { key: 'products', label: 'Productos', type: 'number' },
        { key: 'online_store', label: 'Tienda online', type: 'boolean' },
        { key: 'marketplaces', label: 'Marketplaces', type: 'number' },
        { key: 'users', label: 'Usuarios', type: 'number' },
        { key: 'branches', label: 'Sucursales', type: 'number' },
        { key: 'ai_generation', label: 'Generaciones IA/mes', type: 'number' },
        { key: 'reports', label: 'Reportes', type: 'text' },
        { key: 'support', label: 'Soporte', type: 'text' },
        { key: 'api_limit', label: 'API calls/min', type: 'number' }
      ],
      t1envios: [
        { key: 'monthly_guides', label: 'Guías mensuales', type: 'number' },
        { key: 'shipping_rates', label: 'Tarifas', type: 'text' },
        { key: 'tracking', label: 'Rastreo', type: 'text' },
        { key: 'insurance', label: 'Seguro', type: 'text' },
        { key: 'incidents', label: 'Gestión incidencias', type: 'text' },
        { key: 'api_access', label: 'API', type: 'boolean' },
        { key: 'notifications', label: 'Notificaciones/mes', type: 'number' },
        { key: 'orchestrator', label: 'Orquestador', type: 'boolean' },
        { key: 'support', label: 'Soporte', type: 'text' }
      ],
      t1pos: [
        { key: 'branches', label: 'Sucursales', type: 'number' },
        { key: 'users', label: 'Usuarios', type: 'text' },
        { key: 'devices', label: 'Dispositivos', type: 'text' },
        { key: 'offline_mode', label: 'Modo offline', type: 'boolean' },
        { key: 'customer_screen', label: 'Pantalla cliente', type: 'boolean' },
        { key: 'ai_features', label: 'IA predictiva', type: 'boolean' },
        { key: 'loyalty_program', label: 'Programa lealtad', type: 'text' },
        { key: 'reports', label: 'Reportes', type: 'text' },
        { key: 'integrations', label: 'Integraciones', type: 'text' }
      ]
    };

    return features[productId] || [];
  },

  // Obtener valores de características por plan
  getPlanFeatures: (productId, planId) => {
    // En producción esto vendría del backend
    // Por ahora retornamos datos de ejemplo
    const planFeatures = {
      t1tienda: {
        free: {
          products: 'Ilimitados',
          online_store: false,
          marketplaces: 2,
          users: 1,
          branches: 1,
          ai_generation: 50,
          reports: 'Básicos (24h delay)',
          support: 'Chat + Email',
          api_limit: 10
        },
        basico: {
          products: 'Ilimitados',
          online_store: true,
          marketplaces: 4,
          users: 2,
          branches: 1,
          ai_generation: 500,
          reports: 'Tiempo real',
          support: 'Chat + Email',
          api_limit: 120
        },
        intermedio: {
          products: 'Ilimitados',
          online_store: true,
          marketplaces: 6,
          users: 5,
          branches: 3,
          ai_generation: 2000,
          reports: 'Avanzados',
          support: 'Chat + Email + Humano',
          api_limit: 120
        },
        avanzado: {
          products: 'Ilimitados',
          online_store: true,
          marketplaces: 8,
          users: 15,
          branches: 10,
          ai_generation: 10000,
          reports: 'Avanzados',
          support: 'Chat + Email + Humano',
          api_limit: 240
        },
        enterprise: {
          products: 'Ilimitados',
          online_store: true,
          marketplaces: 'Ilimitados',
          users: 'Ilimitados',
          branches: 200,
          ai_generation: 'Ilimitadas',
          reports: 'Personalizados',
          support: 'Prioritario',
          api_limit: 1200
        }
      }
      // Agregar más productos según se necesite
    };

    return planFeatures[productId]?.[planId] || {};
  }
};