import React from 'react';
import { ArrowLeft, ShoppingBag, Package, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function AdditionalChargesDetail({ onBack }) {
  const commissionChannels = [
    {
      id: 'online-store',
      name: 'Tienda en línea',
      icon: <ShoppingBag className="w-5 h-5" />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      amount: 320.00,
      orders: 16,
      commission: 2.5,
      totalSales: 12800.00,
      percentage: 49.2
    },
    {
      id: 'mercadolibre',
      name: 'Mercado Libre',
      icon: <div className="font-semibold text-sm">ML</div>,
      iconBg: 'bg-yellow-300',
      iconColor: 'text-gray-900',
      amount: 180.00,
      orders: 12,
      commission: 3.0,
      totalSales: 6000.00,
      percentage: 27.7
    },
    {
      id: 'amazon',
      name: 'Amazon',
      icon: <div className="font-semibold text-white">A</div>,
      iconBg: 'bg-orange-500',
      iconColor: 'text-white',
      amount: 90.00,
      orders: 6,
      commission: 3.0,
      totalSales: 3000.00,
      percentage: 13.8
    }
  ];

  const notifications = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      amount: 45.00,
      exceeded: 150,
      costPerUnit: 0.30,
      used: 650,
      included: 500,
      usagePercentage: 130
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      amount: 15.00,
      exceeded: 300,
      costPerUnit: 0.05,
      used: 2300,
      included: 2000,
      usagePercentage: 115
    }
  ];

  const totalCommissions = commissionChannels.reduce((sum, channel) => sum + channel.amount, 0);
  const totalNotifications = notifications.reduce((sum, notif) => sum + notif.amount, 0);
  const totalAmount = totalCommissions + totalNotifications;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-60 p-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Desglose de cargos adicionales
          </h1>
          <p className="text-gray-500 text-lg">
            Detalle completo de comisiones y servicios adicionales
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-7 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">Resumen del período</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Período actual</div>
              <div className="text-base font-medium">15 jul - 14 ago 2025</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Días transcurridos</div>
              <div className="text-base font-medium">3 de 30 días</div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total acumulado</span>
              <span className="text-2xl font-semibold">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Commissions Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            COMISIONES POR VENTAS
          </h3>
          <div className="grid gap-4">
            {commissionChannels.map((channel) => (
              <div 
                key={channel.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => alert(`Redirigiendo a detalle de órdenes de ${channel.name}...`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${channel.iconBg} ${channel.iconColor}`}>
                      {channel.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{channel.name}</h4>
                  </div>
                  <span className="text-xl font-semibold">${channel.amount.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Ventas</div>
                    <div className="text-sm font-medium">{channel.orders} órdenes</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Comisión</div>
                    <div className="text-sm font-medium">{channel.commission}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Total vendido</div>
                    <div className="text-sm font-medium">${channel.totalSales.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">% del total</div>
                    <div className="text-sm font-medium">{channel.percentage}%</div>
                  </div>
                </div>
                
                <a className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  Ver todas las órdenes →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            NOTIFICACIONES ADICIONALES
          </h3>
          <div className="grid gap-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.iconBg} ${notification.iconColor}`}>
                      {notification.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{notification.name}</h4>
                  </div>
                  <span className="text-xl font-semibold">${notification.amount.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Excedente</div>
                    <div className="text-sm font-medium">{notification.exceeded} {notification.id === 'whatsapp' ? 'mensajes' : 'correos'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Costo por {notification.id === 'whatsapp' ? 'mensaje' : 'correo'}</div>
                    <div className="text-sm font-medium">${notification.costPerUnit}</div>
                  </div>
                </div>
                
                <div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full ${notification.usagePercentage > 100 ? 'bg-orange-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(notification.usagePercentage, 100)}%` }}
                    />
                  </div>
                  <p className={`text-xs ${notification.usagePercentage > 100 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {notification.used} de {notification.included} {notification.id === 'whatsapp' ? 'mensajes' : 'correos'} incluidos ({notification.exceeded} adicionales)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-orange-700 mb-2">
            ¿Cómo se calculan estos cargos?
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Los cargos adicionales se acumulan desde tu último corte mensual (15 de julio). 
            Se cobrarán automáticamente cuando alcances tu límite de $8,000 o en tu próximo 
            corte del 15 de agosto, lo que ocurra primero.
          </p>
        </div>
      </div>
    </div>
  );
}
