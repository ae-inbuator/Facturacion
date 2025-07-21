import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, MoreHorizontal, ChevronLeft, ChevronRight, Download, Calendar, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

// Opciones del filtro de período
const periodOptions = [
  { label: "Últimos 7 días", value: "last_7_days" },
  { label: "Últimos 30 días", value: "last_30_days" },
  { label: "Este período (15 jul - 14 ago 2025)", value: "current_period" },
  { label: "Período anterior (15 jun - 14 jul 2025)", value: "last_period" },
  { type: "separator" },
  { label: "Agosto 2025", value: "2025-08" },
  { label: "Julio 2025", value: "2025-07" },
  { label: "Junio 2025", value: "2025-06" },
  { label: "Mayo 2025", value: "2025-05" },
  { type: "separator" },
  { label: "Últimos 3 meses", value: "last_3_months" },
  { label: "Todo 2025", value: "2025" },
  { label: "Personalizado...", value: "custom" }
];

// Opciones de estado
const statusOptions = [
  { label: "Todos", value: "all" },
  { label: "Pagada", value: "paid" },
  { label: "Pendiente", value: "pending" },
  { label: "Vencida", value: "overdue" }
];

// Opciones de servicio
const serviceOptions = [
  { label: "Todos", value: "all" },
  { label: "T1tienda", value: "t1tienda" },
  { label: "T1envíos", value: "t1envios" },
  { label: "T1pagos", value: "t1pagos" }
];

// Opciones de tipo de cargo
const chargeTypeOptions = [
  { label: "Todos", value: "all" },
  { label: "Suscripciones", value: "subscription" },
  { label: "Recargas", value: "recharge" },
  { label: "Cargos adicionales", value: "additional" },
  { label: "Mixtos", value: "mixed" },
  { label: "Notas de crédito", value: "credit_note" }
];

