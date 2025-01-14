import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledLabel = styled(Box)(({ theme, ownerState }) => {
  const lightMode = theme.palette.mode === 'light';
  const color = ownerState.color || 'default';
  const filledVariant = ownerState.variant === 'filled';
  const outlinedVariant = ownerState.variant === 'outlined';
  const softVariant = ownerState.variant === 'soft';

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    textTransform: 'capitalize',
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(filledVariant && {
      color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: color === 'default' ? theme.palette.text.primary : color,
    }),
    ...(outlinedVariant && {
      backgroundColor: 'transparent',
      color: color === 'default' ? theme.palette.text.primary : color,
      border: `2px solid ${color === 'default' ? theme.palette.text.primary : color}`,
    }),
    ...(softVariant && {
      color: color === 'default' ? theme.palette.text.secondary : color,
      backgroundColor: alpha(color === 'default' ? theme.palette.grey[500] : color, 0.16),
    }),
  };
});
