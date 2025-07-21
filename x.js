import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  ChevronDown, 
  CheckCircle, 
  XCircle, 
  Clock,
  ShoppingBag,
  Package,
  CreditCard,
  MessageCircle,
  Mail,
  AlertCircle,
  Calendar,
  FileText
} from 'lucide-react';
import { Button } from './ui/button';

export function InvoiceDetail({ invoice, onBack }) {
  // Función para renderizar el timeline de cobro
  const renderPaymentTimeline = () => {
    if (!invoice.paymentAttempts || invoice.paymentAttempts.length === 0) return null;

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Historial de cobro</h3>
        <div className="relative">
          {invoice.paymentAttempts.map((attempt, index) => (
            <div key={index} className="flex items-start gap-4 mb-4 last:mb-0">
              <div className="relative">
                {attempt.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                {index < invoice.paymentAttempts.length - 1 && (
                  <div className="absolute top-6 left-2.5 w-0.5 h-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {attempt.status === 'success' ? 'Cobro exitoso' : 'Cobro fallido'}
                </div>
                <div className="text-xs text-gray-500">{attempt.date} a las {attempt.time}</div>
                {attempt.message && (
                  <div className="text-xs text-gray-600 mt-1">{attempt.message}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Función para renderizar desglose de suscripciones
  const renderSubscriptionBreakdown = () => {
    if (!invoice.subscriptions || invoice.subscriptions.length === 0) return null;

    const subtotal = invoice.subscriptions.reduce((sum, sub) => sum + sub.finalPrice, 0);
    const discount = invoice.subscriptions.reduce((sum, sub) => sum + (sub.discount || 0), 0);

    return (
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          SUSCRIPCIONES
        </h3>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {invoice.subscriptions.map((subscription, index) => (
            <div key={index} className="p-6 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{subscription.name}</h4>
                  {subscription.prorated && (
                    <p className="text-sm text-gray-500 mt-1">
                      Prorrateado: {subscription.daysCharged} de {subscription.totalDays} días
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {subscription.originalPrice !== subscription.finalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      ${subscription.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-xl font-semibold">
                    ${subscription.finalPrice.toLocaleString()}
                  </div>
                </div>
              </div>
              {subscription.hasDiscount && (
                <span className="inline-block bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
                  {subscription.discountText}
                </span>
              )}
            </div>
          ))}
          
          {/* Resumen */}
          <div className="bg-gray-50 p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${(subtotal + discount).toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuentos</span>
                  <span className="text-green-600">-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total suscripciones</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Función para renderizar desglose de adicionales
  const renderAdditionalCharges = () => {
    if (!invoice.additionalCharges) return null;

    const { commissions, notifications } = invoice.additionalCharges;
    const totalCommissions = commissions?.reduce((sum, com) => sum + com.amount, 0) || 0;
    const totalNotifications = notifications?.reduce((sum, notif) => sum + notif.amount, 0) || 0;

    return (
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          CARGOS ADICIONALES
        </h3>

        {/* Aviso si se cobró por límite */}
        {invoice.chargedByLimit && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-900">
                Cobro automático por límite alcanzado
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Alcanzaste tu límite de crédito de ${invoice.creditLimit?.toLocaleString()}, 
                por lo que se procesó el cobro automáticamente.
              </p>
            </div>
          </div>
        )}

        {/* Comisiones */}
        {commissions && commissions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Comisiones por ventas</h4>
            <div className="grid gap-3">
              {commissions.map((commission, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => alert(`Ver detalle de órdenes de ${commission.channel}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${commission.iconBg}`}>
                        {commission.icon}
                      </div>
                      <div>
                        <h5 className="font-medium">{commission.channel}</h5>
                        <p className="text-xs text-gray-500">
                          {commission.orders} órdenes • {commission.commission}% comisión
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${commission.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        de ${commission.totalSales.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notificaciones */}
        {notifications && notifications.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Notificaciones adicionales</h4>
            <div className="grid gap-3">
              {notifications.map((notification, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.iconBg}`}>
                        {notification.icon}
                      </div>
                      <div>
                        <h5 className="font-medium">{notification.type}</h5>
                        <p className="text-xs text-gray-500">
                          ${notification.costPerUnit} por {notification.unit}
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold">${notification.amount.toLocaleString()}</div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Usado: {notification.used.toLocaleString()} de {notification.included.toLocaleString()}</span>
                      <span className="text-orange-600 font-medium">
                        +{notification.exceeded.toLocaleString()} extra
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${Math.min((notification.used / notification.included) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resumen de adicionales */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Comisiones</span>
              <span>${totalCommissions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Notificaciones</span>
              <span>${totalNotifications.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t">
              <span>Total adicionales</span>
              <span>${(totalCommissions + totalNotifications).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Función para renderizar información fiscal
  const renderFiscalInfo = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Información fiscal</h3>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Emisor</h4>
          <p className="text-sm font-medium">{invoice.fiscal.issuer.name}</p>
          <p className="text-sm text-gray-600">RFC: {invoice.fiscal.issuer.rfc}</p>
          <p className="text-sm text-gray-600">{invoice.fiscal.issuer.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Receptor</h4>
          <p className="text-sm font-medium">{invoice.fiscal.receiver.name}</p>
          <p className="text-sm text-gray-600">RFC: {invoice.fiscal.receiver.rfc}</p>
          <p className="text-sm text-gray-600">{invoice.fiscal.receiver.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-xs text-gray-500">Forma de pago</p>
          <p className="text-sm font-medium">{invoice.fiscal.paymentMethod}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Método de pago</p>
          <p className="text-sm font-medium">{invoice.fiscal.paymentType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Uso de CFDI</p>
          <p className="text-sm font-medium">{invoice.fiscal.cfdiUse}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Folio fiscal</p>
          <p className="text-sm font-medium">{invoice.fiscal.fiscalFolio}</p>
        </div>
      </div>

      {/* Desglose fiscal */}
      <div className="mt-6 pt-4 border-t">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>${invoice.fiscal.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">IVA (16%)</span>
            <span>${invoice.fiscal.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t">
            <span>Total</span>
            <span>${invoice.fiscal.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const getStatusBadge = () => {
    const statusConfig = {
      paid: { label: 'Pagada', bg: 'bg-green-50', text: 'text-green-600', icon: <CheckCircle className="w-4 h-4" /> },
      pending: { label: 'Pendiente', bg: 'bg-orange-50', text: 'text-orange-600', icon: <Clock className="w-4 h-4" /> },
      overdue: { label: 'Vencida', bg: 'bg-red-50', text: 'text-red-600', icon: <XCircle className="w-4 h-4" /> }
    };
    
    const config = statusConfig[invoice.status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-60">
        {/* Header fijo */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="px-8 py-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a facturas
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar factura
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-8">
          {/* Información principal */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Factura {invoice.invoiceNumber}
                </h1>
                <p className="text-lg text-gray-600">{invoice.documentType}</p>
              </div>
              {getStatusBadge()}
            </div>

            <div className="text-5xl font-bold text-gray-900 mb-8">
              ${invoice.total.toLocaleString()}
              <span className="text-2xl font-normal text-gray-500"> MXN</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  Fecha de emisión
                </div>
                <p className="font-medium">{invoice.issueDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FileText className="w-4 h-4" />
                  Período facturado
                </div>
                <p className="font-medium">{invoice.billingPeriod}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <CreditCard className="w-4 h-4" />
                  Método de pago
                </div>
                <p className="font-medium">{invoice.paymentMethod}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  Próximo corte
                </div>
                <p className="font-medium">{invoice.nextCutDate}</p>
              </div>
            </div>
          </div>

          {/* Timeline de cobro (si aplica) */}
          {renderPaymentTimeline()}

          {/* Caso especial: Recarga de saldo */}
          {invoice.rechargeAmount && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4">Detalle de la recarga</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Recarga de saldo para T1envíos</p>
                  <p className="text-sm text-gray-500 mt-1">El saldo se acreditó inmediatamente a tu cuenta</p>
                </div>
                <div className="text-2xl font-semibold">
                  ${invoice.rechargeAmount.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Caso especial: Nota de crédito */}
          {invoice.creditNote && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Detalle de la nota de crédito</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-green-900">{invoice.creditNote.reason}</p>
                  <p className="text-sm text-green-700 mt-1">{invoice.creditNote.description}</p>
                </div>
                <div className="pt-3 border-t border-green-200">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-700">Cargo original</span>
                    <span className="font-medium">${invoice.creditNote.originalCharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-700">Crédito aplicado</span>
                    <span className="font-medium text-green-600">-${invoice.creditNote.creditAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-green-200">
                    <span>Monto neto pagado</span>
                    <span>${invoice.creditNote.netAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desglose de conceptos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderSubscriptionBreakdown()}
              {renderAdditionalCharges()}
            </div>
            
            <div className="lg:col-span-1">
              {renderFiscalInfo()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
