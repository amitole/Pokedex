import React from 'react';
import { Chip, styled } from '@mui/material';
import { getTypeColor } from '../../utils/pokemonTypes';
import { capitalize } from '../../utils/formatters';

interface TypeChipProps {
  type: string;
  size?: 'small' | 'medium';
  className?: string;
}

const StyledChip = styled(Chip)({
  margin: '0 4px 4px 0',
  fontWeight: 'bold',
  textTransform: 'capitalize',
});


const TypeChip: React.FC<TypeChipProps> = ({ type, size = 'small', className }) => {
  return (
    <StyledChip
      label={capitalize(type)}
      size={size}
      className={className}
      sx={{
        backgroundColor: getTypeColor(type),
        color: '#fff',
        fontSize: size === 'small' ? '0.75rem' : '1rem',
        height: size === 'small' ? 24 : 32,
      }}
    />
  );
};

export default TypeChip; 