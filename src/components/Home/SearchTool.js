import React, { forwardRef, useState, useRef } from "react";
import {
  Dialog,
  Button,
  Slide,
  Paper,
  Divider,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import { buttonSearch, buttonSearchAdd } from "./styles";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../Redux/actions";
import { RESET } from "../../Redux/actionTypes";
import { useNavigate } from "react-router-dom";
import { START } from "../../Redux/actionTypes";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const SearchTool = ({
  setOpenSearch,
  openSearch,
  title,
  tags,
  setTags,
  setTitle,
  setReset,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [track, setTrack] = useState();
  const tagRef = useRef();

  const searchPost = async (tags) => {
    if (title.trim() || tags) {
      navigate(
        `/posts/Search?${tags ? `tag=${tags.join(",")}` : ""}${
          title ? `title=${title} ` : ""
        }`
      );
      dispatch({ type: RESET });
      await Sleep(1000);
      setReset(true);
      resetSearch();
    }
  };

  const Sleep = async (time) => {
    dispatch({ type: START });
    setTimeout(async () => {
      await dispatch(getPostsBySearch({ title, tags: tags && tags.join(",") }));
    }, time);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) searchPost();
  };

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
    setTrack('')
  };

  const handleAddChipBtn = () => { 
    if (track !== '' && track !== undefined ) {
      handleAddChip(track);
      tagRef.current.value = '';
      tagRef.current.focus();
    } 
  };

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
  };

  const handleClose = () => {
    setOpenSearch(false);
  };

  const resetSearch = () => {
    setTags([]);
    setTitle("");
    handleClose();
  }; 
  return (
    <>
      <div>
        <Dialog
          maxWidth={"sm"}
          open={openSearch}
          onClose={handleClose}
          TransitionComponent={Transition}
          PaperProps={{
            sx: (theme) => ({
              position: "absolute",
              right: "10px",
              width: "500px",
              borderRadius: 4,
              marginBottom: "1rem",
              display: "flex",
              padding: "16px", 
            [theme.breakpoints.down('md')] : {
              right: 0,
              width: '90%',
              margin: theme.spacing(1)
            }, 
          }),
          }}
        >
          <Typography
            variant="h4"
            style={{ textAlign: "center", margin: "10px" }}
          >
            Search Memories
          </Typography>
          <Divider style={{ marginBottom: "30px" }} />
          <Paper
            elevation={1}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0.5rem",
              padding: "20px",
              width: "85%",
              marginBottom: "30px",
            }}
          >
            <TextField
              onKeyDown={handleKeyPress}
              name="title"
              variant="outlined"
              label="Search Memories"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={(theme) => ({ margin: theme.spacing(1) })} 
            />

            <TextField
              InputProps={{
                startAdornment: (tags[0] !== undefined) ? tags.map((tag) => (
                  <Chip
                    key={tag}
                    tabIndex={-1}
                    label={tag}
                    onDelete={() => handleDeleteChip(tag)}
                    sx={(theme) => ({ margin: theme.spacing(1) })}
                  />
                )) : '',
                onKeyDownCapture: (e) => { 
                  const value = (e.target.value).trim()
                  setTrack(value) 
                  if (value !== '' && (e.code === "Enter" || e.code === "Space") ) {
                    handleAddChip(value);
                    e.target.value = "";
                    tagRef.current.focus() 
                  }
                },
                sx: {
                  flexWrap: "wrap",
                  flexDirection: "row",
                },
                placeholder: (track === "" || track === undefined ) ? "Search Tag" : "Search Tag",
              }}
              variant="outlined"
              fullWidth
              sx={(theme) => ({ margin: theme.spacing(1) })}
              label = "Write Tag (Press Space for Multiple)"
              inputRef={tagRef}
            />
            { track && track !== '' && track !== undefined && <Button 
             variant="contained"
             color="primary"
             sx={buttonSearchAdd} 
             onClick={handleAddChipBtn}
            >
              ADD Tag
            </Button> }
            <Button
              onClick={() => searchPost(tags)}
              sx={buttonSearch}
              variant="contained"
              color="primary" 
              fullWidth
              disabled={((tags[0] !== undefined) || (title !== '')) ? false : true }
            >
              Search
            </Button>
          </Paper>
        </Dialog>
      </div>
    </>
  );
};
