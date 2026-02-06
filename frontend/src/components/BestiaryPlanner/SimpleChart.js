import React, { useState, useMemo } from 'react';
import { ChartContainer, ChartSVG, Tooltip } from './SimpleChart.styles';

/**
 * SimpleChart Component (Zero-dependency SVG charts)
 * Feature 4: Progress History
 *
 * @param {Array} data - Array of { date, charmPoints }
 * @param {string} type - 'line' | 'area' | 'bar'
 * @param {number} width - Chart width (default: 600)
 * @param {number} height - Chart height (default: 300)
 * @param {string} color - Primary color (default: '#667eea')
 * @param {boolean} showGrid - Show grid lines (default: true)
 * @param {boolean} showTooltip - Show tooltip on hover (default: true)
 */
const SimpleChart = ({
  data = [],
  type = 'area',
  width = 600,
  height = 300,
  color = '#667eea',
  showGrid = true,
  showTooltip = true,
}) => {
  const [tooltip, setTooltip] = useState(null);

  // Calculate scales and points
  const { points, gridLines, maxValue } = useMemo(() => {
    if (data.length === 0) {
      return { points: [], gridLines: [], maxValue: 0 };
    }

    // Padding
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max value
    const maxValue = Math.max(...data.map((d) => d.charmPoints || 0));
    const yScale = maxValue > 0 ? chartHeight / maxValue : 1;
    const xScale = chartWidth / Math.max(data.length - 1, 1);

    // Calculate points
    const points = data.map((d, i) => ({
      x: padding.left + i * xScale,
      y: padding.top + chartHeight - (d.charmPoints || 0) * yScale,
      data: d,
    }));

    // Grid lines (5 horizontal lines)
    const gridLines = [];
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      const value = Math.round((maxValue / 4) * (4 - i));
      gridLines.push({ y, value });
    }

    return { points, gridLines, maxValue };
  }, [data, width, height]);

  // Generate polyline/polygon points string (after hooks)
  const linePointsString = points.map((p) => `${p.x},${p.y}`).join(' ');

  // For area chart, add bottom corners
  const areaPointsString = useMemo(() => {
    if (points.length === 0) return '';
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartHeight = height - padding.top - padding.bottom;
    const bottomY = padding.top + chartHeight;

    return `${linePointsString} ${lastPoint.x},${bottomY} ${firstPoint.x},${bottomY}`;
  }, [points, linePointsString, height]);

  // Early return AFTER all hooks
  if (data.length === 0) {
    return (
      <ChartContainer>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
          No data available
        </div>
      </ChartContainer>
    );
  }

  // Handle mouse events
  const handleMouseMove = (event, point) => {
    if (!showTooltip) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTooltip({
      x: x + 10,
      y: y - 10,
      label: point.data.date,
      value: point.data.charmPoints,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <ChartContainer>
      <ChartSVG viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {showGrid && (
          <g className="grid">
            {gridLines.map((line, i) => (
              <g key={i}>
                <line
                  x1={40}
                  y1={line.y}
                  x2={width - 20}
                  y2={line.y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text x={5} y={line.y + 4} fontSize="10" fill="#9ca3af">
                  {line.value}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Area gradient definition */}
        {type === 'area' && (
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
        )}

        {/* Chart visualization */}
        {type === 'area' && (
          <>
            <polygon points={areaPointsString} fill="url(#areaGradient)" />
            <polyline
              points={linePointsString}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </>
        )}

        {type === 'line' && (
          <polyline
            points={linePointsString}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}

        {type === 'bar' &&
          points.map((p, i) => {
            const barWidth = Math.max((width - 60) / data.length - 4, 2);
            const padding = { top: 20, right: 20, bottom: 30, left: 40 };
            const chartHeight = height - padding.top - padding.bottom;
            const bottomY = padding.top + chartHeight;
            const barHeight = bottomY - p.y;

            return (
              <rect
                key={i}
                x={p.x - barWidth / 2}
                y={p.y}
                width={barWidth}
                height={barHeight}
                fill={color}
                onMouseMove={(e) => handleMouseMove(e, p)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
              />
            );
          })}

        {/* Data points (circles) */}
        {(type === 'line' || type === 'area') &&
          points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={color}
              onMouseMove={(e) => handleMouseMove(e, p)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'pointer' }}
            />
          ))}
      </ChartSVG>

      {/* Tooltip */}
      {tooltip && showTooltip && (
        <Tooltip style={{ left: tooltip.x, top: tooltip.y }}>
          <div style={{ fontWeight: 'bold' }}>{tooltip.label}</div>
          <div>{tooltip.value} CP</div>
        </Tooltip>
      )}
    </ChartContainer>
  );
};

export default SimpleChart;
