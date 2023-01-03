
export const media = {
  borderRadius: '20px',
objectFit: 'cover',
width: '100%',
maxHeight: '600px',
}

export const section = (theme) => ({
    borderRadius: '20px',
    margin: theme.spacing(5),
    flex: 1,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    }
})

export const card = (theme) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {  
      flexDirection: 'column-reverse',
      gap: '3rem', 
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap', 
    },
  boxShadow: 'none', 
})

export const paper = (theme) => ({
  boxShadow: 'none', 
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(4)
  },
})

export const divider = (theme) => ({
  display: 'none',
  [theme.breakpoints.down("md")]: {
    display : 'block'
  }
})

export const commentsInnerContainer = (theme) => ({
    overflowY: 'auto', 
    maxHeight: '500px',
    width: '100%',
    boxShadow: 'none',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]:{
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]:{
      margin: 0,
      padding: 0,
    },
})


export const commentsOuterContainer = (theme) => ({
  width: '70%',
  boxShadow: 'none',
  [theme.breakpoints.down('md')]:{
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]:{
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
})


export const loadingPaper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '15px',
  height: '39vh',
}

export const recommendedSx = (theme) => ({
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
})

export const imageSection = (theme) => ({
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
})

export const paperPostSX = (theme) => ({
  boxShadow: 'none',
  display: 'flex',
  margin: theme.spacing(2), 
  marginTop: theme.spacing(4), 
  cursor: 'pointer',
  gap: '2rem', 
  [theme.breakpoints.down('sm')] : {
    flexDirection: 'column-reverse',
    gap: '1rem', 
  },
  [theme.breakpoints.down('md')] : {
    flexDirection: 'column-reverse',
    gap: '2rem', 
  }
})

 
export const imgSx = (theme)=> ({
  borderRadius: '2rem', 
  [theme.breakpoints.down('sm')] : {
    borderRadius: '0.6rem',
    width: '100%'
  },
  [theme.breakpoints.down('md')] : {
    margin: 'auto'
  }
})

export const paperRecommend = (theme) => ({ 
  boxShadow: 'none',
})

export const boxPaper = (theme) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
})