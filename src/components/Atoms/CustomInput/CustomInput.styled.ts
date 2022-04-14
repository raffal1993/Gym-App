import { styled } from '@mui/material';

export const TextAreaStyled = styled('textarea')<{ width: number; max_width: number }>(
  ({ theme, width, max_width }) => ({
    color: theme.colors.white,
    textAlign: 'center',
    padding: '0px 5px 0px 5px',
    minWidth: '30px',
    width: `${width * 12}px`,
    maxWidth: `${max_width}px`,
    height: '30px',
    lineHeight: '30px',
    fontSize: '1.3rem',
    caretColor: 'rgba(255,255,255,0.4)',
    backgroundColor: width ? 'rgba(0,0,0,0.2)' : 'transparent',
    borderRadius: '3px',
    cursor: 'cell',
    border: width ? `1px solid ${theme.colors.bgDark}` : 'none',
    resize: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
  }),
);
