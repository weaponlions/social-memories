import React, { useState, useEffect } from "react";
import { Grid, Grow, Container, Paper } from "@mui/material"; 
import { useSelector, useDispatch } from "react-redux";
import Posts from "../Posts/Posts";
import { Form } from "../Form/Form";
import { gridContainer, pagination, paper, paperSx, pencil } from "./styles";
import { Pagination } from "../Pagination";
import { getPostsBySearch } from "../../Redux/actions";  
import { useNavigate, useParams } from "react-router-dom";
import { SearchTool } from "./SearchTool"; 
import SearchIcon from '@mui/icons-material/Search';
import PencilIcon from '@mui/icons-material/Create';
import ResetIcon from '@mui/icons-material/RotateLeft';
import { RESET, END, START } from "../../Redux/actionTypes";

export const Home = () => { 


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();
  const { creator } = useParams();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [reset, setReset] = useState(false); 

  const posts = useSelector((state) => state.postReducer);
  const isLoading = useSelector((state) => state.loadingReducer);
  const isLogged = useSelector((state) => state.spyReducer);
  const page = (posts ? (posts[0] ? posts[0]['currentPage'] : 1) : 1);
  const totalPage = (posts ? (posts[0] ? posts[0]['totalPage'] : 1) : 1);
 
 
  useEffect(() => {
    if (tag){
      Sleep(500, 'SEARCH_TAG')
    }
    else if(creator){
      Sleep(500, 'SEARCH_CREATOR')
    }
    else{
      if (!posts || !posts[0] || !posts[0]["data"]) {
          Sleep(500, 'SEARCH_PAGE')
      }
    }
    // eslint-disable-next-line
  }, [dispatch, tag, creator])
 
  useEffect(() => {
    if(posts && posts[0] && posts[0]["data"]) {
      Sleep(500)
    }
    else if(posts && posts[0] && !posts[0]["data"]) {
      Sleep(200)
    }
    // eslint-disable-next-line
  }, [dispatch])
  
  

 const Sleep = (time, key) => {
  dispatch({type: START})
  setTimeout( ()=> {
    switch (key) {
      case 'SEARCH_TAG':
        searchPost([tag]);
        break;

      case 'SEARCH_CREATOR':
        dispatch(getPostsBySearch({page:1, creator: creator}));
        break;
  
      case 'SEARCH_PAGE':
        dispatch(getPostsBySearch({page:1}));
        break;

      default:
        dispatch({type: END});
        break;
    }  
  }, time)
 }
 

  const searchPost = async(tags) => {
    if (title.trim() || tags) {
      await dispatch(getPostsBySearch({ title, tags: tags.join(",")}));
    }
  };
 
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // open Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClickOpenSearch = () => {
    setOpenSearch(true);
  };
 
  //Reset Values
  const resetSearch = () => {
    dispatch({type : RESET});
    setOpen(false);
    setOpenSearch(false);
    setReset(false);
    setTitle("");
    setTags([]);
    dispatch({type: START})
    navigate('/');
  };

 
  
  return (
    <>
    <Paper component="div" sx={paperSx} >
      <SearchIcon sx={pencil} onClick={handleClickOpenSearch} />
      {isLogged && <PencilIcon onClick={handleClickOpen} sx={pencil} style={{top: '7rem'}} />} 
      {!isLogged &&  (page > 1 || reset || tag) && (<ResetIcon sx={pencil} onClick={resetSearch} style={{top: '7rem'}} />) } 
      {isLogged && (page > 1 || reset || tag) && (<ResetIcon sx={pencil} onClick={resetSearch} style={{top: '14rem'}} />) } 
     </Paper>
    <Form setOpen={setOpen} open={open} />
    <SearchTool setOpenSearch={setOpenSearch} openSearch={openSearch} tags={tags} setTags={setTags} title={title} setTitle={setTitle} setReset={setReset} />  

    { !isLoading && (
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            sx={gridContainer}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={10} sm={10} md={11} >
              <Posts posts={posts} />
            </Grid> 
            <Container maxWidth={'sm'} >
            {
                totalPage > 1 && (<Paper sx={[pagination, paper]} elevation={6}>
                  <Pagination page={page} totalPage={totalPage} tags={tags} title={title} />
                </Paper>)
              } 
            </Container>
          </Grid>
        </Container>
      </Grow>
    )}
    </>
  );
};
 
