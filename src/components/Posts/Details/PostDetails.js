import React, { useEffect } from 'react';
import { Paper, Typography, Divider, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { singlePost } from '../../../Redux/actions';
import CommentSection from './CommentSection';
import { card, section, imageSection, media, paper, recommendedSx, paperPostSX, imgSx, paperRecommend } from './styles';
import { END, START } from '../../../Redux/actionTypes';
import Image from '../../../images/Text.png'

export const PostDetails = () => {
  
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.singlePost);
    const recommendedPosts = useSelector((state) => state.recommendedReducer);
    const isLoading = useSelector((state) => state.loadingReducer)
    const navigate = useNavigate()
    const location = useLocation()

    const fetch = async () => { 
      await dispatch(singlePost(id)) 
      if(post?.message === 'Request failed with status code 403'){
        navigate('/')
      } 
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

  const openPost = async (id) => {
    location['key'] = id;
    dispatch({type : START});
    navigate(`/posts/${id}`);
  };
  
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
            <Link onClick={()=> dispatch({type : START}) } to={`/posts/creators/${post && post?.creator && post.creator}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {`${post && post?.creator && post.creator}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post ? post?.createdAt ? post.createdAt : '' : '').fromNow()}</Typography>
        </Paper>
        <Box component={"div"} sx={imageSection}>
          <img style={media} alt={post ? post?.title ? post.title : '' : ''} src={post ? post?.selectedFile ? post.selectedFile : Image : Image}  />
        </Box>
      </Paper> 
          
      {(recommendedPosts.length !== 0 )&& ( 
        <Paper component={'div'} sx={section}>
          {(recommendedPosts[0] !== undefined) && (
            <>
            <Typography gutterBottom variant="h5">You might also like:</Typography>
            <Divider />
            </>
           )
          } 
          <Paper component={'div'} sx={recommendedSx}> 
            {recommendedPosts[0] && recommendedPosts[0].map(({ title, message, likes, selectedFile, _id }, i) => 
            (id !== _id) &&
            (
              <Paper component={'div'} sx={paperPostSX} onClick={() => openPost(_id)} key={i}>
                  <Paper component={'div'} sx={paperRecommend}> 
                  <Typography gutterBottom variant="h5">{title}</Typography> 
                  <Typography gutterBottom variant="subtitle2">Likes: <span style={{color: 'blue'}}>{likes && likes.length }</span></Typography>
                  <Typography gutterBottom variant="subtitle1">{(message && window.screen.width !== 393) ? message.slice(0,300) : (message && message.slice(0,150))} <span style={{color: 'blue'}}>....Read More</span></Typography>
                  </Paper>
                  <Box component={'img'} src={selectedFile} sx={imgSx} width="300px" alt='loading' />
                </Paper>
            )
            )}
          </Paper>
        </Paper>
      )}
      
      <Divider style={{ margin: '20px 0' }} />
        
      <CommentSection postID={id ? id : null} />
    </Paper> 
    )}
    </>
  )
}

