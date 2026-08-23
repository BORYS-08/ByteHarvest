import React from 'react';

/**
 * DashCard — solid dark surface card.
 * Props:
 *   accent?: 'green' | 'red' | 'amber' | 'blue' | 'none'
 *   hover?: boolean — adds subtle hover state
 *   className?: string
 */
export const DashCard = ({ children, className = '', accent = 'none', hover = false }) => {
  const accentBorder = {
    green:  'border-l-2 border-l-green-500/60',
    red:    'border-l-2 border-l-red-500/60',
    amber:  'border-l-2 border-l-amber-500/60',
    blue:   'border-l-2 border-l-blue-500/60',
    none:   '',
  }[accent] || '';

  return (
    <div
      className={`card ${accentBorder} ${hover ? 'card-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * GlassCard — backward-compat alias. Maps to DashCard.
 * Kept so old imports don't break. glowColor is ignored.
 */
export const GlassCard = ({ children, className = '', hover = true, glowColor = 'none' }) => {
  const accentMap = {
    emerald: 'green',
    cyan:    'blue',
    amber:   'amber',
    rose:    'red',
    none:    'none',
  };
  return (
    <DashCard accent={accentMap[glowColor] || 'none'} hover={hover} className={className}>
      {children}
    </DashCard>
  );
};
