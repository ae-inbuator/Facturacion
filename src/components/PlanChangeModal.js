import React, { useState } from 'react';
import { X, Check, AlertCircle, ArrowRight, Tag, Zap } from 'lucide-react';

export function PlanChangeModal({ plan, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(plan.planName);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Planes disponibles para cada producto
  const availablePlans = {
    'T1 Tienda': [
      {
        name: 'Básico',
        monthlyPrice: 299,
        annualPrice: 2990,
        features: [
          'Tienda online básica',
          'Hasta 100 productos',
          '1 usuario',
          'Integración con 1 marketplace',
          'Soporte por email'
        ],
        highlighted: []
      },
      {
        name: 'Profesional',
        monthlyPrice: 500,
        annualPrice: 5400,
        features: [
          'Tienda online ilimitada',
          'Hasta 5,000 productos',
          '3 usuarios',
          'Integraciones con marketplaces',
          'IA para generación de contenido',
          'Reportes avanzados',
          'Soporte prioritario'
        ],
        highlighted: ['IA para generación de contenido', 'Reportes avanzados'],
        popular: true
      },
      {
        name: 'Empresarial',
        monthlyPrice: 1200,
        annualPrice: 12000,
        features: [
          'Todo lo de Profesional',
          'Productos ilimitados',
          'Usuarios ilimitados',
          'API personalizada',
          'Múltiples tiendas',
          'Soporte dedicado 24/7',
          'Onboarding personalizado'
        ],
        highlighted: ['Múltiples tiendas', 'Soporte dedicado 24/7']
      }
    ],
    'T1 Envíos': [
      {
        name: 'Básico',
        monthlyPrice: 300,
        annualPrice: 3000,
        features: [
          '100 guías mensuales incluidas',
          'Tarifas preferenciales',
          'Dashboard de tracking',
          'Recolección programada',
          'Soporte por email'
        ],
        highlighted: []
      },
      {
        name: 'Pro',
        monthlyPrice: 600,
        annualPrice: 6000,
        features: [
          '500 guías mensuales incluidas',
          'Mejores tarifas',
          'Dashboard avanzado',
          'Recolección express',
          'Módulo de incidencias',
          'Integraciones API',
          'Soporte prioritario'
        ],
        highlighted: ['Módulo de incidencias', 'Integraciones API'],
        popular: true
      },
      {
        name: 'Empresarial',
        monthlyPrice: 1500,
        annualPrice: 15000,
        features: [
          'Guías ilimitadas',
          'Tarifas corporativas',
          'Orquestador de envíos',
          'Múltiples ubicaciones',
          'Gestión de flotillas',
          'SLA garantizado',
          'Ejecutivo de cuenta'
        ],
        highlighted: ['Orquestador de envíos', 'SLA garantizado']
      }
    ]
  };

  const plans = availablePlans[plan.product] || [];
  const currentPlanData = plans.find(p => p.name === selectedPlan);
  const originalPlanData = plans.find(p => p.name === plan.planName);

  const calculatePriceChange = () => {
    if (!currentPlanData || !originalPlanData) return 0;
    
    const currentPrice = billingCycle === 'monthly' 
      ? currentPlanData.monthlyPrice 
      : currentPlanData.annualPrice / 12;
    
    const originalPrice = plan.price;
    
    return currentPrice - originalPrice;
  };

  const priceChange = calculatePriceChange();

  const handleConfirmChange = () => {
    if (selectedPlan === plan.planName && billingCycle === 'monthly') {
      onClose();
      return;
    }
    setShowConfirmation(true);
  };

  const getProrationInfo = () => {
    const today = new Date();
    const anchorDate = new Date(today.getFullYear(), today.getMonth(), 15);
    if (today > anchorDate) {
      anchorDate.setMonth(anchorDate.getMonth() + 1);
    }
    
    const daysUntilAnchor = Math.ceil((anchorDate - today) / (1000 * 60 * 60 * 24));
    const proratedAmount = Math.round((currentPlanData.monthlyPrice / 30) * daysUntilAnchor);
    
    return {
      days: daysUntilAnchor,
      amount: proratedAmount,
      date: anchorDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  const proration = getProrationInfo();

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Cambio confirmado
            </h3>
            <p className="text-gray-600">
              Tu plan se actualizará a {plan.product} {selectedPlan}
              {billingCycle === 'annual' && ' (Plan anual)'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Resumen del cambio:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan anterior:</span>
                <span className="text-gray-900">{plan.planName} (${plan.price}/mes)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan nuevo:</span>
                <span className="text-gray-900">
                  {selectedPlan} 
                  {billingCycle === 'monthly' 
                    ? ` ($${currentPlanData.monthlyPrice}/mes)`
                    : ` ($${currentPlanData.annualPrice}/año)`
                  }
                </span>
              </div>
              {billingCycle === 'monthly' && (
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">Prorrateo ({proration.days} días):</span>
                  <span className="font-medium text-gray-900">${proration.amount}</span>
                </div>
              )}
              {billingCycle === 'annual' && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-600">
                    Se cobrará el monto anual completo en tu próxima fecha de corte.
                    Ahorras ${(currentPlanData.monthlyPrice * 12) - currentPlanData.annualPrice} al año.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => onClose()}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Cambiar plan de {plan.product}
            </h2>
            <p className="text-gray-600 mt-1">
              Selecciona el plan que mejor se adapte a tus necesidades
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === 'annual' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Anual
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  Ahorra 2 meses
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {plans.map((planOption) => {
              const isCurrentPlan = planOption.name === plan.planName;
              const isSelected = planOption.name === selectedPlan;
              const price = billingCycle === 'monthly' 
                ? planOption.monthlyPrice 
                : planOption.annualPrice;

              return (
                <div
                  key={planOption.name}
                  className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan(planOption.name)}
                >
                  {planOption.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        Más popular
                      </span>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                        Plan actual
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {planOption.name}
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'mes' : 'año'}
                    </span>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-green-600 mt-1">
                        ${(planOption.monthlyPrice * 12 - planOption.annualPrice).toLocaleString()} de ahorro
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {planOption.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check 
                          size={16} 
                          className={`mt-0.5 flex-shrink-0 ${
                            planOption.highlighted.includes(feature) 
                              ? 'text-red-500' 
                              : 'text-green-500'
                          }`} 
                        />
                        <span className={`${
                          planOption.highlighted.includes(feature) 
                            ? 'font-medium text-gray-900' 
                            : 'text-gray-600'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-red-500 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Price Change Alert */}
          {(selectedPlan !== plan.planName || billingCycle === 'annual') && (
            <div className={`rounded-lg p-4 mb-6 flex items-start gap-3 ${
              priceChange > 0 ? 'bg-orange-50' : 'bg-green-50'
            }`}>
              <AlertCircle 
                size={20} 
                className={priceChange > 0 ? 'text-orange-600 mt-0.5' : 'text-green-600 mt-0.5'} 
              />
              <div className="flex-1">
                <p className={`font-medium ${priceChange > 0 ? 'text-orange-900' : 'text-green-900'}`}>
                  {priceChange > 0 
                    ? `Este cambio aumentará tu factura mensual en $${Math.abs(priceChange)}`
                    : priceChange < 0
                    ? `Este cambio reducirá tu factura mensual en $${Math.abs(priceChange)}`
                    : billingCycle === 'annual'
                    ? 'Cambiarás a facturación anual con descuento'
                    : 'No hay cambios en el precio de tu plan'
                  }
                </p>
                {billingCycle === 'monthly' && selectedPlan !== plan.planName && (
                  <p className="text-sm text-gray-600 mt-1">
                    Se cobrará un prorrateo de ${proration.amount} por los {proration.days} días 
                    restantes hasta tu próxima fecha de corte ({proration.date}).
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              onClick={handleConfirmChange}
              disabled={selectedPlan === plan.planName && billingCycle === 'monthly'}
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedPlan === plan.planName && billingCycle === 'monthly'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {selectedPlan === plan.planName && billingCycle === 'monthly' 
                ? 'Ya tienes este plan' 
                : 'Confirmar cambio'
              }
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