const invoices = [
  {
    id: '1',
    date: 'Jul 14, 2025',
    invoiceNumber: 'B12345678',
    service: 'T1tienda',
    concept: 'T1tienda - Plan Intermedio (mensual)',
    documentType: 'Factura',
    chargeType: 'subscription',
    amount: 810.44,
    status: 'paid',
    hasMultipleItems: false,
    conceptDetails: []
  },
  {
    id: '2',
    date: 'Jul 12, 2025',
    invoiceNumber: 'B12345642',
    service: 'T1',
    concept: 'Recarga de saldo T1',
    documentType: 'Recarga',
    chargeType: 'recharge',
    amount: 5000.00,
    status: 'paid',
    hasMultipleItems: false,
    conceptDetails: []
  },
  {
    id: '3',
    date: 'Jul 14, 2025',
    invoiceNumber: 'B12345634',
    service: 'Varios',
    concept: 'Planes T1 (3 mensuales)',
    documentType: 'Factura',
    chargeType: 'subscription',
    amount: 2600.00,
    status: 'paid',
    hasMultipleItems: true,
    conceptDetails: [
      { description: 'T1tienda - Plan Pro', amount: 1200.00 },
      { description: 'T1envíos - Plan Básico', amount: 800.00 },
      { description: 'T1pagos - Plan Starter', amount: 600.00 }
    ]
  },
  {
    id: '4',
    date: 'Jul 14, 2025',
    invoiceNumber: 'B12345656',
    service: 'Varios',
    concept: 'Cargos del período 15 jun - 14 jul',
    documentType: 'Factura',
    chargeType: 'additional',
    amount: 10250.00,
    status: 'paid',
    hasMultipleItems: true,
    conceptDetails: [
      { description: 'Comisiones por ventas', amount: 8234.50 },
      { description: 'Comisiones T1pagos', amount: 1892.50 },
      { description: 'WhatsApp extra (150)', amount: 45.00 },
      { description: 'SMS extra (300)', amount: 78.00 }
    ]
  },
  {
    id: '5',
    date: 'Jun 14, 2025',
    invoiceNumber: 'A67563410',
    service: 'Varios',
    concept: 'Facturación integral del período',
    documentType: 'Factura',
    chargeType: 'additional',
    amount: 15923.45,
    status: 'paid',
    hasMultipleItems: true,
    conceptDetails: [
      { description: 'Suscripciones:', amount: null, isHeader: true },
      { description: 'T1tienda - Plan Pro', amount: 1200.00 },
      { description: 'T1envíos - Plan Básico', amount: 800.00 },
      { description: 'Cargos operativos:', amount: null, isHeader: true },
      { description: 'Comisiones por ventas', amount: 8234.50 },
      { description: 'Comisiones T1pagos', amount: 3892.43 },
      { description: 'WhatsApp extra (450)', amount: 145.00 },
      { description: 'Ajustes y penalizaciones:', amount: null, isHeader: true },
      { description: 'Contracargo #4521', amount: 516.00 },
      { description: 'Contracargo #7823', amount: 423.00 },
      { description: 'Cancelación #9012', amount: 712.52 }
    ]
  },
  {
    id: '6',
    date: 'Jun 10, 2025',
    invoiceNumber: 'A67509487',
    service: 'T1pagos',
    concept: 'Comisión por contracargo - Orden #7845',
    documentType: 'Factura',
    chargeType: 'additional',
    amount: 516.00,
    status: 'overdue',
    hasMultipleItems: false,
    conceptDetails: []
  },
  {
    id: '7',
    date: 'Jun 05, 2025',
    invoiceNumber: 'A67502341',
    service: 'Varios',
    concept: 'Comisiones por contracargos (3)',
    documentType: 'Factura',
    chargeType: 'additional',
    amount: 1516.00,
    status: 'pending',
    hasMultipleItems: true,
    conceptDetails: [
      { description: 'Orden #4521', amount: 516.00 },
      { description: 'Orden #7823', amount: 500.00 },
      { description: 'Orden #9012', amount: 500.00 }
    ]
  },
  {
    id: '8',
    date: 'May 28, 2025',
    invoiceNumber: 'A67501234',
    service: 'T1',
    concept: 'Recarga de saldo T1',
    documentType: 'Recarga',
    chargeType: 'recharge',
    amount: 10000.00,
    status: 'paid',
    hasMultipleItems: false,
    conceptDetails: []
  },
  {
    id: '9',
    date: 'May 14, 2025',
    invoiceNumber: 'NC6750001',
    service: 'Varios',
    concept: 'Nota de crédito - Múltiples ajustes',
    documentType: 'Nota de crédito',
    chargeType: 'credit_note',
    amount: -1750.00,
    status: 'paid',
    hasMultipleItems: true,
    conceptDetails: [
      { description: 'Devolución orden #123', amount: -500.00 },
      { description: 'Error en cobro anterior', amount: -250.00 },
      { description: 'Compensación por servicio', amount: -1000.00 }
    ]
  },
  {
    id: '10',
    date: 'May 14, 2025',
    invoiceNumber: 'A67500123',
    service: 'Varios',
    concept: 'Suscripciones y comisiones del período',
    documentType: 'Factura',
    chargeType: 'mixed',
    amount: 4847.50,
    status: 'paid',
    hasMultipleItems: true,
    conceptDetails: [
      { description: 'Suscripciones:', amount: null, isHeader: true },
      { description: 'T1tienda - Plan Pro', amount: 1200.00 },
      { description: 'Comisiones:', amount: null, isHeader: true },
      { description: 'Ventas marketplace', amount: 2347.50 },
      { description: 'Procesamiento pagos', amount: 1300.00 }
    ]
  }
];

