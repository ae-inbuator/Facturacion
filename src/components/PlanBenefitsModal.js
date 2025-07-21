import React, { useState } from 'react';
import { X, Check, ChevronDown, ChevronUp, Shield, Zap, Users, Package, HeadphonesIcon, TrendingUp, Globe, Bot, BarChart3 } from 'lucide-react';

export function PlanBenefitsModal({ plan, onClose }) {
  const [expandedSections, setExpandedSections] = useState({});

  // Beneficios detallados por producto y plan
  const detailedBenefits = {
    'T1 Tienda': {
      'Básico': {
        sections: [
          {
            title: 'Creación de tienda',
            icon: <Globe className="text-blue-500" size={20} />,
            benefits: [
              'Tienda online responsiva',
              'Dominio .mitienda.mx incluido',
              'Certificado SSL gratuito',
              'Plantillas básicas',
              'Personalización de colores y logo',
              'Hasta 100 productos',
              'Categorías ilimitadas'
            ]
          },
          {
            title: 'Gestión de ventas',
            icon: <TrendingUp className="text-green-500" size={20} />,
            benefits: [
              'Dashboard de ventas básico',
              'Gestión de órdenes',
              'Control de inventario simple',
              'Notificaciones por email',
              'Integración con 1 marketplace',
              'Reportes mensuales'
            ]
          },
          {
            title: 'Soporte',
            icon: <HeadphonesIcon className="text-purple-500" size={20} />,
            benefits: [
              'Soporte por email',
              'Centro de ayuda',
              'Tutoriales básicos',
              'Respuesta en 24-48 horas'
            ]
          }
        ]
      },
      'Profesional': {
        sections: [
          {
            title: 'Creación de tienda avanzada',
            icon: <Globe className="text-blue-500" size={20} />,
            benefits: [
              'Todo lo del plan Básico',
              'Dominio personalizado (.com, .mx)',
              'Plantillas premium',
              'Editor avanzado drag & drop',
              'Hasta 5,000 productos',
              'Variantes de productos',
              'Productos digitales',
              'Blog integrado'
            ]
          },
          {
            title: 'IA Generativa',
            icon: <Bot className="text-red-500" size={20} />,
            benefits: [
              'Generación automática de descripciones',
              'Creación de imágenes con IA',
              'Optimización SEO automática',
              'Sugerencias de precios',
              'Chatbot básico para clientes'
            ]
          },
          {
            title: 'Integraciones y marketplaces',
            icon: <Package className="text-orange-500" size={20} />,
            benefits: [
              'Conexión con marketplaces ilimitados',
              'Sincronización de inventario',
              'Publicación masiva',
              'Gestión centralizada de pedidos',
              'Mercado Libre, Amazon, Shein, etc.'
            ]
          },
          {
            title: 'Analytics y reportes',
            icon: <BarChart3 className="text-indigo-500" size={20} />,
            benefits: [
              'Dashboard avanzado',
              'Métricas en tiempo real',
              'Análisis de conversión',
              'Reportes personalizados',
              'Exportación de datos',
              'Integración con Google Analytics'
            ]
          },
          {
            title: 'Soporte prioritario',
            icon: <HeadphonesIcon className="text-purple-500" size={20} />,
            benefits: [
              'Chat en vivo',
              'Soporte telefónico',
              'Respuesta en menos de 2 horas',
              'Asesoría mensual incluida',
              'Onboarding personalizado'
            ]
          }
        ]
      },
      'Empresarial': {
        sections: [
          {
            title: 'Todo lo de Profesional, más:',
            icon: <Shield className="text-gray-700" size={20} />,
            benefits: []
          },
          {
            title: 'Capacidades empresariales',
            icon: <Zap className="text-yellow-500" size={20} />,
            benefits: [
              'Productos ilimitados',
              'Múltiples tiendas',
              'Gestión de sucursales',
              'Multi-moneda',
              'Multi-idioma',
              'Servidor dedicado',
              'CDN premium'
            ]
          },
          {
            title: 'Usuarios y permisos',
            icon: <Users className="text-blue-500" size={20} />,
            benefits: [
              'Usuarios ilimitados',
              'Roles personalizados',
              'Permisos granulares',
              'Auditoría de cambios',
              'SSO (Single Sign-On)',
              'Autenticación 2FA obligatoria'
            ]
          },
          {
            title: 'API y personalización',
            icon: <Globe className="text-green-500" size={20} />,
            benefits: [
              'API REST completa',
              'Webhooks personalizados',
              'Desarrollo personalizado',
              'Integraciones a medida',
              'Acceso a base de datos',
              'Ambiente de staging'
            ]
          },
          {
            title: 'Soporte empresarial',
            icon: <HeadphonesIcon className="text-purple-500" size={20} />,
            benefits: [
              'Ejecutivo de cuenta dedicado',
              'Soporte 24/7',
              'SLA garantizado 99.9%',
              'Capacitación para tu equipo',
              'Revisiones trimestrales',
              'Línea directa de soporte'
            ]
          }
        ]
      }
    },
    'T1 Envíos': {
      'Básico': {
        sections: [
          {
            title: 'Guías y envíos',
            icon: <Package className="text-blue-500" size={20} />,
            benefits: [
              '100 guías mensuales incluidas',
              'Tarifas preferenciales después',
              'Cobertura nacional',
              'Múltiples paqueterías',
              'Impresión de guías',
              'Rastreo básico'
            ]
          },
          {
            title: 'Dashboard',
            icon: <BarChart3 className="text-green-500" size={20} />,
            benefits: [
              'Vista de envíos activos',
              'Historial de envíos',
              'Estados en tiempo real',
              'Filtros básicos',
              'Descarga de reportes CSV'
            ]
          },
          {
            title: 'Recolección',
            icon: <TrendingUp className="text-purple-500" size={20} />,
            benefits: [
              'Recolección programada',
              'Horarios estándar',
              'Confirmación por email',
              'Reprogramación manual'
            ]
          }
        ]
      },
      'Pro': {
        sections: [
          {
            title: 'Guías y envíos mejorados',
            icon: <Package className="text-blue-500" size={20} />,
            benefits: [
              '500 guías mensuales incluidas',
              'Mejores tarifas (hasta 20% menos)',
              'Envíos express disponibles',
              'Prioridad en temporada alta',
              'Seguro incluido hasta $5,000',
              'Multi-origen habilitado'
            ]
          },
          {
            title: 'Módulo de incidencias',
            icon: <Shield className="text-red-500" size={20} />,
            benefits: [
              'Gestión automatizada de problemas',
              'Seguimiento de casos',
              'Comunicación directa con paqueterías',
              'Resolución prioritaria',
              'Compensaciones automáticas',
              'Reportes de incidencias'
            ]
          },
          {
            title: 'Integraciones y API',
            icon: <Globe className="text-orange-500" size={20} />,
            benefits: [
              'API REST completa',
              'Webhooks de eventos',
              'Plugins para e-commerce',
              'Importación masiva avanzada',
              'Etiquetas personalizadas',
              'Integración con ERPs'
            ]
          },
          {
            title: 'Analytics avanzado',
            icon: <BarChart3 className="text-indigo-500" size={20} />,
            benefits: [
              'Métricas de desempeño',
              'Análisis por zona',
              'Tiempos de entrega',
              'Costos por ruta',
              'Dashboards personalizables',
              'Alertas inteligentes'
            ]
          }
        ]
      },
      'Empresarial': {
        sections: [
          {
            title: 'Orquestador de envíos',
            icon: <Zap className="text-yellow-500" size={20} />,
            benefits: [
              'Reglas automáticas de selección',
              'Optimización por costo/tiempo',
              'Integración de tarifas propias',
              'Paqueterías personalizadas',
              'Ruteo inteligente',
              'Machine learning para optimización'
            ]
          },
          {
            title: 'Gestión corporativa',
            icon: <Users className="text-blue-500" size={20} />,
            benefits: [
              'Guías ilimitadas',
              'Múltiples ubicaciones',
              'Gestión de flotillas propias',
              'Control por departamento',
              'Facturación consolidada',
              'Portal para sucursales'
            ]
          },
          {
            title: 'SLA garantizado',
            icon: <Shield className="text-green-500" size={20} />,
            benefits: [
              'Tiempos de entrega garantizados',
              'Compensación automática por retrasos',
              'Prioridad máxima en temporadas',
              'Rutas dedicadas disponibles',
              'Monitoreo 24/7',
              'Contingencias aseguradas'
            ]
          },
          {
            title: 'Soporte ejecutivo',
            icon: <HeadphonesIcon className="text-purple-500" size={20} />,
            benefits: [
              'Ejecutivo de logística dedicado',
              'Mesa de control 24/7',
              'Línea directa de emergencias',
              'Reportes ejecutivos mensuales',
              'Consultoría logística incluida',
              'Capacitación continua'
            ]
          }
        ]
      }
    }
  };

  const benefits = detailedBenefits[plan.product]?.[plan.planName] || { sections: [] };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAll = () => {
    const newExpanded = {};
    benefits.sections.forEach((_, index) => {
      newExpanded[index] = true;
    });
    setExpandedSections(newExpanded);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Beneficios completos
            </h2>
            <p className="text-gray-600 mt-1">
              {plan.product} - Plan {plan.planName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{plan.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Plan {plan.planName}
                </h3>
                <p className="text-gray-600">
                  ${plan.price.toLocaleString()}/mes
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Expandir todo
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Colapsar todo
              </button>
            </div>
          </div>

          {/* Current Features Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Incluido actualmente:</h4>
            <div className="grid grid-cols-2 gap-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Benefits Sections */}
          <div className="space-y-4">
            {benefits.sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <h4 className="font-semibold text-gray-900">{section.title}</h4>
                    {section.benefits.length > 0 && (
                      <span className="text-sm text-gray-500">
                        ({section.benefits.length} beneficios)
                      </span>
                    )}
                  </div>
                  {section.benefits.length > 0 && (
                    expandedSections[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                  )}
                </button>
                
                {expandedSections[index] && section.benefits.length > 0 && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <ul className="mt-4 space-y-2">
                      {section.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Shield className="text-blue-600" size={20} />
              Garantías y compromisos
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Uptime garantizado del 99.9%</li>
              <li>• Actualizaciones automáticas sin costo</li>
              <li>• Sin límite de usuarios concurrentes</li>
              <li>• Respaldo diario de información</li>
              <li>• Cumplimiento CFDI 4.0 y normativas SAT</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
          <p className="text-sm text-gray-600">
            ¿Necesitas más información? Contacta a nuestro equipo de ventas
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                // Aquí podrías abrir el modal de cambio de plan
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Cambiar a este plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
