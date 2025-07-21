import React from 'react';

export const Checkbox = React.forwardRef(({ 
  className = '', 
  checked = false,
  onCheckedChange,
  ...props 
}, ref) => {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
      ref={ref}
      checked={checked}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';
