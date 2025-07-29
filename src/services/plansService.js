// Servicio para manejar la lógica de planes y precios
export const plansService = {
  // Obtener todos los productos disponibles
  getProducts: () => {
    return [
      {
        id: 't1tienda',
        name: 'T1tienda',
        description: 'Crea tu tienda online y vende en marketplaces',
        icon: '🛍️',
        available: true
      },
      {
        id: 't1envios', 
        name: 'T1envíos',
        description: 'Gestiona tus envíos con las mejores tarifas',
        icon: '📦',
        available: true
      },
      {
        id: 't1pos',
        name: 'T1 POS',
        description: 'Sistema punto de venta para tu negocio físico',
        icon: '💳',
        available: true
      }
    ];
  },

  // Obtener planes de un producto específico
  getProductPlans: (productId) => {
    const plans = {
      t1tienda: [
        {
          id: 'free',
          name: 'Free',
          monthlyPrice: 0,
          annualPrice: 0,
          description: 'Perfecto para empezar',
          popular: false
        },
        {
          id: 'basico',
          name: 'Básico',
          monthlyPrice: 399,
          annualPrice: 4389,
          description: 'Para negocios en crecimiento',
          popular: false
        },
        {
          id: 'intermedio',
          name: 'Intermedio',
          monthlyPrice: 999,
          annualPrice: 10989,
          description: 'Escala tu negocio',
          popular: true
        },
        {
          id: 'avanzado',
          name: 'Avanzado',
          monthlyPrice: 2499,
          annualPrice: 27489,
          description: 'Máximo poder y control',
          popular: false
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          monthlyPrice: null,
          annualPrice: null,
          description: 'Soluciones a medida',
          popular: false
        }
      ],
      t1envios: [
        {
          id: 'starter',
          name: 'Starter',
          monthlyPrice: 0,
          annualPrice: 0,
          description: 'Hasta 100 envíos/mes'
        },
        {
          id: 'professional',
          name: 'Professional',
          monthlyPrice: 899,
          annualPrice: 9889,
          description: '100-500 envíos/mes'
        },
        {
          id: 'business',
          name: 'Business',
          monthlyPrice: 2999,
          annualPrice: 32989,
          description: '500-15K envíos/mes',
          popular: true
        },
        {
          id: 'corporate',
          name: 'Corporate',
          monthlyPrice: 9999,
          annualPrice: 109989,
          description: 'Más de 15K envíos/mes'
        }
      ],
      t1pos: [
        {
          id: 'go',
          name: 'Go',
          monthlyPrice: 0,
          annualPrice: 0,
          description: '1 sucursal, funciones básicas'
        },
        {
          id: 'start',
          name: 'Start',
          monthlyPrice: 399,
          annualPrice: 4389,
          description: '3 sucursales, funciones medias'
        },
        {
          id: 'advance',
          name: 'Advance',
          monthlyPrice: 999,
          annualPrice: 10989,
          description: '1 sucursal Pro',
          popular: true
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          monthlyPrice: null,
          annualPrice: null,
          description: '200+ sucursales'
        }
      ]
    };

    return plans[productId] || [];
  },

  // Obtener el plan actual del usuario para un producto
  getUserPlan: (productId) => {
    // Simulación - en producción vendría del backend
    const userPlans = {
      t1tienda: { plan: 'Intermedio', price: 999 },
      t1envios: { plan: 'Professional', price: 899 },
      t1pos: null
    };

    return userPlans[productId];
  },

  // Obtener información de un producto específico
  getProductById: (productId) => {
    console.log('getProductById called with:', productId);
    const products = plansService.getProducts();
    const product = products.find(p => p.id === productId);
    console.log('Found product:', product);
    return product || null;
  },

  // Obtener planes para un producto específico con toda la información
  getPlansForProduct: (productId) => {
    console.log('getPlansForProduct called with:', productId);
    const basePlans = plansService.getProductPlans(productId);
    console.log('Base plans:', basePlans);
    
    // Enriquecer los planes con información adicional
    const enrichedPlans = {
      t1tienda: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          annualPrice: 0,
          description: 'Sin tienda online, solo marketplaces',
          features: [
            'Gestión de marketplaces Sears y Sanborns',
            '1 usuario',
            '1 sucursal',
            '50 generaciones IA/mes',
            'Reportes básicos (24h delay)',
            'Soporte por chat y email'
          ],
          trial: 0
        },
        {
          id: 'basic',
          name: 'Básico',
          price: 399,
          annualPrice: 4389,
          monthlySavings: 798,
          description: 'Ideal para emprendedores',
          features: [
            'Tienda online profesional',
            'Sears + Sanborns + 2 marketplaces',
            '2 usuarios',
            '1 sucursal con POS Start',
            '500 generaciones IA/mes',
            'Facturación CFDI',
            'Carrito abandonado ilimitado',
            'Reportes en tiempo real'
          ],
          trial: 7,
          badge: 'popular'
        },
        {
          id: 'intermediate',
          name: 'Intermedio',
          price: 999,
          annualPrice: 10989,
          monthlySavings: 1998,
          description: 'Para negocios en crecimiento',
          features: [
            'Todo lo de Básico',
            'Sears + Sanborns + 4 marketplaces',
            '5 usuarios',
            '3 sucursales con POS Start',
            '2,000 generaciones IA/mes',
            '5 plantillas premium',
            'Gestión avanzada de clientes',
            'Reportes avanzados',
            'Soporte humano prioritario'
          ],
          trial: 7
        },
        {
          id: 'advanced',
          name: 'Avanzado',
          price: 2499,
          annualPrice: 27489,
          monthlySavings: 4998,
          description: 'Para vendedores de alto volumen',
          features: [
            'Todo lo de Intermedio',
            'Sears + Sanborns + 6 marketplaces',
            '15 usuarios',
            '10 sucursales con POS Start',
            '10,000 generaciones IA/mes',
            '20 plantillas premium',
            'API con mayor límite (240/min)',
            'Bot Manager para protección',
            'Soporte dedicado'
          ],
          trial: 7
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: null,
          annualPrice: null,
          description: 'Soluciones a medida',
          features: [
            'Marketplaces ilimitados',
            'Usuarios ilimitados',
            '200+ sucursales',
            'Generaciones IA ilimitadas',
            '100+ plantillas personalizadas',
            'API sin límites (1,200/min)',
            'SLA garantizado',
            'Gerente de cuenta dedicado',
            'Implementación asistida'
          ]
        }
      ],
      t1envios: [
        {
          id: 'starter',
          name: 'Starter',
          price: 0,
          annualPrice: 0,
          description: 'Para pequeños vendedores',
          features: [
            'Hasta 100 envíos/mes',
            'Cotizador ilimitado',
            'Rastreo básico con anuncios',
            'Recolecciones programadas',
            '200 cotizaciones masivas/día',
            'Autogestión de incidencias',
            'Reportes básicos',
            'Chat bot de soporte'
          ]
        },
        {
          id: 'professional',
          name: 'Professional',
          price: 899,
          annualPrice: 9889,
          monthlySavings: 1798,
          description: '100-500 envíos/mes',
          features: [
            'Todo lo de Starter',
            'Rastreo semi-personalizable',
            '1,000 cotizaciones masivas/día',
            'Hub logístico limitado',
            '2-3 reglas de orquestación',
            '300 notificaciones/mes',
            'API T1envíos propia',
            'Reportes intermedios',
            'Chat humano L-V 8am-8pm'
          ],
          badge: 'popular'
        },
        {
          id: 'business',
          name: 'Business',
          price: 2999,
          annualPrice: 32989,
          monthlySavings: 5998,
          description: '500-15,000 envíos/mes',
          features: [
            'Todo lo de Professional',
            'Rastreo 100% personalizable',
            'Cotizaciones ilimitadas',
            'Hub logístico completo',
            'Hasta 20 reglas de orquestación',
            '1,500 notificaciones/mes',
            'Hasta 3 APIs propias',
            'Reportes avanzados con IA',
            'Guía Manager dedicado',
            'SLA 99.9% uptime'
          ]
        },
        {
          id: 'corporate',
          name: 'Corporate',
          price: 9999,
          annualPrice: 109989,
          monthlySavings: 19998,
          description: 'Más de 15,000 envíos/mes',
          features: [
            'Todo lo de Business',
            'Reglas ilimitadas de orquestación',
            '5,000 notificaciones/mes',
            'APIs ilimitadas',
            'Insights predictivos avanzados',
            'Asesor de cuenta dedicado',
            'Soporte 24/7 + WhatsApp',
            'SLA garantizado',
            'Implementación asistida'
          ]
        }
      ],
      t1pos: [
        {
          id: 'go',
          name: 'Go',
          price: 0,
          annualPrice: 0,
          description: 'Punto de venta gratuito',
          features: [
            '1 sucursal',
            '1 usuario',
            'Dispositivos ilimitados',
            'Funciones básicas de venta',
            'Control básico de inventario',
            'Reportes de ventas diarios',
            'Métodos de pago personalizados',
            'Ticket digital básico'
          ]
        },
        {
          id: 'start',
          name: 'Start',
          price: 399,
          annualPrice: 4389,
          monthlySavings: 798,
          description: 'Para tiendas en crecimiento',
          features: [
            'Hasta 3 sucursales',
            'Hasta 3 usuarios',
            'Todo lo de Go',
            'Facturación CFDI',
            'Apertura/cierre de caja',
            'Programa de lealtad básico',
            'Apartados y preventas',
            'Órdenes de compra',
            'Reportes por categoría y vendedor'
          ],
          badge: 'popular'
        },
        {
          id: 'advance',
          name: 'Advance',
          price: 999,
          annualPrice: 10989,
          monthlySavings: 1998,
          description: 'POS Pro con IA',
          features: [
            '1 sucursal Pro',
            'Usuarios ilimitados',
            'Todo lo de Start',
            'Pantalla para cliente',
            'Modo offline sin internet',
            'Pronóstico de inventarios con IA',
            'Programa de lealtad omnicanal',
            'Comisiones avanzadas',
            'Control de horarios y asistencia',
            'Reportes personalizados'
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: null,
          annualPrice: null,
          description: 'Multi-sucursal corporativo',
          features: [
            '200+ sucursales',
            'Usuarios ilimitados',
            'POS Pro en todas las sucursales',
            'Personalización completa',
            'API dedicada',
            'Integraciones especiales',
            'SLA garantizado',
            'Gerente de cuenta',
            'Capacitación in-situ'
          ]
        }
      ]
    };
    
    const result = enrichedPlans[productId] || basePlans;
    console.log('Returning plans:', result);
    return result;
  }
};