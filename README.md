# T1 Facturación - Sistema de Facturación

## 📋 Descripción

Sistema de facturación transparente y automatizado para el ecosistema T1 que permite a los sellers entender y gestionar sus cobros de forma simple y sin sorpresas.

## 🚀 Instalación y ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar el proyecto**:
   ```bash
   npm start
   ```

   El proyecto se abrirá automáticamente en `http://localhost:3000`

## 🎯 Características principales

- **Dashboard de facturación**: Vista general de cargos adicionales y suscripciones
- **Historial de facturas**: Tabla completa con todas las facturas emitidas
  - Las primeras 4 facturas son clickeables para ver ejemplos de detalle
- **Detalle de factura - Estilo Shopify**: Vista limpia y simplificada con:
  - **Navegación entre casos de prueba**:
    - Dropdown selector con los 4 casos disponibles
    - Botones anterior/siguiente para navegación rápida
    - Indicador de posición (1 de 4, 2 de 4, etc.)
    - Atajos de teclado: ← (anterior) y → (siguiente)
    - Click fuera cierra el dropdown automáticamente
  - Cronología de pagos colapsable con eventos detallados
  - Secciones expandibles para suscripciones, comisiones y notificaciones
  - Diseño minimalista sin información fiscal (disponible en otra sección)
  - Método de pago con diseño visual de tarjetas
  - 4 tipos de factura con casos reales:
    1. Suscripción + Adicionales (con historial de pago exitoso)
    2. Recarga de saldo (con timeline de proceso de recarga)
    3. Solo cargos adicionales (con intentos de cobro fallidos)
    4. Nota de crédito (con historial de cambio de plan)
- **Desglose de cargos adicionales**: Pantalla detallada con comisiones y servicios
- **Gestión de métodos de pago**: Visualización del método de pago actual
- **Datos de facturación**: Configuración completa de información fiscal
  - Vista cuando NO hay datos (solicita configuración)
  - Vista cuando SÍ hay datos (muestra resumen con opción de modificar)
  - Modal completo con:
    - Validación de RFC en tiempo real
    - Catálogo de regímenes fiscales del SAT
    - Formulario de dirección completo
    - Selección de estados de México
    - Toggle de facturas automáticas
    - Opción para cargar Constancia de Situación Fiscal
- **Sistema responsive**: Adaptado para diferentes tamaños de pantalla

## 📂 Estructura del proyecto

```
facturacion/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.js
│   │   │   ├── checkbox.js
│   │   │   ├── input.js
│   │   │   └── tooltip.js
│   │   ├── AdditionalChargesDetail.js
│   │   ├── BillingCard.js
│   │   ├── InvoiceData.js
│   │   ├── InvoiceDataModal.js
│   │   ├── InvoiceDetail.js
│   │   ├── InvoiceTable.js
│   │   ├── PaymentMethod.js
│   │   └── Sidebar.js
│   ├── data/
│   │   └── invoiceDetailsData.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Tecnologías utilizadas

- React 18
- Lucide React (iconos)
- CSS personalizado con utilidades tipo Tailwind

## 🥰 Cómo navegar

1. **Ver detalle de factura**: Haz clic en cualquiera de las primeras 4 facturas en la tabla (aparecen en azul)
2. **Ver desglose de adicionales**: 
   - Haz clic en el monto de "Cargos adicionales" en el dashboard
   - O usa el tab "Desglose de adicionales"
3. **Regresar**: Usa el botón "Volver" en la parte superior de cada pantalla

## 🎯 Funcionalidades interactivas

### Tooltips informativos
- Pasa el cursor sobre los títulos con línea punteada para ver información detallada
- "Cargos adicionales" y "Suscripciones mensuales" tienen tooltips explicativos

### Simulación de barra de progreso
- Haz clic en el card de "Cargos adicionales" para simular el crecimiento del consumo
- La barra cambia de color según el porcentaje:
  - Verde (0-50%): Todo bien
  - Naranja (50-80%): Precaución
  - Rojo (80-100%): Cerca del límite
- Después de 5 clics, la barra se reinicia

### Navegación en el detalle de factura
- Usa el **dropdown** para saltar directamente a cualquier caso
- Usa los **botones ← →** o las **teclas de flecha** para navegar secuencialmente
- **Esc** cierra el dropdown
- El indicador muestra tu posición actual (ej: "2 de 4")

## 📝 Notas de desarrollo

- El proyecto está listo para agregar más funcionalidades según la especificación funcional
- Los componentes están modularizados para facilitar el mantenimiento
- El sistema de navegación entre pantallas está implementado con estados de React

## 🎨 Próximas mejoras

- Integración con API backend
- Implementación de filtros funcionales en la tabla de facturas
- Sistema de notificaciones en tiempo real
- Exportación de facturas en lote
- Gráficas y reportes avanzados
