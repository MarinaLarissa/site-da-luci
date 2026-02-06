import styled from 'styled-components';

export const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #1f2937;
  border-radius: 0.5rem;
  padding: 1rem;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const ChartSVG = styled.svg`
  width: 100%;
  height: 100%;

  .grid line {
    stroke: #374151;
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }

  polyline,
  polygon {
    transition: all 0.3s ease;
  }

  circle {
    cursor: pointer;
    transition: r 0.2s ease;

    &:hover {
      r: 6;
    }
  }

  rect {
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  text {
    font-size: 10px;
    fill: #9ca3af;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  div:first-child {
    margin-bottom: 0.25rem;
  }
`;
