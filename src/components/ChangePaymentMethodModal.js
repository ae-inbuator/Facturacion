import React, { useState } from 'react';
import { X, CreditCard, AlertCircle, Shield, Check } from 'lucide-react';

export function ChangePaymentMethodModal({ onClose, currentCard }) {
  const [selectedMethod, setSelectedMethod] = useState('saved');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Tarjetas guardadas de ejemplo
  const savedCards = [
    {
      id: 1,
      type: 'VISA',
      last4: '1234',
      holder: 'Chicco Ole',
      expiry: '12/2026',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5678',
      holder: 'Chicco Ole',
      expiry: '03/2025',
      isDefault: false
    }
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace('/', '').length <= 4) {
      setExpiryDate(formatted);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de actualización
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Método de pago actualizado
            </h3>
            <p className="text-gray-600">
              Tu nuevo método de pago ha sido guardado exitosamente
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Actualizar método de pago
            </h2>
            <p className="text-gray-600 mt-1">
              Selecciona o agrega una tarjeta para tus pagos automáticos
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Método de pago */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecciona un método
            </label>
            <div className="space-y-3">
              <label className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="saved"
                  checked={selectedMethod === 'saved'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="sr-only"
                />
                <div className={`border-2 rounded-lg p-4 transition-all ${
                  selectedMethod === 'saved' ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Usar tarjeta guardada</span>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedMethod === 'saved' 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === 'saved' && (
                        <Check size={12} className="text-white m-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </label>

              <label className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="new"
                  checked={selectedMethod === 'new'}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="sr-only"
                />
                <div className={`border-2 rounded-lg p-4 transition-all ${
                  selectedMethod === 'new' ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Agregar nueva tarjeta</span>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedMethod === 'new' 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === 'new' && (
                        <Check size={12} className="text-white m-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Tarjetas guardadas */}
          {selectedMethod === 'saved' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tarjetas guardadas
              </label>
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <label key={card.id} className="relative block cursor-pointer">
                    <input
                      type="radio"
                      name="savedCard"
                      value={card.id}
                      defaultChecked={card.isDefault}
                      className="sr-only"
                    />
                    <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-gray-400" size={24} />
                          <div>
                            <p className="font-medium text-gray-900">
                              {card.type} •••• {card.last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Vence {card.expiry} • {card.holder}
                            </p>
                          </div>
                        </div>
                        {card.isDefault && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Actual
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Nueva tarjeta */}
          {selectedMethod === 'new' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de tarjeta
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <CreditCard className="absolute right-4 top-3.5 text-gray-400" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del titular
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Como aparece en la tarjeta"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de vencimiento
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => {
                      if (e.target.value.length <= 4) {
                        setCvv(e.target.value.replace(/\D/g, ''));
                      }
                    }}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  Guardar esta tarjeta para futuros pagos
                </span>
              </label>
            </div>
          )}

          {/* Seguridad */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="text-gray-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Tu información está segura</h4>
                <p className="text-sm text-gray-600">
                  Todos los datos de tu tarjeta están encriptados y procesados de forma segura. 
                  Cumplimos con los estándares PCI DSS para proteger tu información.
                </p>
              </div>
            </div>
          </div>

          {/* Advertencia */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-orange-600 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-orange-800">
                  Al actualizar tu método de pago, se realizará un intento de cobro inmediato 
                  por los montos pendientes. Asegúrate de tener fondos suficientes.
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Actualizar método de pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
