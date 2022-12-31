import React, { useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { commentsInnerContainer, commentsOuterContainer } from './styles';
import { getComments } from '../../../Redux/actions';
import { Comments } from './Comment/Comments'; 
import { TextBox } from './TextBox';


const CommentSection = ({ postID }) => { 
  
  const dispatch = useDispatch();  
  const comments = useSelector((state) => state.commentReducer) 
    
  useEffect(() => {
    dispatch(getComments({page : 1, postID : postID}))
    // eslint-disable-next-line
  }, [dispatch])
   
  return (
    <div>
      <Paper sx={commentsOuterContainer}>
        <Paper sx={commentsInnerContainer}>
          <Typography gutterBottom variant="h4">Comments</Typography>
          <Comments comment={comments ? comments : null} postID={postID} /> 
        </Paper>
          <TextBox postID={postID} />
      </Paper> 
    </div>
  );
};

export default CommentSection;