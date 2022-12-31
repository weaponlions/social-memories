import React, {useState, forwardRef, useEffect, useRef } from 'react' 
import { Dialog, Button, Slide, Typography, Divider, TextField, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import { paper, root, buttonSubmit, fileInput, form, buttonSearchAdd } from "./styles"; 
import { useDispatch, useSelector } from "react-redux";
import { createPost, erasePostID, updatePost } from "../../Redux/actions";
import { Chip } from '@mui/material';
import { SEND } from '../../Redux/actionTypes';

const initialState = {
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};
 
const Transition = forwardRef(function Transition(props, ref) {
    return (<Slide direction="left" ref={ref} {...props} />);
});
   

export const Form = ({open, setOpen}) => { 
    const dispatch = useDispatch(); 
    const posts = useSelector((state) => state.postReducer);
    const postID = useSelector((state) => state.updateIdReducer);
    const isLogged = useSelector((state) => state.spyReducer);
    const [postData, setPostData] = useState(initialState);
    const [track, setTrack] = useState();

    const tagRef = useRef();
    const titleRef = useRef()
    const messageRef = useRef()
  
    const loadData = async () => {
      // eslint-disable-next-line
      const post = posts[0]["data"].filter((post) => {
        if(post._id === postID)
          return post;
      })[0];

      setPostData({
        ...post,
        tags: post["tags"],
        old_file: post["selectedFile"],
        selectedFile: "",
      });
      setOpen(true);
      return post;
    };

    useEffect(() => {
      if (postID != null) loadData();
      // eslint-disable-next-line
    }, [postID]);

     
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      // validate 
      if(postData['title'] === ''){
        titleRef.current.focus()
        return dispatch({ type : SEND, payload : { message : "Title is Required", mode : 'warning' } });
      }

      if(postData['message'] === ''){
        messageRef.current.focus()
        return dispatch({ type : SEND, payload : { message : "Message is Required", mode : 'warning' } });
      }

      if(postData['tags'].length === 0){
        tagRef.current.focus()
        return dispatch({ type : SEND, payload : { message : "Tags is Required", mode : 'warning' } });
      }
 
      const form = new FormData();
      form.append("title", postData["title"]);
      form.append("tags", postData["tags"].join(","));
      form.append("message", postData["message"]); 
      
      
      if (postID) { 
        if (postData["selectedFile"] !== '') { 
          form.append("selectedFile", postData["selectedFile"]); 
        }
          dispatch(updatePost(form, postID)); 
       } 
      else {
        if (postData["selectedFile"] === '') { 
          return dispatch({ type : SEND, payload : { message : "Image is Required, Please Upload ", mode : 'warning' } });
        }
        form.append("selectedFile", postData["selectedFile"]);
        dispatch(createPost(form));
      }
      
      handleClear();
      handleClose();
    };
  
    const handleClear = () => {
      setPostData(initialState);
      dispatch(erasePostID()); 
    };
    
    const handleAddChip = (tag) => {  
      if (!(postData['tags'].includes(tag)) && tag !== '') {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      }  
    };
  
    const handleAddChipBtn = () => { 
      if (track !== '' && track !== undefined ) {
        handleAddChip(track);
        tagRef.current.value = '';
        tagRef.current.focus();
      } 
    }; 

    const handleDeleteChip = (chipToDelete) => { 
      setPostData({
        ...postData,
        tags: postData.tags.filter((tag) => tag !== chipToDelete)
      });
    };
  
    const handleClose = () => {
      setOpen(false); 
      handleClear();
    };
    
  return (
    <> 
    <div> 
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={() => (!isLogged && handleClose()) }
        TransitionComponent={Transition} 
        PaperProps={{
          sx : (theme) => ({
            position: 'absolute', 
            right : '10px',
            width : '500px',
            borderRadius: 4,
            marginBottom: '1rem',
            display: 'flex',
            padding: '16px',
            [theme.breakpoints.down('md')] : {
              right: 0,
              left: 0,
              width: '90%',
              margin: theme.spacing(1)
            },
          }),
        }}
      >
        <Button variant="contained" onClick={handleClose} 
            color="secondary"
            size="small" > 
        <CloseIcon onClick={handleClose} style={{margin: '5px'}} /> Close
        </Button>
        { !isLogged && 
            ( 
              <Paper sx={paper} style={{ padding: '5% 10%'}} > 
                  <Typography variant="h6" align="center"> 
                      Please Sign In To create a memories and like other's 
                  </Typography> 
              </Paper>
            )
        }
        { isLogged && 
            ( 
              <Paper sx={paper} style={{ padding: '5% 10%'}} > 
                <form
                 autoComplete="off"
                 sx={`${root} ${form} `}
                 style={form} 
                 >
                 <Typography variant="h4">
                   {postID ? "Updating" : "Creating"} Memories
                   <Divider style={{margin : '30px'}} />
                 </Typography> 
                 <TextField
                   name="title"
                   variant="outlined"
                   label="Title"
                   fullWidth
                   value={postData.title}
                   onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                   } 
                   sx={(theme) => ({margin: theme.spacing(1) })}
                   inputRef={titleRef}
                 /> 
                 <TextField
                   name="message"
                   variant="outlined"
                   label="Message"
                   fullWidth
                   multiline 
                   minRows={4}
                   value={postData.message}
                   onChange={(e) =>
                    setPostData({ ...postData, message: e.target.value })
                   } 
                   sx={(theme) => ({margin: theme.spacing(1) })} 
                   inputRef={messageRef}
                 /> 
 
                <TextField
                   InputProps={{
                    startAdornment:
                    (postData['tags'][0] !== undefined) ? (postData['tags'].map((tag)=> (
                      <Chip
                        key={tag}
                        tabIndex={-1}
                        label={tag}
                        onDelete={()=>handleDeleteChip(tag)}
                        sx={(theme)=> ({margin: theme.spacing(1)})}
                      />
                    )) 
                    ) : '',
                    onKeyDownCapture: (e) => {  
                  const value = (e.target.value).trim()
                  setTrack(value) 
                  if (value !== '' && (e.code === "Enter" || e.code === "Space") ) {
                    handleAddChip(value);
                    e.target.value = ""; 
                    tagRef.current.focus()
                  }
                    },
                    sx : { 
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                     },
                     placeholder: (track === "" || track === undefined ) ? "Write Tag" : "Write Tag",
                   }} 
                   variant="outlined"
                   fullWidth
                   sx={(theme) => ({margin: theme.spacing(1) })} 
                   label = "Write Tag (Press Space for Multiple)"
                   inputRef= {tagRef} 
                 /> 

                 { track && track !== '' && track !== undefined && <Button 
                  variant="contained"
                  color="primary"
                  sx={buttonSearchAdd} 
                  onClick={handleAddChipBtn}
                  >
                    ADD Tag
                  </Button> } 
                 
                 <div style={{margin : '10px'}} >
                   <input type='file' style={fileInput} onChange={(e)=>{  
                    const file = e.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPostData({ ...postData, selectedFile: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                   }} accept="image/*" /> 
                 </div> 
                 <Button
                   color="primary"
                   size="large"
                   variant="contained"
                   type="submit"
                   fullWidth
                   sx={buttonSubmit} 
                  onClick={handleSubmit}
                 >
                   Submit
                 </Button>
                 <Button
                   color="secondary"
                   size="small"
                   variant="contained"
                   fullWidth
                   sx={buttonSubmit}
                   onClick={handleClear}
                 >
                   Clear
                 </Button>
                </form> 
              </Paper>
            )
        }
      </Dialog>
    </div>
  
    </>
  )
} 