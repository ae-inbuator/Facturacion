import React from 'react';
import { PencilLine, CreditCard } from 'lucide-react';

// Detectar tipo de tarjeta basado en los primeros dígitos
function getCardType(cardNumber) {
  const firstDigit = cardNumber?.charAt(0);
  const firstTwo = cardNumber?.substring(0, 2);
  
  if (firstDigit === '4') return 'visa';
  if (firstDigit === '5' || ['22', '23', '24', '25', '26', '27'].includes(firstTwo)) return 'mastercard';
  if (firstTwo === '34' || firstTwo === '37') return 'amex';
  return 'generic';
}

// Componentes de logos de tarjetas
const CardLogos = {
  visa: () => (
    <svg width="34" height="22" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <path d="M20.41 11.41h-3.34l-2.09 9.19h3.34l2.09-9.19zm7.62 5.94c0-.89-.55-1.55-1.75-1.98l-.73-.27c-.42-.16-.61-.35-.61-.59 0-.29.27-.48.69-.48.72 0 1.37.24 1.72.4l.42-1.93c-.45-.2-1.28-.44-2.19-.44-2.27 0-3.36 1.14-3.36 2.64 0 .94.63 1.58 1.8 2l.59.22c.52.2.69.39.69.64 0 .35-.35.56-.85.56-.75 0-1.53-.31-1.94-.51l-.42 1.98c.51.26 1.47.49 2.36.49 2.45.01 3.58-1.09 3.58-2.73zm5.53-5.94l-2.41 9.19h3.21l2.41-9.19h-3.21zm-16.33 0l-2.62 6.28-.28-1.46-.95-4.57s-.11-.25-.42-.25h-3.12l-.04.19s.95.19 2.07.84l2.73 8.16h3.27l4.87-9.19h-3.51z" fill="white"/>
    </svg>
  ),
  mastercard: () => (
    <svg width="34" height="22" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#252525"/>
      <circle cx="19" cy="16" r="8" fill="#EB001B"/>
      <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
      <path d="M24 22.5c2.21-1.7 3.5-4.34 3.5-6.5s-1.29-4.8-3.5-6.5c-2.21 1.7-3.5 4.34-3.5 6.5s1.29 4.8 3.5 6.5z" fill="#FF5F00"/>
    </svg>
  ),
  amex: () => (
    <svg width="34" height="22" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#006FCF"/>
      <path d="M13 11h22v10H13z" fill="white" fillOpacity="0.2"/>
      <path d="M20.5 11l-1.5 10h3l.5-3.3h1.7c1.9 0 3.3-1 3.3-3.2 0-1.8-1.2-3.5-3.8-3.5h-3.2zm1.8 2.2h1c.8 0 1.2.5 1.2 1.1 0 .8-.6 1.2-1.4 1.2h-.5l.3-2.3zm7.7-2.2l-.4 2.5 1.5-2.5h3.6l-2.5 3.8 1.5 6.2h-3l-.7-3.5-1.3 3.5h-2.3l1.6-10z" fill="white"/>
    </svg>
  ),
  generic: () => (
    <div className="w-[34px] h-[22px] bg-gray-200 rounded flex items-center justify-center">
      <CreditCard size={14} className="text-gray-500" />
    </div>
  )
};

export function PaymentMethod({ 
  cardType, 
  cardNumber, 
  cardHolderName, 
  nextChargeDate,
  nextChargeAmount,
  paymentStatus = 'upToDate',
  onChangeMethod 
}) {
  const detectedCardType = getCardType(cardNumber);
  const CardLogo = CardLogos[detectedCardType] || CardLogos.generic;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Método de pago</h3>
        <button 
          onClick={onChangeMethod}
          className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
        >
          <PencilLine size={14} />
          Cambiar
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        {/* Info de tarjeta */}
        <div className="flex items-center gap-3">
          <CardLogo />
          <div>
            <div className="font-medium text-gray-900 flex items-center gap-2">
              <span>{cardNumber}</span>
              {paymentStatus === 'failed' && (
                <span className="inline-flex items-center gap-1 text-xs text-red-600 font-normal">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  Rechazada
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">{cardHolderName}</div>
          </div>
        </div>
        
        {/* Próximo cargo */}
        {paymentStatus === 'upToDate' && nextChargeDate && (
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Próximo cargo: {nextChargeDate}
            </div>
            {nextChargeAmount && (
              <div className="text-lg font-semibold text-gray-900">
                {nextChargeAmount}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
