import React, { useState } from 'react';

export const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative inline-block">
      {React.Children.map(children, child => {
        if (child.type === TooltipTrigger) {
          return React.cloneElement(child, { setIsOpen, isOpen });
        }
        if (child.type === TooltipContent) {
          return isOpen ? React.cloneElement(child, { isOpen }) : null;
        }
        return child;
      })}
    </div>
  );
};

export const TooltipTrigger = ({ children, setIsOpen, asChild }) => {
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  
  if (asChild) {
    return React.cloneElement(children, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    });
  }
  
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

export const TooltipContent = ({ children, side = 'bottom', className = '' }) => {
  const positions = {
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };
  
  return (
    <div className={`absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-lg whitespace-nowrap ${positions[side]} ${className}`}>
      {children}
      <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
        side === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' :
        side === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' :
        side === 'left' ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2' :
        'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
      }`} />
    </div>
  );
};
