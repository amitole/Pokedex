import React from 'react';
import { TextField, InputAdornment, Box, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  label = 'Search',
  fullWidth = true,
  className,
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };
  
  return (
    <Box className={className} sx={{ mb: 4 }}>
      <TextField
        fullWidth={fullWidth}
        variant="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          // Add end adornment with clear button when there's text
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleClear}
                edge="end"
                aria-label="clear search"
                size="small"
                sx={{ 
                  visibility: value ? 'visible' : 'hidden',
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  }
                }}
              >
                <Clear fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          display: 'block',
          '& .MuiOutlinedInput-root': {
            borderRadius: 4
          }
        }}
      />
    </Box>
  );
};

export default SearchInput; 