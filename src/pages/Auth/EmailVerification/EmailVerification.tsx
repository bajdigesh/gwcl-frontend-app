import { unwrapResult } from '@reduxjs/toolkit';
import { Loader } from 'components/Loader/FallBackLoader.stories';
import routePath from 'global/routePaths';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from 'store';
import { emailVerification, resetEmailVerification } from 'store/authentication';
import { useQuery } from 'utils/hooks/useQuery';

const EmailVerification = () => {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const email = query.get('email') || '';
  const token = query.get('token') || '';

  useEffect(() => {
    const postData = {
      verification_token: token,
      email: email,
    };
    dispatch(emailVerification(postData))
      .then(unwrapResult)
      .then(() => {
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);
        history.replace(`${routePath.auth.createPassword}?token=${encodedToken}&email=${encodedEmail}`);
      })
      .catch(() => {
        history.replace(routePath.auth.login);
      });
  }, [dispatch, email, token, history]);

  // REFLECT COMPONENT WILL UNMOUNT
  useEffect(() => {
    return () => {
      resetEmailVerification();
    };
  }, []);

  return <Loader />;
};
export default EmailVerification;
