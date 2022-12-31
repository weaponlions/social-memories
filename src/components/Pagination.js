import React from 'react';
import Pagi from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import  { getPostsBySearch } from '../Redux/actions' 

export const Pagination = ({ page, totalPage, tags, title}) => {
    const ul = {
        justifyContent: 'space-around'
    }
    const dispatch = useDispatch()
    
    const handlePage = (e, selectedPage) => {
      Sleep(500, selectedPage)
    }

    const Sleep = (time, selectedPage) => {
      setTimeout(()=> {
        dispatch(getPostsBySearch({page: selectedPage, tags: (tags[0] === undefined ? '' : tags.join(',')), title: title}))
      }, time)
     }
      
  return (
    <>
        <Pagi
        sx={{ul : ul}}
        count={totalPage}
        page={page}
        variant={'outlined'}
        color={'primary'}
        onChange={handlePage}
        renderItem = {(item) => (
            <PaginationItem {...item}  component={Link}  />
        )}
        />
 
    </>
  )
}
