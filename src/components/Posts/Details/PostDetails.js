import React, { useEffect } from 'react';
import { Paper, Typography, Divider, Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { singlePost } from '../../../Redux/actions';
import CommentSection from './CommentSection';
import { card, section, imageSection, media, paper } from './styles';
import { END } from '../../../Redux/actionTypes'; 
import Image from '../../../images/Text.png'


export const PostDetails = () => {
  
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.singlePost);
    const isLoading = useSelector((state) => state.loadingReducer)

    const fetch = async () => { 
      await dispatch(singlePost(id))
    } 

    useEffect(() => {
        if (id) {
          fetch()
        }
        // eslint-disable-next-line
    }, [id]);
   
    
  const Sleep = (time) => {
    setTimeout(()=> {
      dispatch({type: END});
    }, time);
  };
   Sleep(1000);


  return (
    <>
    { !isLoading && (
    <Paper style={{ padding: '20px', borderRadius: '15px', fontFamily: "Roboto" }} elevation={6} >
      <Paper component={"div"} sx={card}>
        <Paper component={"div"} sx={paper} >
          <Typography variant="h3" component="h2">{post ? post?.title ? post.title : '' : ''}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post ? post?.tags ? post.tags.length > 0 ? post.tags.map((tag) => (
            <Link to={`/posts/tags/${tag}`} key={tag} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          )) : '' : '' : ''}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post ? post?.message ? post.message : '' : ''}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post ? post?.creator ? post.creator : '' : ''}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post ? post?.creator ? post.creator : '' : ''}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post ? post?.createdAt ? post.createdAt : '' : '').fromNow()}</Typography>
          {/* <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} /> */} 
        </Paper>
        <Box component={"div"} sx={imageSection}>
          <img style={media} alt={post ? post?.title ? post.title : '' : ''} src={post ? post?.selectedFile ? post.selectedFile : Image : Image}  />
        </Box>
      </Paper>
          <Divider style={{ margin: '20px 0' }} />
        
        <CommentSection postID={id ? id : null} />
          
      {/* {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" alt='loading' />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </Paper> 
    )}
    </>
  )
}

