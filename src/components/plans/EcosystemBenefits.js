import React from 'react';
import { Shield, Users, CreditCard } from 'lucide-react';

// Muestra los beneficios del ecosistema T1
export function EcosystemBenefits() {
  const benefits = [
    {
      icon: <CreditCard size={32} style={{ color: '#3b82f6' }} />,
      title: 'Una sola factura',
      description: 'Todos tus servicios T1 en un solo cobro mensual'
    },
    {
      icon: <Users size={32} style={{ color: '#10b981' }} />,
      title: 'Usuarios ilimitados',
      description: 'Con cualquier plan pagado, usuarios ilimitados en TODO el ecosistema'
    },
    {
      icon: <Shield size={32} style={{ color: '#a855f7' }} />,
      title: 'Descuentos automáticos',
      description: 'Ahorra más al combinar servicios con bundles inteligentes'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px'
    }}>
      {benefits.map((benefit, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: '#f9fafb',
            borderRadius: '50%',
            marginBottom: '16px'
          }}>
            {benefit.icon}
          </div>
          <h4 style={{
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px',
            fontSize: '16px'
          }}>
            {benefit.title}
          </h4>
          <p style={{
            fontSize: '14px',
            color: '#4b5563',
            lineHeight: '1.5'
          }}>
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
}