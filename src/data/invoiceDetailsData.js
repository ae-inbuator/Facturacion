import React from 'react';
import { ShoppingBag, MessageCircle, Mail, CheckCircle, XCircle, AlertCircle, RefreshCw, CreditCard, DollarSign, Clock } from 'lucide-react';

// Datos mock para los 4 tipos de factura
export const invoiceDetailsData = {
  // Caso 0: Factura EN CURSO (periodo actual)
  'PENDIENTE': {
    id: '0',
    invoiceNumber: 'Por generar',
    documentType: 'Período en curso - Se está acumulando',
    status: 'in_progress',
    total: 3247.50,
    issueDate: null,
    billingPeriod: '15 jul - 14 ago 2025',
    paymentMethod: 'VISA •••• 1234',
    cardHolder: 'Chicco Ole',
    nextCutDate: '15 ago 2025',
    inProgress: true,
    
    // Cronología para periodo en curso
    paymentHistory: [
      {
        icon: <Clock className="w-5 h-5 text-blue-500 clock-pulse" />,
        title: 'Período en curso',
        date: 'Actualizado hace 5 minutos',
        time: '',
        details: 'Los cargos se están acumulando en tiempo real'
      },
      {
        icon: <DollarSign className="w-5 h-5 text-gray-400" />,
        title: 'Inicio del período',
        date: '15 jul 2025',
        time: '00:00',
        details: 'Comenzó el nuevo ciclo de facturación'
      }
    ],
    
    // Suscripciones programadas
    subscriptions: [
      {
        name: 'T1tienda - Plan Intermedio',
        originalPrice: 800,
        finalPrice: 800,
        discount: 0,
        hasDiscount: false,
        period: 'Se cobrará el 15 de agosto',
        scheduled: true
      },
      {
        name: 'T1envíos - Plan Básico',
        originalPrice: 1000,
        finalPrice: 1000,
        discount: 0,
        hasDiscount: false,
        period: 'Se cobrará el 15 de agosto',
        scheduled: true
      }
    ],
    
    // Cargos acumulados hasta ahora
    additionalCharges: {
      commissions: [
        {
          channel: 'Tienda en línea',
          icon: <ShoppingBag className="w-5 h-5" />,
          orders: 12,
          commission: 2.5,
          totalSales: 49380,
          amount: 1234.50,
          live: true
        },
        {
          channel: 'T1pagos',
          icon: <CreditCard className="w-5 h-5" />,
          orders: 8,
          commission: 4.5,
          totalSales: 4733.33,
          amount: 213.00,
          live: true
        }
      ],
      notifications: [
        {
          type: 'WhatsApp',
          icon: <MessageCircle className="w-5 h-5" />,
          used: 245,
          included: 500,
          exceeded: 0,
          costPerUnit: 0.30,
          unit: 'mensaje',
          amount: 0,
          live: true
        }
      ]
    },
    
    // Indicador especial para mostrar que es en vivo
    liveIndicator: {
      show: true,
      text: 'Los montos se actualizan en tiempo real',
      lastUpdate: 'Hace 5 minutos'
    }
  },
  
  // Caso 1: Suscripción + Adicionales (más común)
  'B12345678': {
    id: '1',
    invoiceNumber: 'B12345678',
    documentType: 'Mi tienda tiene cargos en esta factura',
    status: 'paid',
    total: 810.44,
    issueDate: '9 jul 2025',
    billingPeriod: '15 jun - 14 jul 2025',
    paymentMethod: 'VISA •••• 1234',
    cardHolder: 'Chicco Ole',
    nextCutDate: '15 ago 2025',
    
    // Cronología de pagos
    paymentHistory: [
      {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        title: 'Pago exitoso',
        date: '15 jul 2025',
        time: '10:23',
        details: 'Se procesó el cargo automático mensual'
      },
      {
        icon: <DollarSign className="w-5 h-5 text-gray-400" />,
        title: 'Factura emitida',
        date: '15 jul 2025',
        time: '00:00',
        details: 'Factura generada por el sistema'
      }
    ],
    
    // Suscripciones
    subscriptions: [
      {
        name: 'T1tienda - Plan Intermedio',
        originalPrice: 599,
        finalPrice: 479.20,
        discount: 119.80,
        hasDiscount: true,
        discountText: '20% descuento primer mes',
        period: 'Del 15 jul al 14 ago 2025',
        prorated: false
      },
      {
        name: 'T1envíos - Plan Pro',
        originalPrice: 299,
        finalPrice: 199,
        discount: 100,
        hasDiscount: false,
        prorated: true,
        daysCharged: 20,
        totalDays: 30,
        period: 'Del 25 jul al 14 ago 2025'
      }
    ],
    
    // Cargos adicionales
    additionalCharges: {
      commissions: [
        {
          channel: 'Tienda en línea',
          icon: <ShoppingBag className="w-5 h-5" />,
          orders: 8,
          commission: 2.5,
          totalSales: 4500,
          amount: 112.50
        },
        {
          channel: 'Mercado Libre',
          icon: <div className="font-semibold text-sm">ML</div>,
          orders: 5,
          commission: 3.0,
          totalSales: 1500,
          amount: 45.00
        }
      ],
      notifications: [
        {
          type: 'WhatsApp',
          icon: <MessageCircle className="w-5 h-5" />,
          used: 650,
          included: 500,
          exceeded: 150,
          costPerUnit: 0.30,
          unit: 'mensaje',
          amount: 45.00
        }
      ]
    }
  },
  
  // Caso 2: Recarga de saldo (simple)
  'B12345642': {
    id: '2',
    invoiceNumber: 'B12345642',
    documentType: 'Recarga de saldo para T1envíos',
    status: 'paid',
    total: 2834.99,
    issueDate: '9 jul 2025',
    paymentMethod: 'VISA •••• 1234',
    cardHolder: 'Chicco Ole',
    
    // Cronología de pagos para recarga
    paymentHistory: [
      {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        title: 'Saldo acreditado',
        date: '9 jul 2025',
        time: '14:45',
        details: 'El saldo se agregó exitosamente a tu cuenta'
      },
      {
        icon: <CreditCard className="w-5 h-5 text-blue-500" />,
        title: 'Pago procesado',
        date: '9 jul 2025',
        time: '14:44',
        details: 'Autorización bancaria completada'
      },
      {
        icon: <DollarSign className="w-5 h-5 text-gray-400" />,
        title: 'Recarga solicitada',
        date: '9 jul 2025',
        time: '14:44',
        details: 'Iniciaste una recarga de saldo manual'
      }
    ],
    
    // Solo recarga (monto sin IVA, el sistema calculará el IVA)
    rechargeAmount: 2443.96
  },
  
  // Caso 3: Adicionales solos (cobrado por límite)
  'B12345634': {
    id: '3',
    invoiceNumber: 'B12345634',
    documentType: 'Cobro automático por límite de crédito',
    status: 'paid',
    total: 231.60,
    issueDate: '8 jul 2025',
    paymentMethod: 'VISA •••• 1234',
    cardHolder: 'Chicco Ole',
    
    // Timeline con intentos fallidos
    paymentHistory: [
      {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        title: 'Pago exitoso',
        date: '8 jul 2025',
        time: '18:30',
        details: 'Cobro procesado exitosamente en el tercer intento'
      },
      {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        title: 'Segundo intento fallido',
        date: '8 jul 2025',
        time: '16:15',
        details: 'Error: Fondos insuficientes'
      },
      {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        title: 'Primer intento fallido',
        date: '8 jul 2025',
        time: '14:30',
        details: 'Error: Tarjeta declinada por el banco'
      },
      {
        icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
        title: 'Límite de crédito alcanzado',
        date: '8 jul 2025',
        time: '14:28',
        details: 'Se alcanzó el límite de $8,000 MXN'
      }
    ],
    
    // Solo cargos adicionales
    additionalCharges: {
      commissions: [
        {
          channel: 'Tienda en línea',
          orders: 4,
          commission: 2.5,
          totalSales: 2000,
          amount: 50.00
        }
      ],
      notifications: [
        {
          type: 'Email',
          used: 3500,
          included: 2000,
          exceeded: 1500,
          costPerUnit: 0.05,
          unit: 'correo',
          amount: 75.00
        },
        {
          type: 'WhatsApp',
          used: 800,
          included: 500,
          exceeded: 300,
          costPerUnit: 0.30,
          unit: 'mensaje',
          amount: 90.00
        }
      ]
    }
  },
  
  // Caso 4: Nota de crédito (documento tipo nota de crédito)
  'B12345656': {
    id: '4',
    invoiceNumber: 'B12345656',
    documentType: 'Nota de crédito',
    status: 'credit_note',
    total: -10250.00,
    issueDate: '1 jul 2025',
    paymentMethod: 'Ajuste en cuenta',
    
    // Información específica de la nota de crédito
    creditNoteInfo: {
      folio: 'NC-2025-0001',
      issueDate: '1 jul 2025',
      relatedInvoice: 'B12345655',
      amount: 10250.00,
      reason: 'Ajuste por cambio de plan'
    },
    
    // Timeline para nota de crédito
    paymentHistory: [
      {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        title: 'Crédito aplicado a tu cuenta',
        date: '1 jul 2025',
        time: '12:00',
        details: 'Se aplicó un crédito de $10,250.00 MXN a tu cuenta'
      },
      {
        icon: <RefreshCw className="w-5 h-5 text-blue-500" />,
        title: 'Cambio de plan procesado',
        date: '1 jul 2025',
        time: '11:58',
        details: 'Cambio de Plan Enterprise mensual a anual'
      },
      {
        icon: <DollarSign className="w-5 h-5 text-gray-400" />,
        title: 'Solicitud de cambio de plan',
        date: '1 jul 2025',
        time: '11:55',
        details: 'Solicitaste cambiar a facturación anual'
      }
    ],
    
    // No mostramos el recuadro verde para la nota de crédito en sí
    
    subscriptions: [
      {
        name: 'T1pagos - Plan Enterprise Anual',
        originalPrice: 14400,
        finalPrice: 12000,
        discount: 2400,
        hasDiscount: true,
        discountText: '2 meses gratis',
        period: 'Del 1 jul 2025 al 30 jun 2026',
        annual: true
      }
    ]
  },
  
  // Caso 5: Factura con nota de crédito aplicada
  'B12345657': {
    id: '5',
    invoiceNumber: 'B12345657',
    documentType: 'Factura con ajuste aplicado',
    status: 'paid',
    total: 800.00,
    issueDate: '15 jul 2025',
    billingPeriod: '15 jul - 14 ago 2025',
    paymentMethod: 'VISA •••• 1234',
    cardHolder: 'Chicco Ole',
    
    // Cronología de pagos
    paymentHistory: [
      {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        title: 'Pago exitoso',
        date: '15 jul 2025',
        time: '10:23',
        details: 'Se procesó el cargo automático mensual con descuento aplicado'
      },
      {
        icon: <DollarSign className="w-5 h-5 text-gray-400" />,
        title: 'Factura emitida',
        date: '15 jul 2025',
        time: '00:00',
        details: 'Factura generada con nota de crédito NC-2025-0001 aplicada'
      }
    ],
    
    // Nota de crédito aplicada
    creditNoteApplied: {
      folio: 'NC-2025-0001',
      reason: 'Ajuste por nota de crédito aplicado',
      description: 'Descuento aplicado por nota de crédito vinculada a factura pagada anteriormente',
      originalCharge: 1000.00,
      creditAmount: 200.00,
      netAmount: 800.00
    },
    
    // Suscripciones
    subscriptions: [
      {
        name: 'T1tienda - Plan Básico',
        originalPrice: 1000,
        finalPrice: 800,
        discount: 200,
        hasDiscount: false,
        period: 'Del 15 jul al 14 ago 2025',
        creditApplied: true
      }
    ]
  }
};
