import React from 'react';
import { Heart, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export function AccountHealthIndicator({ paymentFailure, lastPaymentDate, accountAge }) {
  // Calcular salud de la cuenta
  const getAccountHealth = () => {
    if (!paymentFailure) return { score: 100, status: 'excellent', color: 'green' };
    
    switch (paymentFailure.type) {
      case 'subscription_failed':
        return { 
          score: 25, 
          status: 'critical', 
          color: 'red',
          message: 'Acción urgente requerida'
        };
      case 'grace_period_warning':
        return { 
          score: 40, 
          status: 'warning', 
          color: 'orange',
          message: `${paymentFailure.daysRemaining} días para resolver`
        };
      case 'additional_charges_failed':
        return { 
          score: 75, 
          status: 'fair', 
          color: 'yellow',
          message: 'Cargos pendientes de cobro'
        };
      case 'services_suspended':
        return { 
          score: 0, 
          status: 'suspended', 
          color: 'gray',
          message: 'Cuenta suspendida'
        };
      default:
        return { score: 100, status: 'excellent', color: 'green' };
    }
  };

  const health = getAccountHealth();
  
  const healthColors = {
    green: 'text-green-600 bg-green-50 border-green-200',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    gray: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  const healthGradients = {
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    gray: 'from-gray-400 to-gray-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Heart className="text-gray-400" size={20} />
            Salud de tu Cuenta
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Indicador general del estado de tu cuenta
          </p>
        </div>
        
        {/* Score visual */}
        <div className="text-right">
          <div className={`text-3xl font-bold ${healthColors[health.color].split(' ')[0]}`}>
            {health.score}%
          </div>
          <div className={`text-sm font-medium ${healthColors[health.color].split(' ')[0]}`}>
            {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${healthGradients[health.color]} transition-all duration-500`}
            style={{ width: `${health.score}%` }}
          />
        </div>
      </div>

      {/* Mensaje de estado */}
      {health.message && (
        <div className={`rounded-lg border p-3 mb-4 ${healthColors[health.color]}`}>
          <p className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle size={16} />
            {health.message}
          </p>
        </div>
      )}

      {/* Indicadores adicionales */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Último pago</div>
          <div className="text-sm font-medium text-gray-900">
            {lastPaymentDate || 'N/A'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Antigüedad</div>
          <div className="text-sm font-medium text-gray-900">
            {accountAge || '0'} meses
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Historial</div>
          <div className="text-sm font-medium text-green-600 flex items-center justify-center gap-1">
            <TrendingUp size={14} />
            Bueno
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      {health.score < 100 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            <strong>Recomendación:</strong> 
            {health.score === 0 && ' Actualiza tu método de pago inmediatamente para reactivar tu cuenta.'}
            {health.score < 50 && health.score > 0 && ' Resuelve los problemas de pago lo antes posible para evitar interrupciones.'}
            {health.score >= 50 && health.score < 100 && ' Mantén tu método de pago actualizado para evitar futuros inconvenientes.'}
          </p>
        </div>
      )}
    </div>
  );
}