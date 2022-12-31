 
import Text from '../../images/Text.png';
import Logo from '../../images/Logo.png';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useResolvedPath } from 'react-router-dom'; 
import { Button, Paper } from '@mui/material';
import { tokenExpired } from '../../Redux/auth';
import { MyAppBar, MyTypography, MyToolbar, MyAvatar, profile, userName, disabled, brandContainer, purple, logout, image } from './styles';


export const Navbar = () => {

    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.spyReducer);
    const [second, setSecond] = useState(0);
    const path = useResolvedPath().pathname;
    
    useEffect(() => {
      const myTimer = setInterval( () => {
          if(isLogged){
            setSecond((prev) => prev + 1);
            dispatch(tokenExpired());
          }
          clearInterval(myTimer);
        }, 1000 * 60);
    }, [second, isLogged, dispatch]);
    

    useEffect(() => {
         if (isLogged) {
          setUser(JSON.parse(localStorage.getItem('keywords')));
         }else{
          setUser(null);
         }
    }, [isLogged]);
    
    const handleLogout = async () => {
      dispatch({type: 'LOGOUT'});
      dispatch({type : 'SEND', payload : {message : 'Logout Done, Please Login Again', mode : 'warning'}});
    }

    const backHome = async () => {
      // await dispatch({type: RESET})
      dispatch({type: 'START'})
    }
     
  return (
    <>
        <MyAppBar position='static' color='inherit' >
          <Link onClick={ backHome } to='/' style={{...brandContainer, pointerEvents : `${(path === '/posts') ? 'none' : ''}`}} > 
            <img src={Text} alt="Text" height="45px" />
            <img src={Logo} style={image} alt="Logo" height="40px" />
          </Link>
          <MyToolbar > 
            {user ? (
                <Paper sx={profile}  >
                    <MyAvatar sx={purple} alt={user['username']} src={user['picture']} > <img src={user['picture']} alt={user['picture']} /></MyAvatar>
                    <MyTypography sx={userName} variant='h6' > {user['username']} </MyTypography>
                    <Button variant='contained' sx={logout} color='secondary' onClick={handleLogout} >Logout</Button>
                </Paper>
            ) : (
              <Button component={Link} onClick={() => dispatch({type : 'START'})} to='/auth' style={{pointerEvents : `${(path === '/auth') ? 'none' : ''}`}} variant='contained' color='primary' >Sign In</Button>
            )}
          </MyToolbar>
        </MyAppBar>
    </>
  )
}
 
