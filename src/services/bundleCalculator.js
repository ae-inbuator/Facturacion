// Calculador de descuentos y bundles
export const bundleCalculator = {
  // Bundles disponibles
  bundles: [
    {
      id: 'emprendedor',
      name: 'Bundle Emprendedor',
      description: 'Perfecto para iniciar tu negocio',
      products: ['t1tienda:basico', 't1envios:starter'],
      discount: 0, // Starter es gratis
      featured: false
    },
    {
      id: 'profesional',
      name: 'Bundle Profesional',
      description: 'Escala tu negocio al siguiente nivel',
      products: ['t1tienda:intermedio', 't1envios:professional'],
      discount: 200, // Descuento fijo
      featured: true
    },
    {
      id: 'empresarial',
      name: 'Bundle Empresarial',
      description: 'Solución completa omnicanal',
      products: ['t1tienda:avanzado', 't1envios:business', 't1pos:advance'],
      discount: 1494, // Descuento mayor
      featured: false
    }
  ],

  // Calcular precio de un bundle
  calculateBundlePrice: function(bundleId, billingCycle = 'monthly') {
    const bundle = this.bundles.find(b => b.id === bundleId);
    if (!bundle) return null;

    let totalPrice = 0;
    const products = [];

    bundle.products.forEach(productPlan => {
      const [productId, planId] = productPlan.split(':');
      // Aquí obtendrías el precio real del plan
      // Por ahora usamos valores de ejemplo
      const prices = {
        't1tienda:basico': { monthly: 399, annual: 4389 },
        't1tienda:intermedio': { monthly: 999, annual: 10989 },
        't1tienda:avanzado': { monthly: 2499, annual: 27489 },
        't1envios:starter': { monthly: 0, annual: 0 },
        't1envios:professional': { monthly: 899, annual: 9889 },
        't1envios:business': { monthly: 2999, annual: 32989 },
        't1pos:advance': { monthly: 999, annual: 10989 }
      };

      const price = prices[productPlan]?.[billingCycle] || 0;
      totalPrice += price;
      products.push({ productId, planId, price });
    });

    const finalPrice = billingCycle === 'monthly' 
      ? totalPrice - bundle.discount
      : (totalPrice - (bundle.discount * 12));

    return {
      bundle,
      products,
      originalPrice: totalPrice,
      discount: bundle.discount,
      finalPrice,
      savings: totalPrice - finalPrice,
      billingCycle
    };
  },

  // Detectar mejor bundle para el usuario
  recommendBundle: function(userPlans) {
    // Lógica para recomendar el mejor bundle basado en los planes actuales
    // Por ahora retornamos el profesional como ejemplo
    return 'profesional';
  }
};