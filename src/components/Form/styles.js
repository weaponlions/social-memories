 
 export const root = (theme) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
 })


 export const paper = (theme) => ({
  paddingTop: theme.spacing(3),  
  marginTop: theme.spacing(3), 
  backgroundColor: 'white',
  [theme.breakpoints.down('md')]: {
    right : 0,
    left: 50,
    margin: 0
  }
 })

 export const form = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
 }

 export const fileInput = {
  margin: '10px 0',
 }

 export const buttonSubmit = (theme) => ({
  marginBottom: theme.spacing(2),
 })

 
 export const buttonSearchAdd = (theme) => ({
  left: '30%',
  width: '35%',
    margin: theme.spacing(1),
    display: 'none',
    [theme.breakpoints.down("sm")] : {
      display: 'block'
    }
 })

 