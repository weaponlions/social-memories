import React from "react";
import Pagi from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../Redux/actions";
import { START } from "../Redux/actionTypes";

export const Pagination = ({ page, totalPage, tags, title }) => {
  const { tag } = useParams();
  const { creator } = useParams();

  const ul = {
    justifyContent: "space-around",
  };
  const dispatch = useDispatch();

  const handlePage = (e, selectedPage) => {
    if (tag) {
      Sleep(500, selectedPage, "Tag");
    } else if (creator) {
      Sleep(500, selectedPage, "Creator");
    } else {
      Sleep(500, selectedPage);
    }
  };

  const Sleep = (time, selectedPage, key) => {
    dispatch({ type: START });
    setTimeout(() => {
      switch (key) {
        case "Tag":
          dispatch(
            getPostsBySearch({
              page: selectedPage,
              tags: tag ? tag : "",
              title: title,
            })
          );
          break;

        case "Creator":
          dispatch(
            getPostsBySearch({
              page: selectedPage,
              creator: creator ? creator : "",
              title: title,
            })
          );
          break;

        default:
          dispatch(
            getPostsBySearch({
              page: selectedPage,
              tags: tags[0] === undefined ? "" : tags.join(","),
              title: title,
            })
          );
          break;
      }
    }, time);
  };

  return (
    <>
      <Pagi
        sx={{ ul: ul }}
        count={totalPage}
        page={page}
        variant={"outlined"}
        color={"primary"}
        onChange={handlePage}
        renderItem={(item) => <PaginationItem {...item} component={Link} />}
      />
    </>
  );
};
