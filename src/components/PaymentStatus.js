import React from 'react';
import { AlertTriangle, Info, Clock, XCircle } from 'lucide-react';

export function PaymentStatus({ 
  failureType, 
  daysRemaining, 
  amount, 
  nextBillingDate,
  suspensionDate,
  onAction 
}) {
  // No mostrar nada si no hay fallo
  if (!failureType) return null;

  const configs = {
    subscription_failed: {
      icon: <AlertTriangle size={20} />,
      bgClass: 'bg-red-50 border-2 border-red-300',
      iconClass: 'text-red-600',
      title: 'Tu suscripción no pudo cobrarse',
      subtitle: daysRemaining > 0 
        ? `Tienes ${daysRemaining} días para actualizar tu pago o tus servicios se suspenderán el ${suspensionDate}`
        : 'Tus servicios están suspendidos',
      actionText: 'Actualizar método de pago',
      actionClass: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm',
      priority: 'critical',
      dismissible: false
    },
    additional_charges_failed: {
      icon: <Info size={16} />,
      bgClass: 'bg-amber-50 border-l-4 border-amber-400',
      iconClass: 'text-amber-600',
      title: `No pudimos cobrar ${amount}`,
      subtitle: `Se acumularán para tu próximo corte (${nextBillingDate})`,
      actionText: 'Actualizar',
      actionClass: 'text-amber-700 hover:text-amber-800 font-medium text-sm',
      priority: 'warning',
      dismissible: true
    },
    grace_period_warning: {
      icon: <Clock size={20} />,
      bgClass: 'bg-orange-50 border-2 border-orange-300',
      iconClass: 'text-orange-600',
      title: `Quedan ${daysRemaining} días de tu período de gracia`,
      subtitle: 'Actualiza tu pago para evitar la suspensión de servicios',
      actionText: 'Resolver ahora',
      actionClass: 'bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm',
      priority: 'urgent',
      dismissible: false
    },
    services_suspended: {
      icon: <XCircle size={20} />,
      bgClass: 'bg-gray-100 border-2 border-gray-400',
      iconClass: 'text-gray-700',
      title: 'Servicios suspendidos por falta de pago',
      subtitle: 'Actualiza tu método de pago para reactivar todos tus servicios',
      actionText: 'Reactivar servicios',
      actionClass: 'bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium text-sm',
      priority: 'suspended',
      dismissible: false
    }
  };

  const config = configs[failureType];
  if (!config) return null;

  // Para fallos de suscripción, mostrar timeline
  const showTimeline = failureType === 'subscription_failed' && daysRemaining > 0;

  return (
    <div className={`rounded-lg p-4 ${config.bgClass} payment-alert-animation`}>
      <div className="flex items-start gap-3">
        <div className={`${config.iconClass} flex-shrink-0 mt-0.5`}>
          {config.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">
            {config.title}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">
            {config.subtitle}
          </p>
          
          {/* Timeline para fallos de suscripción */}
          {showTimeline && (
            <div className="mt-3 bg-white/50 rounded-md p-3">
              <PaymentRetryTimeline daysRemaining={daysRemaining} />
            </div>
          )}
        </div>

        <button
          onClick={onAction}
          className={`${config.actionClass} transition-all hover:shadow-md flex-shrink-0`}
        >
          {config.actionText}
        </button>
      </div>
    </div>
  );
}

// Componente de timeline para mostrar intentos de cobro
function PaymentRetryTimeline({ daysRemaining }) {
  const attempts = [
    { day: 0, status: 'failed', label: 'Intento inicial' },
    { day: 2, status: daysRemaining <= 5 ? 'failed' : 'pending', label: '2do intento' },
    { day: 5, status: daysRemaining <= 2 ? 'failed' : 'pending', label: '3er intento' },
    { day: 7, status: 'suspension', label: 'Suspensión' }
  ];

  const currentDay = 7 - daysRemaining;

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-700 mb-2">Cronograma de cobros:</p>
      <div className="relative">
        {/* Línea de progreso */}
        <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200"></div>
        <div 
          className="absolute top-2 left-0 h-0.5 bg-red-500 transition-all duration-500"
          style={{ width: `${(currentDay / 7) * 100}%` }}
        ></div>
        
        {/* Puntos del timeline */}
        <div className="relative flex justify-between">
          {attempts.map((attempt, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`
                w-4 h-4 rounded-full border-2 
                ${attempt.status === 'failed' ? 'bg-red-500 border-red-500' : ''}
                ${attempt.status === 'pending' ? 'bg-white border-gray-300' : ''}
                ${attempt.status === 'suspension' ? 'bg-gray-500 border-gray-500' : ''}
              `}></div>
              <span className="text-xs text-gray-600 mt-1 whitespace-nowrap">
                {attempt.label}
              </span>
              <span className="text-xs text-gray-400">
                Día {attempt.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Badge minimalista para estado al corriente
export function PaymentStatusBadge({ status }) {
  if (status !== 'upToDate') return null;
  
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-dot-pulse"></div>
      <span className="text-xs text-gray-500">Al corriente</span>
    </div>
  );
}