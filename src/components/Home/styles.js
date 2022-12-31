 
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
  
export  const pencil = {
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
  }
   
  
export  const paper = (theme)=>  ({
    padding: theme.spacing(2),
  })
  
