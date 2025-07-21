import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Download, Calendar, Info, Tag, Package, CreditCard, Zap, CheckCircle } from 'lucide-react';
import { PlanChangeModal } from './PlanChangeModal';
import { PlanBenefitsModal } from './PlanBenefitsModal';
import { ChangeCutoffDateModal } from './ChangeCutoffDateModal';

export function PlanDetails({ onBack }) {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [showCutoffDateModal, setShowCutoffDateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandAvailablePlans, setExpandAvailablePlans] = useState(false);

  // Datos de ejemplo - en producción vendrían del backend
  const subscriptionData = {
    totalMonthly: 800,
    totalPlans: 2,
    anchorDate: 15,
    nextBillingDate: '15 de agosto, 2025',
    subscriptions: [
      {
        id: 'sub_tienda_123',
        icon: '🛍️',
        product: 'T1 Tienda',
        planName: 'Profesional',
        price: 500,
        billingCycle: 'monthly',
        status: 'active',
        startDate: '15 de julio, 2024',
        nextRenewal: '15 de agosto, 2025',
        features: [
          'Tienda online ilimitada',
          'Hasta 5,000 productos',
          '3 usuarios',
          'Integraciones con marketplaces',
          'IA para generación de contenido'
        ],
        color: 'blue'
      },
      {
        id: 'sub_envios_456',
        icon: '📦',
        product: 'T1 Envíos',
        planName: 'Básico',
        price: 300,
        billingCycle: 'monthly',
        status: 'active',
        startDate: '22 de julio, 2024',
        nextRenewal: '15 de agosto, 2025',
        features: [
          '100 guías mensuales incluidas',
          'Tarifas preferenciales',
          'Dashboard de tracking',
          'Recolección programada'
        ],
        wasProrated: true,
        color: 'green'
      }
    ],
    availableProducts: [
      {
        id: 'pagos',
        icon: '💳',
        name: 'T1 Pagos',
        description: 'Acepta pagos con tarjeta y SPEI',
        price: 'Desde $299/mes + comisiones',
        available: true
      },
      {
        id: 'marketing',
        icon: '🎯',
        name: 'T1 Marketing',
        description: 'Automatiza tu marketing con IA',
        price: 'Próximamente',
        available: false
      },
      {
        id: 'score',
        icon: '📊',
        name: 'T1 Score',
        description: 'Scoring antifraude para tu negocio',
        price: 'Planes empresariales',
        available: true
      }
    ],
    changeHistory: [
      {
        date: '22 jul 2024',
        description: 'Contrataste T1 Envíos Básico',
        type: 'new'
      },
      {
        date: '15 jul 2024',
        description: 'Upgrade a T1 Tienda Profesional',
        type: 'upgrade'
      },
      {
        date: '15 may 2024',
        description: 'Inicio con T1 Tienda Básico',
        type: 'new'
      }
    ]
  };

  const handleChangePlan = (plan) => {
    setSelectedPlan(plan);
    setShowChangeModal(true);
  };

  const handleViewBenefits = (plan) => {
    setSelectedPlan(plan);
    setShowBenefitsModal(true);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      active: 'Activo',
      paused: 'Pausado',
      cancelled: 'Cancelado'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <div className="ml-60 p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Regresar a Facturación
          </button>
          
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Mis planes y suscripciones</h1>
          <p className="text-gray-500 text-lg">Gestiona todos tus planes del ecosistema T1 en un solo lugar</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className="text-red-100 text-sm mb-1">Total mensual</p>
              <p className="text-4xl font-bold">${subscriptionData.totalMonthly}</p>
            </div>
            <div>
              <p className="text-red-100 text-sm mb-1">Planes activos</p>
              <p className="text-4xl font-bold">{subscriptionData.totalPlans}</p>
            </div>
            <div>
              <p className="text-red-100 text-sm mb-1">Fecha de corte universal</p>
              <p className="text-2xl font-semibold">Día {subscriptionData.anchorDate}</p>
              <p className="text-red-100 text-xs">de cada mes</p>
            </div>
            <div>
              <p className="text-red-100 text-sm mb-1">Próximo cobro</p>
              <p className="text-lg font-semibold">{subscriptionData.nextBillingDate}</p>
            </div>
          </div>
        </div>

        {/* Active Plans */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Planes activos</h2>
          <div className="grid gap-4">
            {subscriptionData.subscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getIconColor(subscription.color)}`}>
                      <span className="text-2xl">{subscription.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {subscription.product} - Plan {subscription.planName}
                        </h3>
                        {getStatusBadge(subscription.status)}
                      </div>
                      <p className="text-2xl font-semibold text-gray-900 mb-3">
                        ${subscription.price.toLocaleString()}/mes
                      </p>
                      
                      <div className="space-y-1.5 mb-4">
                        {subscription.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Contratado: {subscription.startDate}</span>
                        </div>
                        {subscription.wasProrated && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Prorrateado en primera factura
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Calendar size={14} />
                        <span>Próxima renovación: {subscription.nextRenewal}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleChangePlan(subscription)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cambiar plan
                    </button>
                    <button
                      onClick={() => handleViewBenefits(subscription)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Ver beneficios completos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Products */}
        <div className="mb-8">
          <button
            onClick={() => setExpandAvailablePlans(!expandAvailablePlans)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4 hover:text-gray-700 transition-colors"
          >
            <ChevronRight 
              size={20} 
              className={`transition-transform ${expandAvailablePlans ? 'rotate-90' : ''}`}
            />
            Agregar más productos T1
          </button>
          
          {expandAvailablePlans && (
            <div className="grid gap-3 bg-gray-50 rounded-xl p-4">
              {subscriptionData.availableProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`bg-white rounded-lg p-4 flex items-center justify-between ${
                    product.available ? 'hover:shadow-sm cursor-pointer' : 'opacity-60'
                  } transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{product.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{product.price}</p>
                    {product.available && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                        Más información →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Change History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Historial de cambios
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              {subscriptionData.changeHistory.map((change, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full ${
                    change.type === 'upgrade' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{change.description}</p>
                    <p className="text-xs text-gray-500">{change.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Cómo funcionan tus cobros</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li>• Tu fecha de corte es el día {subscriptionData.anchorDate} (definida por tu primer plan)</li>
                <li>• Todos los planes se cobran juntos en esta fecha</li>
                <li>• Los planes nuevos se prorratean hasta tu fecha de corte</li>
                <li>• Puedes cambiar entre planes mensual/anual cuando quieras</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCutoffDateModal(true)}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cambiar fecha de corte
            <span className="text-xs text-gray-500 block">Requiere aprobación</span>
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Descargar resumen de planes
          </button>
          <button className="px-6 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Ver facturas de suscripciones →
          </button>
        </div>
      </div>

      {/* Modals */}
      {showChangeModal && selectedPlan && (
        <PlanChangeModal
          plan={selectedPlan}
          onClose={() => setShowChangeModal(false)}
        />
      )}

      {showBenefitsModal && selectedPlan && (
        <PlanBenefitsModal
          plan={selectedPlan}
          onClose={() => setShowBenefitsModal(false)}
        />
      )}

      {showCutoffDateModal && (
        <ChangeCutoffDateModal
          currentDate={subscriptionData.anchorDate}
          onClose={() => setShowCutoffDateModal(false)}
        />
      )}
    </>
  );
}
