 
export const pagination = {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  }
 
export const gridContainer =  (theme) => ({
  [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    }
  })
  
  
export const buttonSearch = (theme) => ({
    left: '25%',
    width: '50%',
    margin: theme.spacing(1)
  })

export const buttonSearchAdd = (theme) => ({
    left: '65%',
    width: '35%',
    margin: theme.spacing(1),
    display: 'none',
    [theme.breakpoints.down("sm")] : {
      display: 'block'
    }
  })
  
 
   
  
export  const paper = (theme)=>  ({
    padding: theme.spacing(2),
  })
  
  export const paperSx = (theme) => ({
    position: 'fixed',
    top: '10rem',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    right: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      top: '20rem', 
    },
    [theme.breakpoints.down('md')]: {
      top: '15rem', 
    }
  })

  
  export  const pencil = {
    position: 'absolute', 
    top : '25%', 
    right : '2%', 
    borderRadius : '50%', 
    backgroundColor: 'white', 
    width: '3.0rem', 
    height: '3.0rem',
    padding: '1rem', 
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
  }