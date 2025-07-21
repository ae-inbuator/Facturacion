import React from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react';

export function PaymentStatus({ 
  failureType, 
  daysRemaining, 
  amount, 
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
      title: daysRemaining && daysRemaining > 0 && daysRemaining <= 2
        ? `Quedan ${daysRemaining} ${daysRemaining === 1 ? 'día' : 'días'} de tu período de gracia`
        : 'Tu suscripción no pudo cobrarse',
      subtitle: daysRemaining > 0 
        ? `Tienes ${daysRemaining} ${daysRemaining === 1 ? 'día' : 'días'} para actualizar tu pago o tus servicios se suspenderán el ${suspensionDate}`
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
      title: `No pudimos cobrar ${amount} por límite alcanzado`,
      subtitle: `Reintentaremos el cobro diariamente. Mientras tanto, los nuevos cargos siguen acumulándose.`,
      actionText: 'Actualizar método de pago',
      actionClass: 'text-amber-700 hover:text-amber-800 font-medium text-sm',
      priority: 'warning',
      dismissible: true
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