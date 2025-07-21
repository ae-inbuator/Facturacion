# Próximos pasos - Modal de Datos de Facturación

## Modal de configuración/edición

### Campos requeridos:
1. **RFC** (con validación en tiempo real)
2. **Razón Social**
3. **Régimen fiscal** (dropdown con catálogo SAT)
   - Régimen Simplificado de Confianza
   - Persona Física con Actividad Empresarial
   - Régimen General de Ley
   - etc.
4. **Tipo de contribuyente**
   - Persona Física
   - Persona Moral
5. **Dirección fiscal completa**
   - Calle y número
   - Colonia
   - Código Postal
   - Ciudad
   - Estado
6. **Email para facturas**
7. **Toggle de facturas automáticas**

### Funcionalidades adicionales:
- Opción de subir Constancia de Situación Fiscal (PDF)
- Validación de RFC con algoritmo oficial
- Autocompletado de colonias por CP
- Botón "Cargar nueva constancia" para actualizar datos

## Manejo de facturas retroactivas

Cuando se activan facturas por primera vez:

1. Revisar los últimos 3 meses de movimientos
2. Mostrar alerta con facturas pendientes de solicitar
3. Permitir solicitud masiva o individual
4. Marcar claramente el plazo legal (último día del mes siguiente)

## Estados de factura adicionales:
- **Solicitada manualmente** (retroactiva)
- **Generada automáticamente** (nuevo sistema)
- **Fuera de tiempo** (después del plazo legal)
