import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  FileText,
  RefreshCw,
  DollarSign
} from 'lucide-react';
import { Button } from './ui/button';
import { invoiceDetailsData } from '../data/invoiceDetailsData';

export function InvoiceDetail({ invoice: initialInvoice, onBack }) {
  // Lista de casos disponibles
  const cases = [
    { id: 'B12345678', label: 'Caso 1: Suscripción + Adicionales', shortLabel: 'Suscr. + Adicionales' },
    { id: 'B12345642', label: 'Caso 2: Recarga de saldo', shortLabel: 'Recarga' },
    { id: 'B12345634', label: 'Caso 3: Solo adicionales', shortLabel: 'Adicionales' },
    { id: 'B12345656', label: 'Caso 4: Nota de crédito', shortLabel: 'Nota crédito' }
  ];
  
  const [currentCaseIndex, setCurrentCaseIndex] = useState(
    cases.findIndex(c => c.id === initialInvoice.invoiceNumber) || 0
  );
  const [showDropdown, setShowDropdown] = useState(false);
  
  const currentCase = cases[currentCaseIndex];
  const invoice = invoiceDetailsData[currentCase.id];
  
  // Navegación entre casos
  const goToPreviousCase = () => {
    setCurrentCaseIndex((prev) => (prev > 0 ? prev - 1 : cases.length - 1));
  };
  
  const goToNextCase = () => {
    setCurrentCaseIndex((prev) => (prev < cases.length - 1 ? prev + 1 : 0));
  };
  
  const selectCase = (index) => {
    setCurrentCaseIndex(index);
    setShowDropdown(false);
  };
  
  // Atajos de teclado
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') goToPreviousCase();
      if (e.key === 'ArrowRight') goToNextCase();
      if (e.key === 'Escape') setShowDropdown(false);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  // Cerrar dropdown al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);
  const [expandedSections, setExpandedSections] = useState({
    timeline: false,
    subscriptions: true,
    commissions: true,
    notifications: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $ MXN`;
  };

  // Obtener ícono de estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'overdue':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Obtener badge de estado
  const getStatusBadge = () => {
    const statusConfig = {
      paid: { label: 'Pagada', bg: 'bg-green-100', text: 'text-green-700' },
      pending: { label: 'Pendiente', bg: 'bg-orange-100', text: 'text-orange-700' },
      overdue: { label: 'Vencida', bg: 'bg-red-100', text: 'text-red-700' }
    };
    
    const config = statusConfig[invoice.status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Renderizar timeline de pagos
  const renderPaymentTimeline = () => {
    if (!invoice.paymentHistory || invoice.paymentHistory.length === 0) return null;

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('timeline')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Cronología de pagos</span>
          </div>
          {expandedSections.timeline ? 
            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
            <ChevronRight className="w-5 h-5 text-gray-400" />
          }
        </button>
        
        {expandedSections.timeline && (
          <div className="px-6 pb-4 border-t border-gray-100">
            {invoice.paymentHistory.map((event, index) => (
              <div key={index} className="flex items-start gap-3 py-3 first:pt-4">
                {event.icon}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date} a las {event.time}</p>
                  {event.details && (
                    <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección de suscripciones
  const renderSubscriptions = () => {
    if (!invoice.subscriptions || invoice.subscriptions.length === 0) return null;

    const subtotal = invoice.subscriptions.reduce((sum, sub) => sum + (sub.originalPrice || sub.finalPrice), 0);
    const discounts = invoice.subscriptions.reduce((sum, sub) => sum + (sub.discount || 0), 0);
    const total = subtotal - discounts;

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('subscriptions')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-medium">Suscripción ({invoice.subscriptions.length} {invoice.subscriptions.length === 1 ? 'artículo' : 'artículos'})</span>
              {expandedSections.subscriptions ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </div>
            <span className="font-medium">{formatCurrency(total)}</span>
          </div>
        </button>
        
        {expandedSections.subscriptions && (
          <div className="border-t border-gray-100">
            {invoice.subscriptions.map((subscription, index) => (
              <div key={index} className="px-6 py-4 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{subscription.name}</p>
                    {subscription.hasDiscount && (
                      <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        {subscription.discountText}
                      </div>
                    )}
                    {subscription.prorated && (
                      <p className="text-sm text-gray-500 mt-1">
                        Prorrateado: {subscription.daysCharged} de {subscription.totalDays} días
                      </p>
                    )}
                    {subscription.period && (
                      <p className="text-sm text-gray-500 mt-1">{subscription.period}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    {subscription.originalPrice !== subscription.finalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        {formatCurrency(subscription.originalPrice)}
                      </p>
                    )}
                    <p className="font-medium">{formatCurrency(subscription.finalPrice)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar comisiones
  const renderCommissions = () => {
    if (!invoice.additionalCharges?.commissions || invoice.additionalCharges.commissions.length === 0) return null;

    const total = invoice.additionalCharges.commissions.reduce((sum, com) => sum + com.amount, 0);

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('commissions')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-medium">Comisiones por venta ({invoice.additionalCharges.commissions.length} canales)</span>
              {expandedSections.commissions ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </div>
            <span className="font-medium">{formatCurrency(total)}</span>
          </div>
        </button>
        
        {expandedSections.commissions && (
          <div className="border-t border-gray-100">
            {invoice.additionalCharges.commissions.map((commission, index) => (
              <div key={index} className="px-6 py-4 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{commission.channel}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {commission.orders} órdenes • {commission.commission}% de comisión
                    </p>
                    <p className="text-sm text-gray-500">
                      Total vendido: {formatCurrency(commission.totalSales)}
                    </p>
                  </div>
                  <p className="font-medium ml-4">{formatCurrency(commission.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar notificaciones
  const renderNotifications = () => {
    if (!invoice.additionalCharges?.notifications || invoice.additionalCharges.notifications.length === 0) return null;

    const total = invoice.additionalCharges.notifications.reduce((sum, notif) => sum + notif.amount, 0);

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection('notifications')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-medium">Notificaciones adicionales ({invoice.additionalCharges.notifications.length} servicios)</span>
              {expandedSections.notifications ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </div>
            <span className="font-medium">{formatCurrency(total)}</span>
          </div>
        </button>
        
        {expandedSections.notifications && (
          <div className="border-t border-gray-100">
            {invoice.additionalCharges.notifications.map((notification, index) => (
              <div key={index} className="px-6 py-4 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{notification.type}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.exceeded} {notification.unit}s adicionales • ${notification.costPerUnit} por {notification.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      Uso total: {notification.used} de {notification.included} incluidos
                    </p>
                  </div>
                  <p className="font-medium ml-4">{formatCurrency(notification.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Calcular totales
  const calculateTotals = () => {
    let subtotal = 0;
    let discounts = 0;

    // Suscripciones
    if (invoice.subscriptions) {
      subtotal += invoice.subscriptions.reduce((sum, sub) => sum + (sub.originalPrice || sub.finalPrice), 0);
      discounts += invoice.subscriptions.reduce((sum, sub) => sum + (sub.discount || 0), 0);
    }

    // Comisiones
    if (invoice.additionalCharges?.commissions) {
      subtotal += invoice.additionalCharges.commissions.reduce((sum, com) => sum + com.amount, 0);
    }

    // Notificaciones
    if (invoice.additionalCharges?.notifications) {
      subtotal += invoice.additionalCharges.notifications.reduce((sum, notif) => sum + notif.amount, 0);
    }

    // Recarga
    if (invoice.rechargeAmount) {
      subtotal += invoice.rechargeAmount;
    }

    // Nota de crédito
    if (invoice.creditNote) {
      discounts += invoice.creditNote.creditAmount;
    }

    return { subtotal, discounts, total: subtotal - discounts };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-60">
        {/* Header con navegación de casos */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a facturas
              </Button>
              
              <Button variant="outline" className="gap-2">
                Exportar factura
              </Button>
            </div>
            
            {/* Navegación de casos */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousCase}
                className="p-2"
                title="Caso anterior (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="font-medium">{currentCase.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[300px]">
                    {cases.map((case_, index) => (
                      <button
                        key={case_.id}
                        onClick={() => selectCase(index)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          index === currentCaseIndex ? 'bg-blue-50 text-blue-600' : ''
                        } ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${
                          index === cases.length - 1 ? 'rounded-b-lg' : ''
                        }`}
                      >
                        <span className="font-medium">{case_.label}</span>
                        {index === currentCaseIndex && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextCase}
                className="p-2"
                title="Siguiente caso (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              <span className="text-sm text-gray-500 ml-4">
                {currentCaseIndex + 1} de {cases.length}
              </span>
            </div>
          </div>
          
          {/* Información de la factura */}
          <div className="px-8 pb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <h1 className="text-xl font-semibold">Factura n.° {invoice.invoiceNumber}</h1>
              {getStatusBadge()}
            </div>
            {invoice.documentType && (
              <p className="text-gray-600 ml-8 mt-2">{invoice.documentType}</p>
            )}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Información de fecha y total */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Ciclo de facturación</h2>
                <p className="text-gray-900">Esta factura se emitió el {invoice.issueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-700 mb-2">Total de la factura</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {formatCurrency(Math.abs(invoice.total))}
                </p>
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-4">
                {invoice.paymentMethod === 'VISA •••• 1234' ? (
                  <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                ) : invoice.paymentMethod.includes('American Express') ? (
                  <div className="w-16 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                    AMEX
                  </div>
                ) : (
                  <CreditCard className="w-10 h-10 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{invoice.paymentMethod}</p>
                  {invoice.cardHolder && (
                    <p className="text-sm text-gray-500">{invoice.cardHolder}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline de pagos */}
            {renderPaymentTimeline()}

            {/* Desglose */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Desglose</h2>
              
              <div className="space-y-4">
                {/* Recarga de saldo */}
                {invoice.rechargeAmount && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Recarga de saldo</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Saldo acreditado inmediatamente a tu cuenta de T1envíos
                        </p>
                      </div>
                      <p className="font-medium text-lg">{formatCurrency(invoice.rechargeAmount)}</p>
                    </div>
                  </div>
                )}

                {/* Nota de crédito */}
                {invoice.creditNote && (
                  <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-green-900">{invoice.creditNote.reason}</p>
                        <p className="text-sm text-green-700 mt-1">{invoice.creditNote.description}</p>
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-green-700">Cargo original</span>
                            <span>{formatCurrency(invoice.creditNote.originalCharge)}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-green-700">Crédito aplicado</span>
                            <span className="text-green-600">-{formatCurrency(invoice.creditNote.creditAmount)}</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t border-green-200">
                            <span>Monto neto</span>
                            <span>{formatCurrency(invoice.creditNote.netAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Suscripciones */}
                {renderSubscriptions()}

                {/* Comisiones */}
                {renderCommissions()}

                {/* Notificaciones */}
                {renderNotifications()}
              </div>

              {/* Totales */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  {totals.discounts > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Descuentos y créditos</span>
                      <span className="text-green-600">-{formatCurrency(totals.discounts)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
                    <span>Monto adeudado</span>
                    <span>{formatCurrency(Math.abs(totals.total))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
