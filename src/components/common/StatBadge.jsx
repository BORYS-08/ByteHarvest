import React from 'react';

const colorMap = {
  green: {
    dot: 'bg-green-600',
    text: 'text-green-700',
    value: 'text-(--text-primary)',
  },

  red: {
    dot: 'bg-red-600',
    text: 'text-red-700',
    value: 'text-(--text-primary)',
  },

  amber: {
    dot: 'bg-amber-600',
    text: 'text-amber-700',
    value: 'text-(--text-primary)',
  },

  blue: {
    dot: 'bg-blue-600',
    text: 'text-blue-700',
    value: 'text-(--text-primary)',
  },

  neutral: {
    dot: 'bg-slate-500',
    text: 'text-(--text-secondary)',
    value: 'text-(--text-primary)',
  },

  /* Compatibility aliases */
  emerald: {
    dot: 'bg-green-600',
    text: 'text-green-700',
    value: 'text-(--text-primary)',
  },

  cyan: {
    dot: 'bg-blue-600',
    text: 'text-blue-700',
    value: 'text-(--text-primary)',
  },

  rose: {
    dot: 'bg-red-600',
    text: 'text-red-700',
    value: 'text-(--text-primary)',
  },
};

/**
 * MetricCard — clean dashboard KPI tile.
 */
export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'neutral',
  trend,
}) => {
  const c = colorMap[color] || colorMap.neutral;

  return (
    <div className="card p-4 space-y-3">

      <div className="flex items-center justify-between gap-3">

        <span className="metric-label">
          {title}
        </span>

        {Icon && (
          <div
            className="p-2 rounded-md"
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-base)',
            }}
          >
            <Icon className={`w-5 h-5 ${c.text}`} />
          </div>
        )}

      </div>

      <div>

        <div className="flex items-baseline gap-2">

          <span
            className={`text-2xl font-bold tracking-tight ${c.value}`}
          >
            {value}
          </span>

          {trend && (
            <span
              className={`text-sm font-medium ${c.text}`}
            >
              {trend}
            </span>
          )}

        </div>

        {subtitle && (
          <p
            className="text-sm mt-1"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            {subtitle}
          </p>
        )}

      </div>

    </div>
  );
};

/**
 * StatBadge — backward-compatible alias → MetricCard
 */
export const StatBadge = (props) => (
  <MetricCard {...props} />
);