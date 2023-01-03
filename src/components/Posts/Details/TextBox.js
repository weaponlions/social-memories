import React, {useState, useEffect, useRef} from 'react';
import { TextField, Button, Divider, Paper} from '@mui/material';
import { createComment } from '../../../Redux/actions';
import { RESET_TAG, START } from '../../../Redux/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { divider, boxPaper } from './styles'; 
import { Link } from 'react-router-dom'; 

export const TextBox = ({postID}) => {  
  const tagUser = useSelector((state) => state.tagUserReducer)
  const refs = useRef()
  const [comment, setComment] = useState(''); 
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.spyReducer)
   

  const handleComment = async () => {  
    const owner = JSON.parse(localStorage.getItem('keywords'))
    await dispatch(createComment({message : comment, userName : owner['username'], userLogo : owner['picture'], userID : owner['id'], targetedUser : (tagUser && tagUser['username']), parentID : (tagUser && tagUser['parentID']) }, postID))
    await dispatch({type: RESET_TAG})
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
    (<Paper component={'div'} sx={boxPaper}> 
          <Divider sx={divider} /> 
          <TextField inputRef={refs} fullWidth minRows={5} variant="outlined" label="Write a comment" value={comment} onChange={(e) => setComment(e.target.value)} > </TextField>
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={ comment ? !comment.length : false} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
    </Paper>) 
    : (
        <>
        <Paper component={'div'} sx={(theme) => ( { margin : theme.spacing(2), padding: theme.spacing(3), boxShadow: 'none' })} > 
            <Button component={Link} fullWidth onClick={() => dispatch({type : START})} to='/auth' variant='contained' color='secondary' >Please Sign In</Button> 
        </Paper>
        </>
    )
    }
    </>
  )
}
