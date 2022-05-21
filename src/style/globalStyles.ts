const globalStyle = {
  html: {
    fontSize: 10,
    minHeight: '100vh',
    height: '100px',
  },
  body: {
    fontFamily: ['Sarpanch', 'sans-serif'].join(','),
  },
  'h1,h2,h3,h4,h5,h6,p': {
    margin: '0',
    padding: '0',
  },
  'ol, ul': {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  '::-webkit-scrollbar': {
    width: '6px',
  },
  '::-webkit-scrollbar:horizontal': {
    height: '6px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'grey',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgb(218, 218, 218)',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgb(255, 255, 255)',
  },

  'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
    display: 'none',
  },
};

export default globalStyle;
