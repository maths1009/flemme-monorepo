import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`
        relative inline-flex items-center w-12 h-6 rounded-full
        transition-colors duration-200 focus:outline-none
        ${enabled ? 'bg-black' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      
      <span
        style={{
          position: 'absolute',
          top: '4px',
          left: enabled ? '28px' : '4px',
          width: '16px',
          height: '16px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transition: 'left 0.2s ease'
        }}
      />
    </button>
  );
};
