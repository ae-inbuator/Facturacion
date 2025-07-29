import React from 'react';

// Toggle para cambiar entre facturación mensual y anual
export function BillingToggle({ selected, onChange }) {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        <button
          onClick={() => onChange('monthly')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
            selected === 'monthly' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600'
          }`}
        >
          Mensual
        </button>
        <button
          onClick={() => onChange('annual')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
            selected === 'annual' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600'
          }`}
        >
          Anual
          <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
            Ahorra 2 meses
          </span>
        </button>
      </div>
    </div>
  );
}