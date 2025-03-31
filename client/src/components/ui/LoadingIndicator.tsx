import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingIndicatorProps {
  size?: number;
  fullHeight?: boolean;
  className?: string;
}


const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 40,
  fullHeight = false,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullHeight ? '70vh' : 'auto',
        my: fullHeight ? 0 : 4,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingIndicator; 