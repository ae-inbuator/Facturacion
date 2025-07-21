import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function BillingCard({ 
  title, 
  amount, 
  currency = "$", 
  tooltip, 
  description, 
  link,
  onClick,
  isClickable = false
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const tooltipRef = useRef(null);
  
  // Cerrar tooltip al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        titleRef.current && 
        !titleRef.current.contains(event.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleTitleClick = (e) => {
    e.stopPropagation();
    if (tooltip) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowTooltip(!showTooltip);
    }
  };


  return (
    <div 
      className={`bg-white rounded-2xl p-7 shadow-sm relative overflow-hidden ${isClickable ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex-1">
          <div className="relative inline-block">
            <div 
              ref={titleRef}
              className="text-gray-500 mb-1 cursor-pointer inline-block"
              onClick={handleTitleClick}>
              {title}
            </div>
            {/* Tooltip */}
            {showTooltip && tooltip && (
              <div 
                ref={tooltipRef}
                className="absolute z-[100] w-72 px-4 py-3 text-sm text-white rounded-lg shadow-lg whitespace-normal"
                style={{
                  backgroundColor: '#111827',
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y + 10}px`
                }}
              >
                <div 
                  className="absolute w-3 h-3 transform rotate-45"
                  style={{
                    backgroundColor: '#111827',
                    top: '-6px',
                    left: '20px'
                  }}
                ></div>
                {tooltip}
              </div>
            )}
          </div>
          <div 
            className="text-4xl font-semibold text-gray-900 leading-none mt-2"
            onClick={(e) => {
              if (onClick) {
                e.stopPropagation();
                onClick();
              }
            }}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
          >
            <span className="text-2xl font-normal">{currency}</span>
            {amount.toLocaleString()}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 leading-relaxed mb-4">
        {description}
      </p>
      
      
      {link && (
        <a 
          href={link.href} 
          className="inline-flex items-center gap-1.5 text-blue-600 text-sm mt-3 hover:text-blue-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) {
              e.preventDefault();
              onClick();
            }
          }}
        >
          {link.text}
          <ArrowRight size={14} />
        </a>
      )}
    </div>
  );
}
