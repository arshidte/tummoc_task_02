import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/userActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(()=>{
    if(!userInfo) navigate('/')
  },[userInfo, navigate])

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout())
  }
  return (
    <div>
      <h2>Welcome {userInfo && `${userInfo.name}`}</h2>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  )
}

export default HomeScreen