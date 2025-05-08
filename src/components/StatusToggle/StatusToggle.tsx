import React from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

interface StatusToggleProps {
  active: boolean;
  onToggle: () => void;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  titleActive?: string;
  titleInactive?: string;
}

const StatusToggle: React.FC<StatusToggleProps> = ({
  active,
  onToggle,
  size = 24,
  activeColor = "#00509e",
  inactiveColor = "#777",
  titleActive = "Clique para desativar",
  titleInactive = "Clique para ativar",
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {active ? (
        <FaToggleOn
          size={size}
          color={activeColor}
          style={{ cursor: 'pointer' }}
          onClick={onToggle}
          title={titleActive}
        />
      ) : (
        <FaToggleOff
          size={size}
          color={inactiveColor}
          style={{ cursor: 'pointer' }}
          onClick={onToggle}
          title={titleInactive}
        />
      )}
    </div>
  );
};

export default StatusToggle;
