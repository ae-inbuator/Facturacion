# T1 Facturación - Especificación Funcional y UX

## 🎯 Visión del Producto

### ¿Qué es?
Sistema de facturación transparente y automatizado para el ecosistema T1 que permite a los sellers entender y gestionar sus cobros de forma simple y sin sorpresas.

### ¿Para quién?
- Emprendedores y PYMEs que venden en línea
- Empresas medianas con múltiples canales de venta
- Grandes corporativos que necesitan control detallado

### Objetivo Principal
**"Que el seller siempre entienda: qué está pagando, cuándo lo va a pagar y por qué"**

---

## 🏗️ Estructura del Sistema

### Tres Tipos de Cobros

#### 1. 💳 **Recargas de Saldo**
- **Qué es**: Dinero que cargas a tu wallet T1 (como una tarjeta de prepago)
- **Para qué**: Pagar envíos, servicios adicionales
- **Cuándo se factura**: Inmediatamente al recargar
- **Factura**: CFDI instantáneo

#### 2. 📅 **Suscripciones (Planes)**
- **Qué es**: Planes mensuales o anuales de T1tienda, T1envíos, etc.
- **Cómo funciona**: Sistema "ancla" - tu primera suscripción define tu fecha de corte
- **Ejemplo**: Contratas el día 17 → todos tus cobros serán día 17
- **Factura**: CFDI el día del corte

#### 3. 💰 **Cargos Adicionales**
- **Qué incluye**:
  - Comisiones por ventas (1.5% tienda online, 1% marketplaces)
  - Comisiones T1pagos (4.5%)
  - Notificaciones extra (WhatsApp, SMS, Email)
- **Cómo se cobran**: Acumulan hasta alcanzar tu límite O en tu fecha de corte

---

## 📐 El Sistema "Ancla" - Tu Fecha de Corte Universal

### Concepto Clave
Tu **primera suscripción** establece tu fecha de corte para SIEMPRE. Todo se sincroniza a esa fecha.

### Ejemplo Práctico
```
1. Contratas T1tienda Básico el 17 de agosto
2. Tu fecha de corte es el día 17 de cada mes
3. El 25 de agosto contratas T1envíos Pro
4. T1envíos se prorratea: pagas solo 22 días (del 25 ago al 17 sep)
5. Desde septiembre, TODO se cobra el día 17
```

### Fórmula de Prorrateo
```
Monto a pagar = (Precio mensual ÷ 30) × Días hasta el corte
```

---

## 💳 Límites de Crédito (Threshold)

### ¿Qué es?
Un "tope" de cargos adicionales que puedes acumular antes de que se cobre automáticamente.

### Tabla de Límites
| Tus Planes Mensuales | Tu Límite de Crédito |
|---------------------|---------------------|
| $0 - $299 | $3,000 |
| $300 - $599 | $3,000 |
| $600 - $1,199 | $12,000 |
| $1,200 - $1,999 | $20,000 |
| $2,000 - $3,999 | $35,000 |
| $4,000 - $5,000 | $50,000 |
| Más de $5,000 | A negociar |

### Importante
- Las suscripciones NO cuentan para el límite
- Solo cuentan: comisiones, notificaciones extras, etc.
- Al alcanzar el límite → cobro automático inmediato

---

## 🎨 Experiencia de Usuario (UX)

### Dashboard Principal - Lo que ve el seller

#### 1. **Card: Cargos Adicionales**
Muestra:
- Monto acumulado actual (ej: $650.00)
- Límite de crédito (ej: $12,000)
- Barra visual de progreso
- Link "Ver desglose detallado"

**Estados Visuales**:
- 🟢 Verde (0-80%): Todo bien
- 🟡 Amarillo (80-100%): Acercándose al límite
- 🔴 Rojo (100%+): Límite alcanzado, cobro pendiente

#### 2. **Card: Suscripciones Mensuales**
Muestra:
- Total mensual de todos tus planes
- Cantidad de planes activos
- Próxima fecha de cobro
- Link "Ver mis planes"

#### 3. **Método de Pago**
- Tarjeta actual con últimos 4 dígitos
- Botón para cambiar/agregar tarjeta
- Indicador de próximo cargo automático

### Desglose de Cargos (Drawer Lateral)

Al hacer clic en "Ver desglose detallado" se abre un panel que muestra:

#### Resumen del Período
- Fechas (desde último corte hasta hoy)
- Total acumulado
- Días transcurridos

#### Comisiones por Canal
- **Tienda en línea**: X órdenes = $XXX (1.5%)
- **Mercado Libre**: X órdenes = $XXX (1%)
- **Amazon**: X órdenes = $XXX (1%)
- Cada uno con link "Ver órdenes" → tabla detallada

#### Notificaciones Adicionales
- Solo muestra las que excedieron tu plan
- Ejemplo: "650 de 500 WhatsApp incluidos (150 extra = $45)"
- Barra visual mostrando el exceso

---

## 📊 Estados de Facturas

