import { styled } from '@mui/material';

export const TextAreaStyled = styled('textarea')<{
  width: number;
  max_width: number;
  disabled: React.TextareaHTMLAttributes<HTMLTextAreaElement> | boolean | undefined;
}>(({ theme, width, max_width, disabled }) => ({
  color: theme.colors.white,
  textAlign: 'center',
  padding: '0px 5px 0px 5px',
  minWidth: disabled ? '50px' : '30px',
  width: `${width * 12}px`,
  maxWidth: `${max_width}px`,
  height: '30px',
  lineHeight: '30px',
  fontSize: '1.3rem',
  caretColor: 'rgba(255,255,255,0.4)',
  backgroundColor: disabled ? 'rgba(0,0,0,.8)' : width ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
  borderRadius: '3px',
  cursor: disabled ? 'default' : 'cell',
  border: width ? `1px solid ${theme.colors.bgDark}` : 'none',
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
}));
