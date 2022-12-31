import React from "react"; 
import Post from "./Post/Post";
import { emptyContainer, mainContainer} from "./styles";
import { Grid, CircularProgress, Paper, Typography } from "@mui/material"; 

const Posts = ({ posts }) => {
 
  const NoDataPaper = ({message}) => {
    return (
      <>
        <Paper sx={emptyContainer} >
          <Typography variant="h5" align="center" style={{ padding: '5% 10%', }}  color="textPrimary" component="span"  >
             { message }
          </Typography>
        </Paper> 
      </>
    );
  };

  // eslint-disable-next-line
  if (!posts && !posts[0] && !posts[0]["data"]) {
    return (
      <NoDataPaper message={'No Data Found Please Create Your Post'} />
    );
  }

  return (
    <>
    { 
      ((posts && posts[0]) && !posts[0]["data"]) && 
        (
        <NoDataPaper message={'No Data Found Please Create Your Post'}  />
      )
    }
      {!posts ? (
        <CircularProgress />
      ) : (
        <Grid
          sx={mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        > 
          {
            posts && (
              posts[0] && (
                posts[0]["data"] && (
                  posts[0]["data"].length > 0 && (
                    posts[0]["data"].map((post) => {
                      return (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                          <Post post={post} />
                        </Grid>
                      );
                    })
                  )  
                )  
              )  
            ) 
          }
        </Grid>
      )}
    </>
  );
};

export default Posts;
