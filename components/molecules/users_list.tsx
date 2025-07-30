import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import PrimaryButton from '../atoms/primary_button';
import { User } from '@styled-icons/fa-solid/User';

const UserIcon = styled(User)`
  width: 20px;
  color: ${({ theme }) => theme.primary};
  /* position: absolute;
  left: 8px; */
`;
const ButtonRow = styled.div`
  position: absolute;
  right: 8px;
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 16px;

  & button:first-child {
    margin-right: 8px;
  }
`;
const TableRow = styled.div`
  display: grid;
  position: relative;
  grid-template-columns:
    40px minmax(100px, 200px) minmax(100px, 200px) minmax(100px, 200px)
    minmax(100px, 250px) auto;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 0px;
  align-items: center;
  justify-items: center;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #dedede;
  }
`;

const UsersList = ({ authData, users, loading, setLoading }) => {
  const router = useRouter();
  const deleteUser = (userID, name) => {
    setLoading(true);
    axios
      .post('/api/users/deleteUser', {
        userID,
      })
      .then(() => {
        toast.warn(`Użytkownik ${name} pomyślnie usunięty`);
        setLoading(false);
      });
  };

  if (!users) {
    return <p>Pobieramy użytkowników z bazy danych...</p>;
  }
  return (
    <>
      {users.map((user, index) => {
        return (
          <TableRow key={index}>
            <UserIcon />
            <p>{user.name.split(' ')[0]}</p> <p>{user.name.split(' ')[1]}</p>
            <p>{user.roles.name}</p>
            <p>{user.email}</p>
            <ButtonRow>
              {authData.id !== 5 && (
                <PrimaryButton
                  onClick={() => deleteUser(user.id, user.name)}
                  color="danger"
                  hoverColor="dangerDark"
                >
                  Usuń użytkownika
                </PrimaryButton>
              )}

              <PrimaryButton onClick={() => router.push(`/admin/uzytkownicy/${user.email}`)}>
                Szczegóły
              </PrimaryButton>
            </ButtonRow>
          </TableRow>
        );
      })}
    </>
  );
};

export default UsersList;
