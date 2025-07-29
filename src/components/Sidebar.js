import React from 'react';
import { User, Building2, Lock, BarChart3, Home, CreditCard, Wallet, Target } from 'lucide-react';

export function Sidebar({ onPlansClick, activeSection = 'facturacion' }) {
  const navSections = [
    {
      title: "MI PERFIL",
      items: [
        { icon: <User size={16} />, label: "Mi perfil", href: "#" },
        { icon: <Building2 size={16} />, label: "Región e idioma", href: "#" },
        { icon: <Lock size={16} />, label: "Seguridad", href: "#" },
      ]
    },
    {
      title: "MI TIENDA",
      items: [
        { icon: <BarChart3 size={16} />, label: "Datos de tienda", href: "#" },
        { icon: <Home size={16} />, label: "Sucursales", href: "#" },
        { icon: <CreditCard size={16} />, label: "Facturación", href: "#", active: activeSection === 'facturacion', onClick: null },
        { icon: <Wallet size={16} />, label: "Saldos y movimientos", href: "#", active: false },
        { icon: <Target size={16} />, label: "Planes", href: "#", active: activeSection === 'planes', onClick: onPlansClick },
      ]
    }
  ];
  
  return (
    <div className="fixed left-0 top-0 w-60 h-screen bg-white border-r border-gray-200 p-5">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center text-white font-bold text-lg">
          T1
        </div>
        <span className="font-semibold">cuenta</span>
      </div>
      
      {/* Navigation Sections */}
      {navSections.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
            {section.title}
          </div>
          {section.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 cursor-pointer ${
                item.active
                  ? 'bg-red-500 text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
