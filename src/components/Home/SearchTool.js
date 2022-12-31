import React, { forwardRef } from "react";
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
import { buttonSearch } from "./styles";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../Redux/actions";
import { RESET } from "../../Redux/actionTypes";
import { useNavigate } from "react-router-dom";

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
    dispatch({ type: "START" });
    setTimeout(async () => {
      await dispatch(getPostsBySearch({ title, tags: tags && tags.join(",") }));
    }, time);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) searchPost();
  };

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
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
                onKeyPress: (e) => {
                  if (e.code === "Enter" || e.code === "Space") {
                    handleAddChip(e.target.value);
                    e.target.value = ""; 
                  }
                },
                sx: {
                  flexWrap: "wrap",
                  flexDirection: "row",
                },
                placeholder: (tags[0] === undefined) ? '' : "Search Tag",
              }}
              variant="outlined"
              fullWidth
              sx={(theme) => ({ margin: theme.spacing(1) })}
              label = "Write Tag (Press Space for Multiple)"
            />

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
