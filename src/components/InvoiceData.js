import React, { useState } from 'react';
import { Building2, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { InvoiceDataModal } from './InvoiceDataModal';

export function InvoiceData({ hasData = false }) {
  const [showModal, setShowModal] = useState(false);
  const [enableInvoices, setEnableInvoices] = useState(true);
  const [savedData, setSavedData] = useState(null);
  
  // Datos mock cuando hay información
  const mockData = {
    businessName: 'SAN CHARBEL',
    rfc: 'SCA880722Q71',
    regime: '626',
    taxpayerType: 'moral',
    address: 'CORREO MAYOR 94 PB 94 PB',
    street: 'CORREO MAYOR',
    exteriorNumber: '94',
    interiorNumber: 'PB 94 PB',
    colony: 'Centro',
    postalCode: '06000',
    city: 'Ciudad de México',
    state: 'Ciudad de México',
    email: 'facturas@sancharbel.com',
    enableAutoInvoicing: true
  };
  
  // Usar datos guardados o mock data
  const invoiceData = savedData || (hasData ? mockData : null);
  
  const handleSaveData = (data) => {
    setSavedData(data);
    setEnableInvoices(data.enableAutoInvoicing);
  };
  
  const getRegimeLabel = (regimeCode) => {
    const regimes = {
      '626': 'Régimen Simplificado de Confianza',
      '601': 'General de Ley Personas Morales',
      '612': 'Personas Físicas con Actividades Empresariales y Profesionales',
      // Agregar más según sea necesario
    };
    return regimes[regimeCode] || regimeCode;
  };
  
  const getTaxpayerTypeLabel = (type) => {
    return type === 'moral' ? 'Persona Moral' : 'Persona Física';
  };

  if (!invoiceData) {
    // Vista cuando NO hay datos configurados
    return (
      <>
        <div className="bg-white rounded-xl p-5 shadow-sm mb-8 border-l-4 border-orange-400">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Configura tus datos de facturación</h3>
              <p className="text-sm text-gray-600 mb-4">
                Para recibir facturas automáticas, necesitamos tu información fiscal.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowModal(true)}
              >
                Configurar ahora
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <InvoiceDataModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveData}
          initialData={null}
        />
      </>
    );
  }

  // Vista cuando SÍ hay datos configurados
  return (
    <>
      <div className="bg-white rounded-xl p-5 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold">Datos de facturación</h3>
          </div>
          <button 
            className="text-blue-600 text-sm hover:text-blue-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Modificar
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Razón Social</p>
            <p className="font-medium">{invoiceData.businessName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">RFC</p>
            <p className="font-medium">{invoiceData.rfc}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Régimen fiscal</p>
            <p className="font-medium text-sm">{getRegimeLabel(invoiceData.regime)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tipo de contribuyente</p>
            <p className="font-medium text-sm">{getTaxpayerTypeLabel(invoiceData.taxpayerType)}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500">Dirección fiscal</p>
          <p className="font-medium text-sm">
            {invoiceData.street} {invoiceData.exteriorNumber}
            {invoiceData.interiorNumber && ` Int. ${invoiceData.interiorNumber}`},
            Col. {invoiceData.colony}, C.P. {invoiceData.postalCode},
            {invoiceData.city}, {invoiceData.state}
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableInvoices}
              onChange={(e) => setEnableInvoices(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              {enableInvoices ? 'Facturas automáticas activadas' : 'Facturas automáticas desactivadas'}
            </span>
          </label>
        </div>
      </div>
      
      <InvoiceDataModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveData}
        initialData={invoiceData}
      />
    </>
  );
}
