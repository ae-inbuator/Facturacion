import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Download,
  ChevronDown,
  ChevronRight,
  Package,
  Store,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ShoppingBag,
  Truck,
  CreditCard,
  Eye
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Datos mock de pedidos
const ordersData = {
  'Tienda en línea': [
    {
      id: 'ORD-2025-0789',
      date: '14 jul 2025 14:23',
      customer: 'María García',
      total: 1250.00,
      commission: 31.25,
      commissionRate: 2.5,
      status: 'delivered',
      paymentMethod: 'Tarjeta de crédito',
      deliveryMethod: 'Express',
      products: [
        { name: 'Laptop HP Pavilion 15', sku: 'HP-PAV-15-2025', quantity: 1, price: 899.00, image: '💻' },
        { name: 'Mouse inalámbrico Logitech', sku: 'LOG-M705', quantity: 1, price: 299.00, image: '🖱️' },
        { name: 'USB-C Hub 7 en 1', sku: 'HUB-UC-7IN1', quantity: 1, price: 52.00, image: '🔌' }
      ]
    },
    {
      id: 'ORD-2025-0788',
      date: '14 jul 2025 11:45',
      customer: 'Carlos Rodríguez',
      total: 450.00,
      commission: 11.25,
      commissionRate: 2.5,
      status: 'delivered',
      paymentMethod: 'PayPal',
      deliveryMethod: 'Estándar',
      products: [
        { name: 'Audífonos Bluetooth Sony', sku: 'SONY-WH-BT', quantity: 1, price: 450.00, image: '🎧' }
      ]
    },
    {
      id: 'ORD-2025-0787',
      date: '13 jul 2025 19:30',
      customer: 'Ana Martínez',
      total: 789.50,
      commission: 19.74,
      commissionRate: 2.5,
      status: 'cancelled',
      cancelReason: 'Cliente canceló - producto no disponible',
      paymentMethod: 'Transferencia',
      deliveryMethod: 'Recoge en tienda',
      products: [
        { name: 'Tablet Samsung Galaxy Tab', sku: 'SAM-TAB-A8', quantity: 1, price: 589.50, image: '📱' },
        { name: 'Funda protectora', sku: 'FUND-TAB-A8', quantity: 1, price: 200.00, image: '📦' }
      ]
    },
    {
      id: 'ORD-2025-0786',
      date: '13 jul 2025 16:15',
      customer: 'Luis Hernández',
      total: 1680.00,
      commission: 42.00,
      commissionRate: 2.5,
      status: 'delivered',
      paymentMethod: 'Tarjeta de débito',
      deliveryMethod: 'Express',
      products: [
        { name: 'Monitor Gaming ASUS 27"', sku: 'ASUS-MG27', quantity: 1, price: 1680.00, image: '🖥️' }
      ]
    },
    {
      id: 'ORD-2025-0785',
      date: '12 jul 2025 10:00',
      customer: 'Patricia López',
      total: 230.50,
      commission: 5.76,
      commissionRate: 2.5,
      status: 'refunded',
      refundReason: 'Producto defectuoso',
      refundDate: '15 jul 2025',
      paymentMethod: 'Mercado Pago',
      deliveryMethod: 'Estándar',
      products: [
        { name: 'Webcam HD 1080p', sku: 'WEB-HD-1080', quantity: 1, price: 230.50, image: '📷' }
      ]
    }
  ],
  'Mercado Libre': [
    {
      id: 'ML-2025-4521',
      date: '14 jul 2025 09:30',
      customer: 'Roberto Silva',
      total: 350.00,
      commission: 10.50,
      commissionRate: 3.0,
      status: 'delivered',
      paymentMethod: 'Mercado Pago',
      deliveryMethod: 'Mercado Envíos',
      marketplaceUrl: 'https://articulo.mercadolibre.com.mx/MLM-123456',
      products: [
        { name: 'Smartwatch Xiaomi Mi Band 7', sku: 'XIA-MB7', quantity: 1, price: 350.00, image: '⌚' }
      ]
    },
    {
      id: 'ML-2025-4520',
      date: '13 jul 2025 22:45',
      customer: 'Elena Ramírez',
      total: 890.00,
      commission: 26.70,
      commissionRate: 3.0,
      status: 'in_transit',
      paymentMethod: 'Tarjeta',
      deliveryMethod: 'Mercado Envíos Full',
      marketplaceUrl: 'https://articulo.mercadolibre.com.mx/MLM-123457',
      products: [
        { name: 'Silla Gamer RGB', sku: 'CHAIR-GM-RGB', quantity: 1, price: 890.00, image: '🪑' }
      ]
    },
    {
      id: 'ML-2025-4519',
      date: '12 jul 2025 15:20',
      customer: 'Diego Morales',
      total: 260.00,
      commission: 7.80,
      commissionRate: 3.0,
      status: 'delivered',
      paymentMethod: 'Efectivo (OXXO)',
      deliveryMethod: 'Mercado Envíos',
      marketplaceUrl: 'https://articulo.mercadolibre.com.mx/MLM-123458',
      products: [
        { name: 'Power Bank 20000mAh', sku: 'PB-20K', quantity: 2, price: 130.00, image: '🔋' }
      ]
    }
  ]
};