const statusConfig = {
  paid: {
    label: 'Pagada',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  pending: {
    label: 'Pendiente',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600'
  },
  overdue: {
    label: 'Vencida',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600'
  }
};

// Componente ConceptWithTooltip para mostrar conceptos con click
const ConceptWithTooltip = ({ concept, hasMultipleItems, conceptDetails }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const conceptRef = useRef(null);
  const tooltipRef = useRef(null);

  // Cerrar tooltip al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        conceptRef.current && 
        !conceptRef.current.contains(event.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConceptClick = (e) => {
    e.stopPropagation();
    if (hasMultipleItems) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowTooltip(!showTooltip);
    }
  };

  if (!hasMultipleItems) {
    return <span>{concept}</span>;
  }

  return (
    <div className="relative inline-block">
      <span
        ref={conceptRef}
        className="cursor-pointer"
        onClick={handleConceptClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          color: isHovered ? '#0000EE' : '#000000',
          textDecoration: 'underline',
          textDecorationStyle: 'solid',
          fontWeight: '500'
        }}
      >
        {concept}
      </span>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          ref={tooltipRef}
          className="absolute z-[100] w-72 px-4 py-3 text-sm text-white rounded-lg shadow-lg whitespace-normal"
          style={{
            backgroundColor: '#111827',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y + 10}px`
          }}
        >
          <div 
            className="absolute w-3 h-3 transform rotate-45"
            style={{
              backgroundColor: '#111827',
              top: '-6px',
              left: '20px'
            }}
          ></div>
          <div className="space-y-1">
            {conceptDetails.map((item, index) => {
              if (item.isHeader) {
                return (
                  <div key={index} className="font-semibold text-gray-300 mt-2 first:mt-0">
                    {item.description}
                  </div>
                );
              }
              return (
                <div key={index} className="flex justify-between items-start pl-3">
                  <span className="text-gray-100 flex-1">• {item.description}</span>
                  {item.amount !== null && item.amount !== undefined && (
                    <span className="text-gray-100 ml-2 whitespace-nowrap">
                      {item.amount < 0 ? '-' : ''}${Math.abs(item.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente CustomDropdown
const CustomDropdown = ({ label, value, options, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);
  
  const displayLabel = (() => {
    if (value === 'all' && selectedOption?.label === 'Todos') {
      return label;
    }
    return selectedOption?.label || label;
  })();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        className="text-sm justify-between hover:bg-gray-50 transition-colors px-3 min-w-[140px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {displayLabel}
        </span>
        <ChevronDown size={14} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-auto">
          {options.map((option, index) => {
            if (option.type === 'separator') {
              return <div key={index} className="h-px bg-gray-200 my-1" />;
            }
            
            const isSelected = option.value === value;
            
            return (
              <button
                key={option.value}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  isSelected ? 'bg-gray-50 font-medium' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Menú de acciones individuales
const ActionMenu = ({ invoice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal size={16} />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors rounded-t-lg"
            onClick={() => console.log('Descargar PDF', invoice.invoiceNumber)}
          >
            Descargar PDF
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
            onClick={() => console.log('Descargar XML', invoice.invoiceNumber)}
          >
            Descargar XML
          </button>
          <div className="h-px bg-gray-200" />
          <button
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors rounded-b-lg"
            onClick={() => console.log('Ver detalles', invoice.invoiceNumber)}
          >
            Ver detalles
          </button>
        </div>
      )}
    </div>
  );
};

export function InvoiceTable({ onInvoiceClick }) {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estados para filtros
  const [selectedPeriod, setSelectedPeriod] = useState('last_7_days');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedChargeType, setSelectedChargeType] = useState('all');

  const itemsPerPage = 10;
  
  // Filtrar facturas según los filtros activos
  const filteredInvoices = invoices.filter(invoice => {
    // Filtro de búsqueda
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      if (!invoice.invoiceNumber.toLowerCase().includes(search) &&
          !invoice.amount.toString().includes(search) &&
          !invoice.service.toLowerCase().includes(search) &&
          !invoice.concept.toLowerCase().includes(search)) {
        return false;
      }
    }
    
    // Filtro de estado
    if (selectedStatus !== 'all' && invoice.status !== selectedStatus) {
      return false;
    }
    
    // Filtro de servicio
    if (selectedService !== 'all' && invoice.service.toLowerCase() !== selectedService) {
      return false;
    }
    
    // Filtro de tipo de cargo
    if (selectedChargeType !== 'all' && invoice.chargeType !== selectedChargeType) {
      return false;
    }
    
    return true;
  });
  
  const totalItems = 23456; // Este sería el total real de la base de datos
  const totalFilteredItems = filteredInvoices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(new Set(filteredInvoices.map(invoice => invoice.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === filteredInvoices.length);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Facturas emitidas</h3>
          <span className="text-sm text-gray-500">
            {totalItems.toLocaleString()} comprobantes disponibles
          </span>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Búsqueda por folio, concepto, servicio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2"
          />
        </div>

        {/* Filtros y acciones */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            <CustomDropdown
              label="Período"
              value={selectedPeriod}
              options={periodOptions}
              onChange={setSelectedPeriod}
            />
            
            <CustomDropdown
              label="Servicio"
              value={selectedService}
              options={serviceOptions}
              onChange={setSelectedService}
            />
            
            <CustomDropdown
              label="Estado"
              value={selectedStatus}
              options={statusOptions}
              onChange={setSelectedStatus}
            />
            
            <CustomDropdown
              label="Tipo"
              value={selectedChargeType}
              options={chargeTypeOptions}
              onChange={setSelectedChargeType}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Botón de descarga masiva cuando hay selección */}
            {selectedItems.size > 0 ? (
              <>
                <span className="text-sm text-gray-500">
                  {selectedItems.size} {selectedItems.size === 1 ? 'seleccionada' : 'seleccionadas'}
                </span>
                <div className="h-5 w-px bg-gray-300" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Descargar PDFs', selectedItems)}
                  className="text-sm"
                >
                  Descargar PDFs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Descargar XMLs', selectedItems)}
                  className="text-sm"
                >
                  Descargar XMLs
                </Button>
              </>
            ) : (
              <Button variant="outline">
                Exportar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 w-10">
                  <Checkbox 
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Fecha de emisión
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Número de factura
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  Concepto de facturación
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Estado del pago
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Total facturado
                </th>
                <th className="text-left py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const statusInfo = statusConfig[invoice.status];
                const isSelected = selectedItems.has(invoice.id);
                const isClickable = index < 4; // Solo las primeras 4 son clickeables
                
                return (
                  <tr 
                    key={invoice.id} 
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectItem(invoice.id, checked)}
                      />
                    </td>
                    <td className="py-4 px-4 text-sm">{invoice.date}</td>
                    <td className="py-4 px-4 text-sm">
                      {isClickable ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onInvoiceClick && onInvoiceClick(invoice.invoiceNumber);
                          }}
                          className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                        >
                          {invoice.invoiceNumber}
                        </a>
                      ) : (
                        <span className="font-medium">{invoice.invoiceNumber}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <ConceptWithTooltip 
                        concept={invoice.concept}
                        hasMultipleItems={invoice.hasMultipleItems}
                        conceptDetails={invoice.conceptDetails}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium">
                      {invoice.amount < 0 ? '-' : ''}${Math.abs(invoice.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <ActionMenu invoice={invoice} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              En total {totalItems.toLocaleString()} registro(s)
            </div>
            
            <div className="flex items-center gap-4">
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                >
                  <ChevronLeft size={16} />
                </Button>
                
                {[1, 2, 3, 4, 5, 6].map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    className={currentPage === page ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                
                <span className="text-gray-400">...</span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>

              {/* Items per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">10 registros / página</span>
                <ChevronDown size={14} />
              </div>

              {/* Jump to page */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Saltar a página</span>
                <Input 
                  type="number" 
                  min="1" 
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages))}
                  className="w-16 h-8 text-center text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
