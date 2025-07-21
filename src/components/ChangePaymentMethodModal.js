import React, { useState } from 'react';
import { X, CreditCard, Shield, AlertCircle } from 'lucide-react';

const ChangePaymentMethodModal = ({ isOpen, onClose, onUpdate, currentPaymentMethod, savedCards = [], pendingCharges }) => {
  const [selectedMethod, setSelectedMethod] = useState(currentPaymentMethod?.id || savedCards[0]?.id || 'new');
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleUpdate = () => {
    if (pendingCharges && pendingCharges > 0) {
      setShowConfirmation(true);
    } else {
      // No hay cargos pendientes, actualizar directamente
      onUpdate(selectedMethod);
      onClose();
    }
  };

  const handleProcessNow = async () => {
    setProcessing(true);
    // Simular procesamiento
    setTimeout(() => {
      setProcessing(false);
      onUpdate(selectedMethod, true); // true indica que debe intentar cobro
      onClose();
    }, 2000);
  };

  const handleProcessLater = () => {
    onUpdate(selectedMethod, false); // false indica que NO debe intentar cobro ahora
    onClose();
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Método de pago actualizado correctamente
            </h3>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Como tienes montos pendientes de <span className="font-semibold">${pendingCharges?.toFixed(2) || '0.00'}</span>, 
                realizaremos un intento de cobro inmediato.
              </p>
            </div>

            {processing ? (
              <div className="py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Procesando cobro...</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleProcessNow}
                  className="flex-1 bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Procesar cobro ahora
                </button>
                <button
                  onClick={handleProcessLater}
                  className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                >
                  Intentar más tarde
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Actualizar método de pago</h2>
            <p className="text-sm text-gray-500 mt-1">Selecciona o agrega una tarjeta para tus pagos automáticos</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            {/* Tarjetas guardadas */}
            {savedCards.map((card) => (
              <label
                key={card.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedMethod === card.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={card.id}
                  checked={selectedMethod === card.id}
                  onChange={() => {
                    setSelectedMethod(card.id);
                    setShowNewCardForm(false);
                  }}
                  className="h-4 w-4 text-red-500 focus:ring-red-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {card.brand} •••• {card.last4}
                      </span>
                    </div>
                    {card.id === currentPaymentMethod?.id && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Actual
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Vence {card.expiryMonth}/{card.expiryYear} • {card.name}
                  </p>
                </div>
              </label>
            ))}

            {/* Opción agregar nueva tarjeta */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                selectedMethod === 'new' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value="new"
                checked={selectedMethod === 'new'}
                onChange={() => {
                  setSelectedMethod('new');
                  setShowNewCardForm(true);
                }}
                className="h-4 w-4 text-red-500 focus:ring-red-500"
              />
              <div className="ml-3">
                <span className="font-medium text-gray-900">Agregar nueva tarjeta</span>
              </div>
            </label>
          </div>

          {/* Formulario nueva tarjeta */}
          {showNewCardForm && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    value={newCard.number}
                    onChange={(e) => setNewCard({ ...newCard, number: formatCardNumber(e.target.value) })}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vencimiento
                    </label>
                    <input
                      type="text"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({ ...newCard, expiry: formatExpiry(e.target.value) })}
                      placeholder="MM/AA"
                      maxLength="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    placeholder="Como aparece en la tarjeta"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Información de seguridad */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Tu información está segura</p>
                <p className="text-xs text-gray-500 mt-1">
                  Todos los datos de tu tarjeta están encriptados y procesados de forma segura. 
                  Cumplimos con los estándares PCI DSS para proteger tu información.
                </p>
              </div>
            </div>
          </div>

          {/* Advertencia sobre cobro inmediato */}
          {pendingCharges && pendingCharges > 0 && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">
                    Al actualizar tu método de pago, se realizará un intento de cobro inmediato por los 
                    montos pendientes. Asegúrate de tener fondos suficientes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdate}
            disabled={!selectedMethod || (selectedMethod === 'new' && (!newCard.number || !newCard.expiry || !newCard.cvv || !newCard.name))}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Actualizar método de pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePaymentMethodModal;