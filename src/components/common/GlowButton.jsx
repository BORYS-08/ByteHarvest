import React from 'react';

/**
 * Btn — farmer-friendly, clean action button.
 *
 * Props:
 *   variant:
 *   'primary' | 'secondary' | 'danger' | 'ghost' |
 *   'outline' | 'amber' | 'cyan' | 'emerald' | 'rose'
 *
 *   size: 'sm' | 'md' | 'lg'
 */

export const Btn = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const variants = {
    primary:
      'bg-green-700 hover:bg-green-800 text-white border border-green-700/40',

    secondary:
      'bg-white hover:bg-gray-50 text-(--text-primary) border border-(--border-mid)',

    danger:
      'bg-red-600 hover:bg-red-700 text-white border border-red-600/40',

    ghost:
      'bg-transparent hover:bg-black/5 text-(--text-secondary) hover:text-(--text-primary) border border-transparent',

    outline:
      'bg-white hover:bg-green-50 text-(--text-primary) border border-(--border-mid) hover:border-green-600/40',

    amber:
      'bg-amber-600 hover:bg-amber-700 text-white border border-amber-600/40',

    cyan:
      'bg-sky-600 hover:bg-sky-700 text-white border border-sky-600/40',

    emerald:
      'bg-green-700 hover:bg-green-800 text-white border border-green-700/40',

    rose:
      'bg-red-600 hover:bg-red-700 text-white border border-red-600/40',
  };

  const sizes = {
    sm:
      'px-3 py-2 text-sm min-h-10 rounded-md gap-2',

    md:
      'px-4 py-3 text-base min-h-12 rounded-md gap-2',

    lg:
      'px-5 py-3 text-base min-h-12 rounded-md gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        font-semibold
        transition-colors
        duration-150
        cursor-pointer
        active:scale-[0.98]
        disabled:opacity-40
        disabled:pointer-events-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {children}
    </button>
  );
};


/**
 * GlowButton — backward-compatible alias.
 * Kept so existing components continue working.
 */
export const GlowButton = ({
  children,
  onClick,
  variant = 'emerald',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => (
  <Btn
    variant={variant}
    size={size}
    className={className}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {children}
  </Btn>
);