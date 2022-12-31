import React, {useState, useEffect, useRef} from 'react';
import {Typography, TextField, Button, Divider} from '@mui/material';
import { createComment } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { divider } from './styles'

export const TextBox = ({postID}) => {  
  const tagUser = useSelector((state) => state.tagUserReducer)
  const refs = useRef()
  const [comment, setComment] = useState(); 
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.spyReducer)
   

  const handleComment = async () => {  
    const owner = JSON.parse(localStorage.getItem('keywords'))
    await dispatch(createComment({message : comment, userName : owner['username'], userLogo : owner['picture'], userID : owner['id'], targetedUser : (tagUser && tagUser['username']), parentID : (tagUser && tagUser['parentID']) }, postID))
    await dispatch({type: 'RESET_TAG'})
    setComment('');
  };

  useEffect(() => {
    if(tagUser){
      setComment((`${tagUser ? `@${tagUser['username']} - ` : ''}`))
      refs.current.focus()
    } 
  }, [tagUser])
   
  return (
    <>
    { isLogged ? 
    (<div style={{ width: '70%' }}> 
          <Divider sx={divider} />
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField inputRef={refs} fullWidth minRows={5} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} > </TextField>
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={ comment ? !comment.length : false} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
    </div>) 
    : (
        <>
        <div style={{"display" : "flex", "justifyContent" : "center", "alignItems": "center", "width": "50%", "height": "100%"}}>
            <h1>Login Please</h1>
        </div>
        </>
    )
    }
    </>
  )
}
