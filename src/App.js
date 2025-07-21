import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { BillingCard } from './components/BillingCard';
import { PaymentMethod } from './components/PaymentMethod';
import { InvoiceTable } from './components/InvoiceTable';
import { AdditionalChargesDetail } from './components/AdditionalChargesDetail';
import { InvoiceDetail } from './components/InvoiceDetail';
import { InvoiceData } from './components/InvoiceData';
import { PlanDetails } from './components/PlanDetails';
import { PaymentStatus } from './components/PaymentStatus';
import { CommissionDetail } from './components/CommissionDetail';
import ChangePaymentMethodModal from './components/ChangePaymentMethodModal';
import { invoiceDetailsData } from './data/invoiceDetailsData';

export default function App() {
  const [showAdditionalChargesDetail, setShowAdditionalChargesDetail] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [hasInvoiceData, setHasInvoiceData] = useState(false); // Toggle para desarrollo
  const [paymentFailure, setPaymentFailure] = useState(null); // null o {type, daysRemaining, amount}
  const [showChangePaymentModal, setShowChangePaymentModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null); // Para CommissionDetail

  const handleAdditionalChargesClick = () => {
    setShowAdditionalChargesDetail(true);
  };

  const handleBackFromDetail = () => {
    setShowAdditionalChargesDetail(false);
  };

  const handleInvoiceClick = (invoiceNumber) => {
    // Para el detalle, solo necesitamos pasar el número/ID
    const invoice = invoiceDetailsData[invoiceNumber];
    if (invoice) {
      setSelectedInvoice(invoiceNumber);
    }
  };

  const handleBackFromInvoice = () => {
    setSelectedInvoice(null);
  };

  const handlePlanDetailsClick = () => {
    setShowPlanDetails(true);
  };

  const handleBackFromPlanDetails = () => {
    setShowPlanDetails(false);
  };

  const handleChangePaymentMethod = () => {
    setShowChangePaymentModal(true);
  };
  
  // Registrar callbacks globales
  React.useEffect(() => {
    // Callback para clicks en comisiones
    window.onCommissionClick = (channel) => {
      // Limpiar la vista de factura antes de mostrar comisiones
      setSelectedInvoice(null);
      setSelectedCommission({ channel });
    };
    
    // Callback para abrir modal de cambio de método de pago
    window.openChangePaymentModal = () => {
      setShowChangePaymentModal(true);
    };
    
    return () => {
      delete window.onCommissionClick;
      delete window.openChangePaymentModal;
    };
  }, []);

  if (showAdditionalChargesDetail) {
    return (
      <>
        <Sidebar />
        <AdditionalChargesDetail onBack={handleBackFromDetail} />
      </>
    );
  }
  
  // Verificar CommissionDetail antes que InvoiceDetail para prioridad correcta
  if (selectedCommission) {
    return (
      <>
        <Sidebar />
        <CommissionDetail 
          channel={selectedCommission.channel}
          totalCommission={0} // Estos valores se podrían pasar desde la factura
          orders={0}
          onBack={() => setSelectedCommission(null)}
        />
      </>
    );
  }

  if (selectedInvoice) {
    return (
      <>
        <Sidebar />
        <InvoiceDetail invoice={selectedInvoice} onBack={handleBackFromInvoice} />
      </>
    );
  }

  if (showPlanDetails) {
    return (
      <>
        <Sidebar />
        <PlanDetails onBack={handleBackFromPlanDetails} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-60 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-semibold text-gray-900">Facturación</h1>
                {/* Badge sutil cuando está al corriente */}
                {!paymentFailure && (
                  <div className="inline-flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-dot-pulse"></div>
                    <span className="text-xs text-gray-500">Al corriente</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-lg mt-2">Gestiona tus facturas, métodos de pago y suscripciones</p>
            </div>
            {/* Toggles temporales para desarrollo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasInvoiceData(!hasInvoiceData)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {hasInvoiceData ? '👤 Con datos fiscales' : '❌ Sin datos fiscales'}
              </button>
              <select
                value={paymentFailure?.type || 'none'}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'none') {
                    setPaymentFailure(null);
                  } else if (value === 'subscription_failed') {
                    setPaymentFailure({
                      type: 'subscription_failed',
                      daysRemaining: 5,
                      suspensionDate: '22 de julio, 2025'
                    });
                  } else if (value === 'subscription_failed_grace') {
                    // Caso especial: Período de gracia (2 días)
                    setPaymentFailure({
                      type: 'subscription_failed',
                      daysRemaining: 2,
                      suspensionDate: '17 de julio, 2025'
                    });
                  } else if (value === 'additional_charges_failed') {
                    setPaymentFailure({
                      type: 'additional_charges_failed',
                      amount: '$650'
                    });
                  } else if (value === 'services_suspended') {
                    setPaymentFailure({
                      type: 'services_suspended',
                      daysRemaining: 0
                    });
                  }
                }}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                <option value="none">✅ Al corriente</option>
                <option value="subscription_failed">🔴 Suscripción fallida</option>
                <option value="subscription_failed_grace">🔴 Período de gracia (2 días)</option>
                <option value="additional_charges_failed">🟡 Cargos adicionales fallidos</option>
                <option value="services_suspended">⛔ Servicios suspendidos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Status Alert - Mostrar según tipo de fallo */}
        {paymentFailure && (
          <div className={`mb-${paymentFailure.type === 'subscription_failed' || paymentFailure.type === 'services_suspended' ? '6' : '4'}`}>
            <PaymentStatus 
              failureType={paymentFailure.type}
              daysRemaining={paymentFailure.daysRemaining}
              amount={paymentFailure.amount}
              suspensionDate={paymentFailure.suspensionDate}
              onAction={handleChangePaymentMethod}
            />
          </div>
        )}

        {/* Billing Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <BillingCard
            title="Cargos adicionales"
            amount={650}
            tooltip="Incluye comisiones por ventas en tu tienda y marketplaces, más cargos por notificaciones adicionales (WhatsApp, Email, SMS). Se cobran automáticamente al alcanzar tu límite de crédito o en tu fecha de corte mensual."
            description="Se cobra el 15 de agosto o al alcanzar $8,000. Te quedan $7,350."
            link={{
              text: "Ver desglose detallado",
              href: "#"
            }}
            onClick={handleAdditionalChargesClick}
            isClickable={true}
          />
          <BillingCard
            title="Cargos por planes y suscripciones"
            amount={800}
            tooltip="Total de todos tus planes activos de T1 (tienda, envíos, pagos, etc.). Este monto se cobra automáticamente cada mes en tu fecha de corte establecida."
            description="Tienes 2 planes activos. Próximo cobro: 15 de agosto, 2025"
            link={{
              text: "Ver detalle de planes",
              href: "#"
            }}
            onClick={handlePlanDetailsClick}
            isClickable={true}
          />
        </div>

        {/* Payment Method */}
        <PaymentMethod
          cardType="VISA"
          cardNumber="4••• •••• •••• 1234"
          cardHolderName="Chicco Ole"
          nextChargeDate="15 de agosto, 2025"
          nextChargeAmount="$1,450.00"
          paymentStatus={paymentFailure ? 'failed' : 'upToDate'}
          onChangeMethod={handleChangePaymentMethod}
        />

        {/* Invoice Data */}
        <InvoiceData 
          hasData={hasInvoiceData} 
          onConfigureClick={() => setHasInvoiceData(true)}
        />

        {/* Invoice Table */}
        <InvoiceTable onInvoiceClick={handleInvoiceClick} hasFiscalData={hasInvoiceData} />
      </div>

      {/* Modals */}
      {showChangePaymentModal && (
        <ChangePaymentMethodModal
          isOpen={showChangePaymentModal}
          onClose={() => setShowChangePaymentModal(false)}
          onUpdate={(selectedMethod, shouldProcessNow) => {
            console.log('Método actualizado:', selectedMethod, 'Procesar ahora:', shouldProcessNow);
            // Aquí irían las llamadas a la API
            setShowChangePaymentModal(false);
            
            // Si se procesó exitosamente, limpiar el estado de fallo
            if (shouldProcessNow && paymentFailure) {
              setPaymentFailure(null);
            }
          }}
          currentPaymentMethod={{ id: 'card-1' }}
          savedCards={[
            {
              id: 'card-1',
              brand: 'VISA',
              last4: '1234',
              expiryMonth: '12',
              expiryYear: '2026',
              name: 'Chicco Ole'
            },
            {
              id: 'card-2', 
              brand: 'Mastercard',
              last4: '5678',
              expiryMonth: '03',
              expiryYear: '2025',
              name: 'Chicco Ole'
            }
          ]}
          pendingCharges={paymentFailure ? 650 : 0}
        />
      )}
    </div>
  );
}
