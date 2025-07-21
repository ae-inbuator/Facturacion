# T1 Facturación - UX Handoff Document

## 🎯 Acceso Rápido

### ✅ Demo en Vivo
**URL:** https://facturacion-zeta.vercel.app/

### 📁 Repositorio GitHub
**URL:** https://github.com/ae-inbuator/Facturacion

---

## 🏗️ Contexto del Proyecto

### ¿Qué es?
Sistema de facturación transparente y automatizado para el ecosistema T1 que permite a los sellers entender y gestionar sus cobros de forma simple y sin sorpresas.

### Objetivo Principal
**"Que el seller siempre entienda: qué está pagando, cuándo lo va a pagar y por qué"**

---

## 🎨 Lo que NECESITA DISEÑO UX

### 1. **Aplicar Design System T1**
- [ ] Reemplazar colores actuales con paleta oficial T1
- [ ] Usar componentes del design system
- [ ] Mantener consistencia con resto de la plataforma

### 2. **Estados Visuales Actuales (a mejorar)**
```css
/* Mapear estos colores a los oficiales de T1 */
--success: #10b981;  /* Verde - Todo bien */
--warning: #f59e0b;  /* Amarillo - Advertencia */
--danger: #ef4444;   /* Rojo - Crítico */
--info: #3b82f6;     /* Azul - Información */
--muted: #6b7280;    /* Gris - Deshabilitado */
```

### 3. **Componentes que ya existen (funcionales)**
- Cards de resumen (Cargos adicionales, Suscripciones, Método de pago)
- Drawer lateral de desglose
- Tabla de facturas con filtros
- Modales de cambio de plan y método de pago
- Banners de estado de pago

---

## 📱 Pantallas Principales

### Dashboard Principal (`/`)
- **Cards de resumen**: Muestra estado actual de cuenta
- **Alertas**: Banners para pagos fallidos
- **CTAs principales**: Ver desglose, cambiar plan

### Drawer de Desglose
- **Trigger**: Click en "Ver desglose detallado"
- **Contenido**: Comisiones por canal, notificaciones extra
- **Comportamiento**: Slide desde la derecha

### Tabla de Facturas
- **Filtros**: Por fecha, estado, tipo
- **Acciones**: Descarga individual y masiva
- **Estados**: Pagada, Pendiente, Impaga

### Modales
- Cambio de método de pago
- Cambio de plan
- Confirmaciones varias

---

## 🔴 Prioridades de Diseño

### Alta Prioridad 🔥
1. **Dashboard principal** - Primera impresión
2. **Estados de alerta** (banners de pago)
3. **Drawer de desglose** - Interacción clave
4. **Mobile responsive** - 40% de usuarios

### Media Prioridad ⚡
5. Tabla de facturas
6. Modales de gestión
7. Estados hover/active
8. Animaciones de transición

### Baja Prioridad 💤
9. Ilustraciones custom
10. Dark mode
11. Micro-interacciones avanzadas

---

## 📐 Especificaciones Técnicas

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Framework
- React 18.2
- CSS modules
- Sin framework UI (vanilla CSS)

### Estructura de archivos
```
/src
  /components     # Todos los componentes
  /data          # Datos mock
  /styles        # CSS global
```

---

## ✅ Checklist para el Diseñador

### Antes de empezar
- [ ] Revisar demo en vivo
- [ ] Entender los 3 tipos de cobros
- [ ] Familiarizarse con flujos actuales
- [ ] Acceso al design system T1

### Durante el diseño
- [ ] Mantener funcionalidad actual
- [ ] Mobile-first approach
- [ ] Documentar decisiones
- [ ] Crear componentes reutilizables

### Para entregar
- [ ] Diseños en Figma organizados
- [ ] Especificaciones de espaciado
- [ ] Paleta de colores mapeada
- [ ] Prototipo navegable

---

## 💬 Contacto

**Product Owner**: Arturo
**Proyecto**: T1 Facturación
**Fecha de entrega esperada**: [AGREGAR FECHA]

---

## 🎯 Definición de "Listo"

El diseño está completo cuando:
1. Un seller puede entender su facturación en < 30 segundos
2. Los estados de alerta son claros y accionables
3. El diseño es consistente con T1
4. Funciona perfectamente en mobile
