import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function InvoiceDataModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    rfc: '',
    businessName: '',
    regime: '',
    taxpayerType: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    colony: '',
    postalCode: '',
    city: '',
    state: '',
    email: '',
    enableAutoInvoicing: true
  });

  const [errors, setErrors] = useState({});
  const [rfcValid, setRfcValid] = useState(null);

  // Catálogo de regímenes fiscales
  const taxRegimes = [
    { value: '601', label: 'General de Ley Personas Morales' },
    { value: '603', label: 'Personas Morales con Fines no Lucrativos' },
    { value: '605', label: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
    { value: '606', label: 'Arrendamiento' },
    { value: '607', label: 'Régimen de Enajenación o Adquisición de Bienes' },
    { value: '608', label: 'Demás ingresos' },
    { value: '610', label: 'Residentes en el Extranjero sin Establecimiento Permanente en México' },
    { value: '611', label: 'Ingresos por Dividendos (socios y accionistas)' },
    { value: '612', label: 'Personas Físicas con Actividades Empresariales y Profesionales' },
    { value: '614', label: 'Ingresos por intereses' },
    { value: '615', label: 'Régimen de los ingresos por obtención de premios' },
    { value: '616', label: 'Sin obligaciones fiscales' },
    { value: '620', label: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
    { value: '621', label: 'Incorporación Fiscal' },
    { value: '622', label: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
    { value: '623', label: 'Opcional para Grupos de Sociedades' },
    { value: '624', label: 'Coordinados' },
    { value: '625', label: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
    { value: '626', label: 'Régimen Simplificado de Confianza' }
  ];

  // Estados de México
  const mexicoStates = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 
    'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        rfc: initialData.rfc || '',
        businessName: initialData.businessName || '',
        regime: initialData.regime || '',
        taxpayerType: initialData.taxpayerType || '',
        street: initialData.street || '',
        exteriorNumber: initialData.exteriorNumber || '',
        interiorNumber: initialData.interiorNumber || '',
        colony: initialData.colony || '',
        postalCode: initialData.postalCode || '',
        city: initialData.city || '',
        state: initialData.state || '',
        email: initialData.email || '',
        enableAutoInvoicing: initialData.enableAutoInvoicing !== false
      });
    }
  }, [initialData]);

  // Validación básica de RFC
  const validateRFC = (rfc) => {
    const rfcRegex = {
      moral: /^[A-ZÑ&]{3}[0-9]{6}[A-Z0-9]{3}$/,
      fisica: /^[A-Z&Ñ]{4}[0-9]{6}[A-Z0-9]{3}$/
    };
    
    const cleanRFC = rfc.toUpperCase().trim();
    return rfcRegex.moral.test(cleanRFC) || rfcRegex.fisica.test(cleanRFC);
  };

  const handleRFCChange = (value) => {
    const upperValue = value.toUpperCase();
    setFormData({ ...formData, rfc: upperValue });
    
    if (upperValue.length >= 12) {
      setRfcValid(validateRFC(upperValue));
      
      // Auto-detectar tipo de contribuyente
      if (upperValue.length === 12) {
        setFormData(prev => ({ ...prev, taxpayerType: 'moral' }));
      } else if (upperValue.length === 13) {
        setFormData(prev => ({ ...prev, taxpayerType: 'fisica' }));
      }
    } else {
      setRfcValid(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rfc) newErrors.rfc = 'RFC es requerido';
    else if (!validateRFC(formData.rfc)) newErrors.rfc = 'RFC inválido';
    
    if (!formData.businessName) newErrors.businessName = 'Razón social es requerida';
    if (!formData.regime) newErrors.regime = 'Régimen fiscal es requerido';
    if (!formData.taxpayerType) newErrors.taxpayerType = 'Tipo de contribuyente es requerido';
    if (!formData.street) newErrors.street = 'Calle es requerida';
    if (!formData.exteriorNumber) newErrors.exteriorNumber = 'Número exterior es requerido';
    if (!formData.colony) newErrors.colony = 'Colonia es requerida';
    if (!formData.postalCode) newErrors.postalCode = 'Código postal es requerido';
    if (!formData.city) newErrors.city = 'Ciudad es requerida';
    if (!formData.state) newErrors.state = 'Estado es requerido';
    if (!formData.email) newErrors.email = 'Email es requerido';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {initialData ? 'Modificar datos de facturación' : 'Configurar datos de facturación'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* RFC y Razón Social */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RFC *
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={formData.rfc}
                    onChange={(e) => handleRFCChange(e.target.value)}
                    placeholder="XAXX010101000"
                    maxLength="13"
                    className={errors.rfc ? 'border-red-500' : ''}
                  />
                  {rfcValid !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {rfcValid ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {errors.rfc && (
                  <p className="text-sm text-red-600 mt-1">{errors.rfc}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Razón Social *
                </label>
                <Input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="EMPRESA EJEMPLO S.A. DE C.V."
                  className={errors.businessName ? 'border-red-500' : ''}
                />
                {errors.businessName && (
                  <p className="text-sm text-red-600 mt-1">{errors.businessName}</p>
                )}
              </div>
            </div>

            {/* Régimen Fiscal y Tipo de Contribuyente */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Régimen Fiscal *
                </label>
                <select
                  value={formData.regime}
                  onChange={(e) => setFormData({ ...formData, regime: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.regime ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar régimen</option>
                  {taxRegimes.map(regime => (
                    <option key={regime.value} value={regime.value}>
                      {regime.value} - {regime.label}
                    </option>
                  ))}
                </select>
                {errors.regime && (
                  <p className="text-sm text-red-600 mt-1">{errors.regime}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Contribuyente *
                </label>
                <select
                  value={formData.taxpayerType}
                  onChange={(e) => setFormData({ ...formData, taxpayerType: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.taxpayerType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="fisica">Persona Física</option>
                  <option value="moral">Persona Moral</option>
                </select>
                {errors.taxpayerType && (
                  <p className="text-sm text-red-600 mt-1">{errors.taxpayerType}</p>
                )}
              </div>
            </div>

            {/* Dirección Fiscal */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Dirección Fiscal</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calle *
                  </label>
                  <Input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="Av. Insurgentes Sur"
                    className={errors.street ? 'border-red-500' : ''}
                  />
                  {errors.street && (
                    <p className="text-sm text-red-600 mt-1">{errors.street}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número Exterior *
                  </label>
                  <Input
                    type="text"
                    value={formData.exteriorNumber}
                    onChange={(e) => setFormData({ ...formData, exteriorNumber: e.target.value })}
                    placeholder="123"
                    className={errors.exteriorNumber ? 'border-red-500' : ''}
                  />
                  {errors.exteriorNumber && (
                    <p className="text-sm text-red-600 mt-1">{errors.exteriorNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número Interior
                  </label>
                  <Input
                    type="text"
                    value={formData.interiorNumber}
                    onChange={(e) => setFormData({ ...formData, interiorNumber: e.target.value })}
                    placeholder="A-101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Colonia *
                  </label>
                  <Input
                    type="text"
                    value={formData.colony}
                    onChange={(e) => setFormData({ ...formData, colony: e.target.value })}
                    placeholder="Del Valle"
                    className={errors.colony ? 'border-red-500' : ''}
                  />
                  {errors.colony && (
                    <p className="text-sm text-red-600 mt-1">{errors.colony}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal *
                  </label>
                  <Input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="03100"
                    maxLength="5"
                    className={errors.postalCode ? 'border-red-500' : ''}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad *
                  </label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ciudad de México"
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccionar estado</option>
                    {mexicoStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-sm text-red-600 mt-1">{errors.state}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Email y Facturación Automática */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email para recibir facturas *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="facturas@empresa.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableAutoInvoicing}
                  onChange={(e) => setFormData({ ...formData, enableAutoInvoicing: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Activar facturación automática</span>
                  <p className="text-sm text-gray-600">
                    Recibirás tu factura automáticamente después de cada cobro
                  </p>
                </div>
              </label>
            </div>

            {/* Constancia de Situación Fiscal */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Cargar Constancia de Situación Fiscal (Opcional)
              </p>
              <Button variant="outline" type="button">
                Seleccionar archivo PDF
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Esto nos ayudará a validar tu información fiscal más rápido
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            {initialData ? 'Guardar cambios' : 'Configurar datos'}
          </Button>
        </div>
      </div>
    </div>
  );
}