### Estados Posibles
1. **✅ Pagada**: Todo bien, factura liquidada
2. **⏳ Pendiente**: Emitida, esperando cobro automático (máx. 7 días)
3. **❌ Impaga/Vencida**: Falló el cobro después de 7 días → servicios suspendidos
4. **📝 Nota de crédito**: Ajuste aplicado a siguiente factura

### Flujo de Cobro Fallido
```
Día 0: Factura emitida → Intento de cobro
↓ (falla)
Día 3: Segundo intento automático
↓ (falla)
Día 7: Tercer intento → Si falla → Estado "Impaga"
↓
Servicios en modo "freeze" (solo lectura)
```

---

## 🎁 Planes Anuales - Caso Especial

### Cómo Funciona
1. Pagas 12 meses por adelantado (con descuento)
2. Se factura TODO el día 1
3. Los siguientes 11 meses no pagas suscripción
4. Tu límite de crédito se calcula sobre el precio mensual (no el total anual)

### Visualización para el Usuario
- Card suscripciones: "Plan anual - Renovación: agosto 2026"
- No muestra "$0" en meses siguientes (confuso)
- Muestra fecha de próxima renovación anual

### Ventaja Clave
Mantienes el mismo límite de crédito que si pagaras mensual, pero con el descuento anual.

---

## 📱 Pantallas y Flujos Principales

### 1. Pantalla de Resumen (Dashboard)
- Vista general de tu estado de cuenta
- Accesos rápidos a acciones frecuentes
- Alertas importantes (si las hay)

### 2. Historial de Facturas
- Tabla con todas tus facturas
- Filtros por: fecha, tipo, estado
- Descarga individual o masiva (PDF/XML)
- Búsqueda por folio

### 3. Desglose de Adicionales (Drawer)
- Se abre desde el dashboard
- Información detallada del período actual
- Links para profundizar en cada categoría

### 4. Gestión de Planes (futura)
- Lista de planes activos
- Opciones para upgrade/downgrade
- Cambio entre mensual/anual

---

## 🔔 Notificaciones y Comunicación

### Principios
- **Sin spam**: Máximo 1 recordatorio diario
- **Multicanal**: Email siempre + in-app para urgentes
- **Accionables**: Cada notificación incluye link directo para resolver

### Notificaciones Clave
| Evento | Canal | Mensaje |
|--------|-------|---------|
| Factura lista | Email | "Tu factura de [mes] está lista" + link |
| Límite alcanzado | Email + In-app | "Has alcanzado tu límite de crédito" |
| Pago fallido | Email + Banner | "No pudimos procesar tu pago" + CTA |
| 2 días para suspensión | Email + Pop-up | "Quedan 2 días antes de suspender servicios" |
| Servicios suspendidos | Email + Bloqueo UI | "Servicios suspendidos por falta de pago" |

---

## ✅ Mejores Prácticas UX

### Transparencia
- Siempre mostrar cuánto, cuándo y por qué
- Tooltips explicativos en elementos complejos
- Textos claros, sin tecnicismos

### Predictibilidad
- Fecha de corte fija y visible
- Avisos antes de cobros
- Sin sorpresas en montos

### Control
- Poder ver desglose detallado siempre
- Cambiar método de pago fácilmente
- Descargar facturas cuando quieran

### Simplicidad
- Máximo 3 clics para cualquier acción principal
- Información jerarquizada (lo importante primero)
- Diseño limpio y espacioso

---

## 🚀 Siguientes Pasos

### Fase 1: Dashboard y Facturas
- Dashboard con cards de resumen
- Tabla de historial de facturas
- Descarga de facturas

### Fase 2: Desglose y Transparencia
- Drawer de desglose detallado
- Links a órdenes por canal
- Tooltips y ayuda contextual

### Fase 3: Gestión Avanzada
- Cambio de método de pago
- Gestión de planes
- Notificaciones in-app

### Fase 4: Reportes y Analytics
- Gráficas de tendencias
- Comparativas mensuales
- Exportación avanzada

---

## 📋 Checklist para Diseño

### Dashboard
- [ ] Cards con información clave visible
- [ ] Barra de progreso para límite de crédito
- [ ] Estados visuales por color (verde/amarillo/rojo)
- [ ] CTAs claros y accesibles

### Desglose (Drawer)
- [ ] Animación suave desde la derecha
- [ ] Overlay oscuro clickeable para cerrar
- [ ] Información organizada por categorías
- [ ] Links funcionales a detalle

### Tabla de Facturas
- [ ] Iconos visuales por tipo
- [ ] Estados con badges de color
- [ ] Checkboxes para selección múltiple
- [ ] Acciones individuales y masivas

### Mobile
- [ ] Todo debe ser responsive
- [ ] Drawer full-screen en móvil
- [ ] Tablas con scroll horizontal
- [ ] Botones con áreas táctiles amplias

---

## 🎯 Métricas de Éxito

### Lo que queremos lograr
1. **-70% tickets de soporte** sobre facturación
2. **<30 segundos** para entender una factura
3. **95% pagos exitosos** en primer intento
4. **90% self-service** (sin ayuda de soporte)

### Cómo lo mediremos
- Analytics de uso de cada sección
- Tiempo en página
- Tasa de abandono en flujos
- Encuestas de satisfacción post-interacción