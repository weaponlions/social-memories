 
export const paper = (theme) =>  ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2), 
})

export const root = (theme) => ({ 
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
})

export const avatar = (theme) => ({ 
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main, 
})

export const form ={
  width: '100%',
}
 

export const submit = (theme) => ({
  margin: theme.spacing(3, 0, 2),
})

export const googleButton = (theme) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
})
 