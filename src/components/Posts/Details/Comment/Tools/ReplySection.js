import React, {useEffect} from 'react';
import Template from './Template';
import { getCommentChild } from '../../../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../styles.css'

export const ReplySection = ({ commentID, postID }) => {
 
  const dispatch = useDispatch();
  const child = useSelector((state) => state.childReducer);
   
  const pageLoader = async() => {
    const page = child[0]["currentPage"] + 1;
    await dispatch(getCommentChild({page: page, commentID: commentID, postID: postID}));
  };

  useEffect(() => {
    dispatch(getCommentChild({page: 1, commentID: commentID, postID: postID}));    
    // eslint-disable-next-line
  }, []) 

  return (
    <>
        {
          child && child[0] && child[0]['data'] && child[0]['data'] && child[0]['data'][commentID] && child[0]['data'][commentID].map((ele) => (
            <ul className="comment-list comment-list-answer" key={ele._id}>
              <li className="comment-list-row">
                <div className="comment-list-row-inner">
                  <Template
                    size="60px"
                    userID={ele.userID}
                    name={ele.userName}
                    message={ele.message}
                    avatar={ele.userLogo}
                    commentID={commentID}
                    createdAt={ele.createdAt}
                    targetedUser={ele.targetedUser}
                  />
                </div>
              </li>
            </ul>
          )
          )
        } 
        {child &&
          child[0] &&
          child[0]["currentPage"] < child[0]["totalPage"] && (
            <span style={{ margin: "2px 0px 5px 80px" }} onClick={pageLoader}>
              View More Reply
            </span>
          )}
      
    </>
  )
}
