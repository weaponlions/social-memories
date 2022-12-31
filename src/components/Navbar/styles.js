import { styled } from '@mui/material/styles';

import { deepPurple } from '@mui/material/colors';

import { AppBar, Typography, Toolbar, Avatar } from '@mui/material';


export const MyAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 50px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  backgroundColor : '#dde3ff'
}));

export const MyTypography = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
}))

export const MyToolbar = styled(Toolbar)(({theme}) => ({
  display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
}))

export const MyAvatar = styled(Avatar)(({theme}) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
}))

export const profile = (theme) => ({ 
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'transparent', 
    boxShadow: 'none', 
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      margin: theme.spacing(3),
      justifyContent: 'center',
    },
})

export const userName = (theme) => ({
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center', 
      marginLeft: theme.spacing(1)
    })

export const purple = (theme) => ({
     color: theme.palette.getContrastText(deepPurple[500]),
          backgroundColor: deepPurple[500],
   })


export const disabled = {
  pointerEvents : 'none'
  }

 
export const brandContainer = { 
  display: 'flex',
    alignItems: 'center',
   }
 
 
export const logout = { 
  marginLeft: '20px',
   } 


export const image = { 
      marginLeft: '10px',
      marginTop: '5px',
   } 


// makeStyles((theme) => ({
//   appBar: {
//     borderRadius: 15,
//     margin: '30px 0',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px 50px',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//     },
//     backgroundColor : '#dde3ff'
//   },
//   heading: {
//     color: theme.palette.primary.main,
//     textDecoration: 'none',
//     fontSize: '2em',
//     fontWeight: 300,
//   },
//   image: {
//     marginLeft: '10px',
//     marginTop: '5px',
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     width: '400px',
//     [theme.breakpoints.down('sm')]: {
//       width: 'auto',
//     },
//   },
//   profile: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '400px',
//     alignItems: 'center',
//     [theme.breakpoints.down('sm')]: {
//       width: 'auto',
//       marginTop: 20,
//       justifyContent: 'center',
//     },
//   },
//   logout: {
//     marginLeft: '20px',
//   },
//   userName: {
//     display: 'flex',
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   brandContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   purple: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//   },
//   disabled : {
//     pointerEvents : 'none'
//   }
// }));