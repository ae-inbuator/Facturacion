import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Acordeón de preguntas frecuentes específicas por producto
export function PlanFAQ({ productId }) {
  const [openIndex, setOpenIndex] = useState(null);

  const getFAQsByProduct = () => {
    switch (productId) {
      case 't1tienda':
        return [
          {
            question: '¿Puedo cambiar de plan en cualquier momento?',
            answer: 'Sí, puedes cambiar tu plan cuando quieras. Los upgrades se aplican inmediatamente con prorrateo del precio. Los downgrades se aplican al final del ciclo de facturación actual.'
          },
          {
            question: '¿Qué pasa si excedo el límite de marketplaces?',
            answer: 'Si necesitas conectar más marketplaces de los incluidos en tu plan, puedes agregar marketplaces adicionales por $350-$1,200 MXN al mes según tu plan actual, o hacer upgrade a un plan superior.'
          },
          {
            question: '¿Las generaciones con IA se acumulan mes a mes?',
            answer: 'No, las generaciones con IA no se acumulan. Cada mes recibes la cuota nueva según tu plan. Si necesitas más generaciones, deberás hacer upgrade a un plan superior.'
          },
          {
            question: '¿Puedo tener múltiples tiendas en una sola cuenta?',
            answer: 'Sí, puedes crear múltiples tiendas. Las primeras 3 son gratis, a partir de la 4ta tienda se requiere un plan pagado siguiendo nuestra escala de precios.'
          }
        ];
      case 't1envios':
        return [
          {
            question: '¿Cómo funcionan las tarifas de envío?',
            answer: 'Con T1envíos obtienes acceso a tarifas preferenciales negociadas con todas las paqueterías. El costo del envío se cobra por separado del plan mensual.'
          },
          {
            question: '¿Qué incluye el Hub Logístico?',
            answer: 'El Hub Logístico es un orquestador inteligente que selecciona automáticamente la mejor paquetería según tus reglas de negocio (zona, peso, costo, tiempo). Disponible a partir del plan Professional.'
          },
          {
            question: '¿Puedo usar mi propia cuenta de paquetería?',
            answer: 'Sí, con los planes Business y Corporate puedes integrar tus propias cuentas de paquetería. Se cobra un fee por guía al usar cuentas propias.'
          },
          {
            question: '¿Cómo funciona la gestión de incidencias?',
            answer: 'Todos los planes incluyen gestión básica de incidencias. Los planes superiores incluyen atención personalizada y un gestor dedicado para resolver problemas más rápido.'
          }
        ];
      case 't1pos':
        return [
          {
            question: '¿Necesito hardware especial para usar T1 POS?',
            answer: 'No, T1 POS funciona en cualquier dispositivo con navegador web (tablet, computadora, celular). Para POS Pro, recomendamos tablets dedicadas para mejor experiencia.'
          },
          {
            question: '¿Qué diferencia hay entre POS Go, Start y Pro?',
            answer: 'POS Go es gratuito con funciones básicas. POS Start incluye facturación, reportes y programa de lealtad. POS Pro agrega modo offline, pantalla para cliente y análisis predictivo con IA.'
          },
          {
            question: '¿Puedo usar T1 POS sin tener tienda online?',
            answer: 'Sí, puedes contratar T1 POS de forma independiente. Sin embargo, al combinarlo con T1tienda obtienes sincronización automática de inventarios y reportes unificados.'
          },
          {
            question: '¿Cómo funciona el modo offline?',
            answer: 'Con POS Pro puedes seguir vendiendo sin conexión a internet. Las ventas se sincronizan automáticamente cuando recuperas la conexión. Ideal para eventos o zonas con conectividad limitada.'
          }
        ];
      default:
        return [];
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = getFAQsByProduct();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            style={{
              width: '100%',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: openIndex === index ? '#f9fafb' : '#ffffff',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (openIndex !== index) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (openIndex !== index) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            <span style={{
              fontWeight: '500',
              color: '#111827',
              textAlign: 'left',
              fontSize: '16px'
            }}>
              {faq.question}
            </span>
            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openIndex === index && (
            <div style={{
              padding: '0 24px 16px',
              fontSize: '14px',
              color: '#4b5563',
              lineHeight: '1.6'
            }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlanFAQ;