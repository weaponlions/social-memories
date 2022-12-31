import React, { useState, useEffect } from "react";
import { Grid, Grow, Container, Paper } from "@mui/material"; 
import { useSelector, useDispatch } from "react-redux";
import Posts from "../Posts/Posts";
import { Form } from "../Form/Form";
import { gridContainer, pagination, paper } from "./styles";
import { Pagination } from "../Pagination";
import { getPostsBySearch } from "../../Redux/actions";  
import { useNavigate, useParams } from "react-router-dom";
import { SearchTool } from "./SearchTool"; 
import SearchIcon from '@mui/icons-material/Search';
import PencilIcon from '@mui/icons-material/Create';
import ResetIcon from '@mui/icons-material/RotateLeft';
import { RESET, END, START } from "../../Redux/actionTypes";

export const Home = () => { 

  const pencil = {
    position: 'absolute', 
    top : '25%', 
    right : '2%', 
    borderRadius : '50%', 
    backgroundColor: 'white', 
    width: '3.0rem', 
    height: '3.0rem',
    padding: '1rem', 
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [reset, setReset] = useState(false); 

  const posts = useSelector((state) => state.postReducer);
  const isLoading = useSelector((state) => state.loadingReducer);
  const page = (posts ? (posts[0] ? posts[0]['currentPage'] : 1) : 1);
  const totalPage = (posts ? (posts[0] ? posts[0]['totalPage'] : 1) : 1);
 
 
  useEffect(() => {
    if (tag){
      Sleep(500, 'SEARCH_TAG')
    }
    else{
      if (!posts || !posts[0] || !posts[0]["data"]) {
          Sleep(500, 'SEARCH_PAGE')
      }
    }
    // eslint-disable-next-line
  }, [dispatch, tag])
 
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

  const sty = (theme) => ({
    position: 'fixed',
    top: '10rem',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    right: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      top: '20rem', 
    },
    [theme.breakpoints.down('md')]: {
      top: '15rem', 
    }
  })
  
  return (
    <>
    <Paper component="div" sx={sty} >
      <SearchIcon sx={pencil} onClick={handleClickOpenSearch} />
      <PencilIcon onClick={handleClickOpen} sx={pencil} style={{top: '7rem'}} />
      { (page > 1 || reset || tag) && (<ResetIcon sx={pencil} onClick={resetSearch} style={{top: '14rem'}} />) } 
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
 
