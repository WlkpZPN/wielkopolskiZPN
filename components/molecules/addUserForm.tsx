import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
//components
import { filterArr } from '../../middleware/utils';
import { validateEmail } from '../../middleware/validation';
import FormTemplate from '../atoms/form_template';
import Label from '../atoms/form_label';
import FormRow from '../atoms/form_row';
import Input from '../atoms/input';
import PrimaryButton from '../atoms/primary_button';
import Select from '../atoms/form_select';
import ErrorMessage from '../atoms/error_message';
import StyledSpinner from '../atoms/loader';

const AddUserForm = ({ authData, userData, roles, setVisible, refreshData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(
    userData ? userData.name.split(' ').filter(filterArr)[0] : '',
  );
  const [lastName, setLastName] = useState(
    userData ? userData.name.split(' ').filter(filterArr)[1] : '',
  );
  const [role, setRole] = useState(userData ? userData.roles.id : roles[0].id);
  const [email, setEmail] = useState(userData ? userData.email : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authData !== null && authData?.role !== 'administrator' && authData?.email !== email) {
      toast.error('Nie masz uprawnień do edycji danych innych użytkowników ');
      return;
    }
    const { valid, message } = validateEmail(email);
    setLoading(true);
    if (userData) {
      // we updating the user
      // VALIDATION
      // 1. proper email (if exists)
      // 2. the same passwords ( if exists)
      if (email) {
        if (!valid) {
          setError(message);
          return;
        } else {
          // make call to api and  update user
        }
      }
      if (password !== '' && password !== confirmPassword) {
        setError('Hasła nie są takie same');
        return;
      }
      axios
        .post('/api/users/updateUser', {
          id: userData.id,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role,
        })
        .then(() => {
          toast.success(`Użytkownik ${firstName} ${lastName} pomyślnie zaktualizowany`);
          router.replace('/admin/uzytkownicy');
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // we creating new user
      // 1.proper email
      // 2. the same password (must exist)
      // 3. all fields required
      if (firstName.trim() === '' || lastName.trim() === '') {
        setError('Proszę wpisać imię oraz nazwisko');
        return;
      }

      if (!valid) {
        setError(message);
        return;
      }
      if (password === '' || confirmPassword === '') {
        setError('proszę wpisać i powtórzyć hasło');
        return;
      }
      if (password !== confirmPassword) {
        setError('hasła nie są takie same');
        return;
      }
      axios
        .post('/api/users/addUser', {
          email,
          password,
          firstName,
          lastName,
          role,
        })
        .then((res) => {
          toast.success(`Użytkownik ${firstName} ${lastName} pomyślnie dodany`);
          setLoading(false);
          setVisible(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (loading) {
    return <StyledSpinner />;
  }

  return (
    <FormTemplate onSubmit={handleSubmit}>
      <FormRow>
        <Label>
          Imię użytkownika
          <Input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
              setError('');
            }}
            value={firstName}
          />
        </Label>
        <Label>
          Nazwisko użytkownika
          <Input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
              setError('');
            }}
            value={lastName}
          />
        </Label>
      </FormRow>
      <FormRow cols={1}>
        <Label>
          Rola użytkownika
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((role, index) => {
              return (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </Select>
        </Label>
      </FormRow>
      <FormRow cols={1}>
        <Label>
          E-mail uzytkownika/Login
          <Input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            value={email}
          />
        </Label>
      </FormRow>
      <FormRow cols={1}>
        <Label>
          Hasło uzytkownika
          <Input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            value={password}
          />
        </Label>
      </FormRow>
      <FormRow cols={1}>
        <Label>
          Powtórz hasło użytkownika
          <Input
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            value={confirmPassword}
          />
        </Label>
      </FormRow>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <p style={{ marginTop: '32px' }}></p>
      <PrimaryButton type="submit" color="success" hoverColor="successDark">
        Zapisz zmiany
      </PrimaryButton>
    </FormTemplate>
  );
};

export default AddUserForm;
