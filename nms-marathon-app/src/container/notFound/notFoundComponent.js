import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_STATUS } from '../../config/constants';
import { setAuthStatus } from '../../redux/actions/players';
import { Navigate } from 'react-router-dom';

const NotFoundComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem('auth');
    dispatch(setAuthStatus(AUTH_STATUS.PENDING));
  }, []);
  return <Navigate to="/" />;
};

export default NotFoundComponent;
