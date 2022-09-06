import { styled } from '@mui/material';

export const TextAreaStyled = styled('textarea')<{
  width: number;
  max_width: number;
  disabled: React.TextareaHTMLAttributes<HTMLTextAreaElement> | boolean | undefined;
}>(({ theme, width, max_width, disabled }) => ({
  color: theme.colors.white,
  textAlign: 'center',
  padding: '0px',
  minWidth: disabled ? '50px' : '30px',
  width: `${width * 12}px`,
  maxWidth: `${max_width}px`,
  height: '30px',
  lineHeight: '30px',
  fontFamily: theme.fonts.sarpanch,
  fontSize: '1.2rem',
  caretColor: 'rgba(255,255,255,0.4)',
  backgroundColor: disabled ? 'rgba(0,0,0,.8)' : width ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
  cursor: disabled ? 'default' : 'cell',
  border: 'none',
  resize: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  '&:hover': {
    backgroundColor: !disabled && 'rgba(0,0,0,0.4)',
  },
  '&:focus': {
    outline: 'none',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));
