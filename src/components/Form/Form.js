import React, { useState, forwardRef, useEffect, useRef } from "react";
import {
  Dialog,
  Button,
  Slide,
  Typography,
  Divider,
  TextField,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { paper, root, buttonSubmit, fileInput, form } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, erasePostID, updatePost } from "../../Redux/actions";
import { SEND } from "../../Redux/actionTypes";
import ChipInput from "material-ui-chip-input";
import imageCompression from "browser-image-compression";

const initialState = {
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Form = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const postID = useSelector((state) => state.updateIdReducer);
  const isLogged = useSelector((state) => state.spyReducer);
  const [postData, setPostData] = useState(initialState);

  const tagRef = useRef();
  const titleRef = useRef();
  const messageRef = useRef();

  const loadData = async () => {
    // eslint-disable-next-line
    const post = posts[0]["data"].filter((post) => {
      if (post._id === postID) return post;
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

    if (postData["title"] === "") {
      titleRef.current.focus();
      return dispatch({
        type: SEND,
        payload: { message: "Title is Required", mode: "warning" },
      });
    }

    if (postData["message"] === "") {
      messageRef.current.focus();
      return dispatch({
        type: SEND,
        payload: { message: "Message is Required", mode: "warning" },
      });
    }

    if (postData["tags"].length === 0) {
      tagRef.current.focus();
      return dispatch({
        type: SEND,
        payload: { message: "Tags is Required", mode: "warning" },
      });
    }

    const form = new FormData();
    form.append("title", postData["title"]);
    form.append("tags", postData["tags"].join(","));
    form.append("message", postData["message"]);

    if (postID) {
      if (postData["selectedFile"] !== "") {
        const file = postData["selectedFile"];
        await compressImage(file, form, postID);
      } else dispatch(updatePost(form, postID));
    } else {
      if (postData["selectedFile"] === "") {
        return dispatch({
          type: SEND,
          payload: {
            message: "Image is Required, Please Upload ",
            mode: "warning",
          },
        });
      }
      const file = postData["selectedFile"];

      await compressImage(file, form, "");
    }

    handleClear();
    handleClose();
  };

  const handleClear = () => {
    setPostData(initialState);
    dispatch(erasePostID());
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag.toUpperCase() ] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  const handleClose = () => {
    setOpen(false);
    handleClear();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setPostData({ ...postData, selectedFile: file }); 
  };

  const compressImage = async (file, form, postID) => {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 1920,
    };

    console.log(`Ori Size - ` + file.size / 1024 / 1024);
    const compressedFile = await imageCompression(file, options);

    const newfile = new File([compressedFile], file.name, { type: file.type });

    console.log(`Size - ` + compressedFile.size / 1024 / 1024);

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result;

      reader.onloadend = async () => {
        form.append("selectedFile", reader.result);
        if (postID !== "") {
          return await dispatch(updatePost(form, postID));
        } else {
          return await dispatch(createPost(form));
        }
      };
      reader.readAsDataURL(new Blob([imageDataUrl]));
    };

    reader.readAsArrayBuffer(newfile);
  };

  return (
    <>
      <div>
        <Dialog
          maxWidth={"sm"}
          open={open}
          onClose={() => !isLogged && handleClose()}
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
              [theme.breakpoints.down("md")]: {
                right: 0,
                left: 0,
                width: "90%",
                margin: theme.spacing(1),
              },
            }),
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            color="secondary"
            size="small"
          >
            <CloseIcon onClick={handleClose} style={{ margin: "5px" }} /> Close
          </Button>
          {!isLogged && (
            <Paper sx={paper} style={{ padding: "5% 10%" }}>
              <Typography variant="h6" align="center">
                Please Sign In To create a memories and like other's
              </Typography>
            </Paper>
          )}
          {isLogged && (
            <Paper sx={paper} style={{ padding: "5% 10%" }}>
              <form autoComplete="off" sx={`${root} ${form} `} style={form}>
                <Typography variant="h4" sx={(theme)=> ({
                  [theme.breakpoints.down('sm')] : {
                    fontSize: '2rem',
                  }
                })}>
                  {postID ? "Updating" : "Creating"} Memories
                  <Divider style={{ margin: "30px" }} />
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
                  sx={(theme) => ({ margin: theme.spacing(1) })}
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
                  sx={(theme) => ({ margin: theme.spacing(1) })}
                  inputRef={messageRef}
                />

                <ChipInput
                  name="tags"
                  variant="outlined"
                  label="Tags"
                  fullWidth
                  value={postData["tags"]}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                />

                <div style={{ margin: "10px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    style={fileInput}
                    onChange={(e) => {
                      handleFile(e);
                    }}
                  />
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
          )}
        </Dialog>
      </div>
    </>
  );
};