// Configuración de estados
const statusConfig = {
  delivered: { label: 'Entregado', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  in_transit: { label: 'En tránsito', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  refunded: { label: 'Reembolsado', icon: RefreshCw, color: 'text-orange-600', bg: 'bg-orange-50' },
  pending: { label: 'Pendiente', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' }
};

export function CommissionDetail({ channel, totalCommission, orders: orderCount, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Obtener pedidos del canal
  const channelOrders = ordersData[channel] || [];
  
  // Filtrar pedidos
  const filteredOrders = channelOrders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Calcular totales
  const totals = filteredOrders.reduce((acc, order) => {
    if (order.status === 'delivered' || order.status === 'in_transit') {
      acc.sales += order.total;
      acc.commission += order.commission;
      acc.orders += 1;
    } else if (order.status === 'cancelled' || order.status === 'refunded') {
      acc.cancelled += order.total;
      acc.cancelledCommission += order.commission;
      acc.cancelledOrders += 1;
    }
    return acc;
  }, { sales: 0, commission: 0, orders: 0, cancelled: 0, cancelledCommission: 0, cancelledOrders: 0 });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-60">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a factura
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                  Detalle de comisiones - {channel}
                  {channel === 'Tienda en línea' && <ShoppingBag className="w-6 h-6 text-gray-400" />}
                  {channel === 'Mercado Libre' && <Store className="w-6 h-6 text-gray-400" />}
                </h1>
                <p className="text-gray-600 mt-1">Período: 15 jun - 14 jul 2025</p>
              </div>
              
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar detalle
              </Button>
            </div>
          </div>
        </div>

        {/* Resumen de totales */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Ventas efectivas</span>
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">${totals.sales.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-gray-500 mt-1">{totals.orders} pedidos</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Comisión generada</span>
                <CreditCard className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-green-600">${totals.commission.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-gray-500 mt-1">{channel === 'Tienda en línea' ? '2.5%' : '3.0%'} de comisión</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Cancelados/Devueltos</span>
                <XCircle className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-red-600">${totals.cancelled.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-gray-500 mt-1">{totals.cancelledOrders} pedidos sin comisión</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Comisión no cobrada</span>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-400">-${totals.cancelledCommission.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-gray-500 mt-1">Por cancelaciones</p>
            </div>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por número de orden, cliente o producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 ${showFilters ? 'bg-gray-50' : ''}`}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {filterStatus !== 'all' && (
                <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                  1
                </span>
              )}
            </Button>
          </div>

          {/* Filtros expandibles */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Estado del pedido</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="delivered">Entregados</option>
                    <option value="in_transit">En tránsito</option>
                    <option value="cancelled">Cancelados</option>
                    <option value="refunded">Reembolsados</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tabla de pedidos */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total venta
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comisión
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status];
                  const Icon = status.icon;
                  const isCancelled = order.status === 'cancelled' || order.status === 'refunded';
                  
                  return (
                    <tr 
                      key={order.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${isCancelled ? 'opacity-60' : ''}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">{order.customer}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-sm font-medium ${isCancelled ? 'line-through text-gray-400' : ''}`}>
                        ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 px-4 text-sm font-medium ${isCancelled ? 'text-gray-400' : 'text-green-600'}`}>
                        {isCancelled ? '-' : ''}${order.commission.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        <span className="text-xs text-gray-500 ml-1">({order.commissionRate}%)</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.products.slice(0, 3).map((product, idx) => (
                              <div
                                key={idx}
                                className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm"
                                title={product.name}
                              >
                                {product.image}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {order.products.length} {order.products.length === 1 ? 'producto' : 'productos'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de detalle del pedido */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">Detalle del pedido {selectedOrder.id}</h3>
                  {statusConfig[selectedOrder.status] && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
                      {React.createElement(statusConfig[selectedOrder.status].icon, { className: "w-4 h-4" })}
                      {statusConfig[selectedOrder.status].label}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </Button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Información del pedido */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cliente</p>
                    <p className="font-medium">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Fecha del pedido</p>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Método de pago</p>
                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
                
                {/* Segunda fila de información */}
                <div className="grid grid-cols-3 gap-6 mt-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Método de envío</p>
                    <p className="font-medium">{selectedOrder.deliveryMethod}</p>
                  </div>
                  {selectedOrder.marketplaceUrl && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Enlace en marketplace</p>
                      <a 
                        href={selectedOrder.marketplaceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        Ver en {channel}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Información de cancelación/reembolso */}
                {selectedOrder.status === 'cancelled' && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-900">Razón de cancelación</p>
                    <p className="text-sm text-red-700 mt-1">{selectedOrder.cancelReason}</p>
                  </div>
                )}
                
                {selectedOrder.status === 'refunded' && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-900">Reembolso procesado</p>
                    <p className="text-sm text-orange-700 mt-1">
                      Razón: {selectedOrder.refundReason}
                    </p>
                    <p className="text-sm text-orange-700">
                      Fecha de reembolso: {selectedOrder.refundDate}
                    </p>
                  </div>
                )}
              </div>

              {/* Productos */}
              <div className="px-6 py-4">
                <h4 className="font-medium mb-4">Productos ({selectedOrder.products.length})</h4>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(product.price * product.quantity).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                        <p className="text-sm text-gray-500">
                          {product.quantity} x ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer del modal con totales */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {selectedOrder.status === 'cancelled' || selectedOrder.status === 'refunded' ? (
                    <span className="text-red-600 font-medium">
                      Este pedido no generó comisión
                    </span>
                  ) : (
                    <span>
                      Comisión aplicada: {selectedOrder.commissionRate}%
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Total del pedido: <span className="font-medium">${selectedOrder.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    Comisión: ${selectedOrder.commission.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
