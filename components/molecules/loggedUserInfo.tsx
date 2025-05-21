import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from '../atoms/loader';
import { logout } from '../../middleware/utils';
const UserInfo = styled.div`
  width: 80%;

  & div {
    border: 2px solid ${({ theme }) => theme.primaryLight};
    border-radius: 5px;
    margin-bottom: 4px;

    & p:first-child {
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      margin: 24px 8px;
    }

    & p:nth-child(2) {
      background: ${({ theme }) => theme.primaryLight};
      width: 100%;
      padding: 12px;
      color: white;
      cursor: pointer;
      font-weight: bold;
      letter-spacing: 0.1rem;
      transition: 0.2s;
      &:hover {
        background: ${({ theme }) => theme.primary};
      }
    }
  }
  & span {
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    font-weight: bold;
  }
`;

const LoggedUserInfo = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const renewLogin = () => {
    setLoading(true);
    axios
      .post('/api/auth/renewToken', {
        userData,
      })
      .then((res) => {
        setLoading(false);

        router.push('/admin');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <UserInfo>
      <div>
        <p>{userData.email}</p>
        <p onClick={renewLogin}> Zaloguj</p>
      </div>
      <p>
        to nie Ty?{' '}
        <span
          onClick={() => {
            logout;
            userData = null;
          }}
        >
          Zmień użytkownika
        </span>
      </p>
    </UserInfo>
  );
};

export default LoggedUserInfo;
