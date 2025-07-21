import React, { useState } from 'react';
import { X, Calendar, AlertCircle, Phone, Clock } from 'lucide-react';

export function ChangeCutoffDateModal({ currentDate, onClose }) {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reason, setReason] = useState('');

  const validDates = [1, 5, 10, 15, 20, 25]; // Fechas permitidas

  const handleRequestChange = () => {
    if (selectedDate === currentDate) {
      onClose();
      return;
    }
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Solicitud enviada
            </h3>
            <p className="text-gray-600">
              Un ejecutivo te contactará en las próximas 24-48 horas para confirmar el cambio
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Detalles de tu solicitud:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha actual:</span>
                <span className="text-gray-900">Día {currentDate} de cada mes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha solicitada:</span>
                <span className="font-medium text-gray-900">Día {selectedDate} de cada mes</span>
              </div>
              {reason && (
                <div className="pt-2 border-t">
                  <span className="text-gray-600">Motivo:</span>
                  <p className="text-gray-900 mt-1">{reason}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Importante:</strong> El cambio aplicará a partir del próximo ciclo de facturación. 
              Todos tus planes se ajustarán a la nueva fecha.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Cambiar fecha de corte
            </h2>
            <p className="text-gray-600 mt-1">
              Solicita cambiar el día de cobro mensual de todos tus planes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Date Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <Calendar className="text-gray-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Fecha de corte actual: Día {currentDate}
              </h3>
              <p className="text-sm text-gray-600">
                Todos tus planes y cargos adicionales se cobran el día {currentDate} de cada mes
              </p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-orange-50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm font-medium text-orange-900 mb-1">
              Consideraciones importantes:
            </p>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Este cambio requiere aprobación manual de nuestro equipo</li>
              <li>• Aplicará a TODOS tus productos T1 (tienda, envíos, pagos, etc.)</li>
              <li>• El cambio se reflejará en tu próximo ciclo de facturación</li>
              <li>• Puede generar un cobro prorrateado en la transición</li>
            </ul>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Selecciona la nueva fecha de corte
          </label>
          <div className="grid grid-cols-3 gap-3">
            {validDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                disabled={date === currentDate}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedDate === date
                    ? 'border-red-500 bg-red-50'
                    : date === currentDate
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl font-semibold text-gray-900">
                  Día {date}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  de cada mes
                </div>
                {date === currentDate && (
                  <div className="text-xs text-gray-400 mt-1">
                    (Actual)
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo del cambio (opcional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej: Alinear con mi fecha de nómina, consolidar pagos, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            rows="3"
          />
        </div>

        {/* Process Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Proceso de aprobación</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Recibirás un correo de confirmación de solicitud</li>
                <li>2. Un ejecutivo revisará tu caso en 24-48 horas</li>
                <li>3. Te contactaremos para confirmar el cambio</li>
                <li>4. El cambio se aplicará en tu próximo ciclo</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          
          <button
            onClick={handleRequestChange}
            disabled={selectedDate === currentDate}
            className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedDate === currentDate
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            <Phone size={18} />
            Solicitar cambio
          </button>
        </div>
      </div>
    </div>
  );
}
