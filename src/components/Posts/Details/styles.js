
export const media = {
  borderRadius: '20px',
objectFit: 'cover',
width: '100%',
maxHeight: '600px',
}

export const section = {
  borderRadius: '20px',
    margin: '10px',
    flex: 1,
}

export const card = (theme) => ({
  display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  boxShadow: 'none'
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

export const commentsInnerContainer = (theme) => ({
    height: '400px',
    overflowY: 'auto', 
    width: '100%',
    boxShadow: 'none',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]:{
      marginBottom: theme.spacing(3),
    },
})

export const divider = (theme) => ({
  display: 'none',
  [theme.breakpoints.down("md")]: {
    display : 'block'
  }
})

export const commentsOuterContainer = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: 'none',
  [theme.breakpoints.down('md')]:{
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
export const recommendedPosts = (theme) => ({
    display: 'flex',
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


// export default makeStyles((theme) => ({
//   media: {
//     borderRadius: '20px',
//     objectFit: 'cover',
//     width: '100%',
//     maxHeight: '600px',

//   },
//   card: {
//     display: 'flex',
//     width: '100%',
//     [theme.breakpoints.down('sm')]: {
//       flexWrap: 'wrap',
//       flexDirection: 'column',
//     },
//   },
//   section: {
//     borderRadius: '20px',
//     margin: '10px',
//     flex: 1,
//   },
//   imageSection: {
//     marginLeft: '20px',
//     [theme.breakpoints.down('sm')]: {
//       marginLeft: 0,
//     },
//   },
//   recommendedPosts: {
//     display: 'flex',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//     },
//   },
//   loadingPaper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '20px',
//     borderRadius: '15px',
//     height: '39vh',
//   },
//   commentsOuterContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'end'
//   },
//   commentsInnerContainer: {
//     height: '500px',
//     overflowY: 'auto',
//     marginRight: '30px',
//     width: '100%'
//   },
// }));
