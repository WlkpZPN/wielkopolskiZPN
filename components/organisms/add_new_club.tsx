import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import prisma from '../../middleware/prisma';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
//components
import { protectedClientRoute } from '../../middleware/protectedClient';
import ClientLayout from '../organisms/client_layout';
import AddFilesWrapper from '../organisms/add_files_wrapper';
import FormTemplate from '../atoms/form_template';
import Fieldset from '../atoms/fieldset';
import FormRow from '../atoms/form_row';
import Input from '../atoms/input';
import Select from '../atoms/form_select';
import OutlineButton from '../atoms/outline_button';
import PrimaryButton from '../atoms/primary_button';
import Label from '../atoms/form_label';
import ErrorMessage from '../atoms/error_message';
import StyledSpinner from '../atoms/loader';
import { extractAddressData, convertAddressData } from '../../middleware/utils';
import {
  validateEmail,
  validatePhone,
  validateText,
  validateZipCode,
} from '../../middleware/validation';
import ZipCodeInput from '../atoms/zip_code_input';
import PhoneInput from '../atoms/phone_input';
const AddNewClub = () => {
  const router = useRouter();
  const [postalCity, setPostalCity] = useState('');
  const [postalStreet, setPostalStreet] = useState('');
  const [postalZipCode, setPostalZipCode] = useState('');
  const [stadiumCity, setStadiumCity] = useState('');
  const [stadiumStreet, setStadiumStreet] = useState('');
  const [stadiumZipCode, setStadiumZipCode] = useState('');
  const [leauge, setLeauge] = useState('IV liga');
  const [clubName, setClubName] = useState('');
  const [clubCity, setClubCity] = useState('');
  const [clubZipCode, setZipCode] = useState('');
  const [clubStreet, setStreet] = useState('');

  const [agentName, setAgentName] = useState('');
  const [agentLastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [chairmanName, setChairmanName] = useState('');
  const [chairmanLastName, setChairmanLastName] = useState('');
  const [chairmanPhone, setChairmanPhone] = useState('');
  const [chairmanEmail, setChairmanEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [error, setError] = useState({
    type: '',
    text: '',
  });

  const [subtype, setSubtype] = useState('');

  const [phoneCount, setPhoneCount] = useState(
    [].concat(phone, phone2, phone3).filter((e) => e != '').length,
  );
  const [emailCount, setEmailCount] = useState(
    [].concat(email, email2, email3).filter((e) => e != '').length,
  );

  const [loading, setLoading] = useState(false);
  const [landlinePhone, setLandlinePhone] = useState('');

  const renderPhones = () => {
    switch (phoneCount) {
      case 0:
      case 1:
        return <PhoneInput key={1} value={phone} onChange={(e) => setPhone(e.target.value)} />;

      case 2:
        return (
          <>
            <PhoneInput key={2} value={phone} onChange={(e) => setPhone(e.target.value)} />

            <PhoneInput key={3} value={phone2} onChange={(e) => setPhone2(e.target.value)} />
          </>
        );

      case 3:
        return (
          <>
            <PhoneInput key={4} value={phone} onChange={(e) => setPhone(e.target.value)} />

            <PhoneInput key={5} value={phone2} onChange={(e) => setPhone2(e.target.value)} />

            <PhoneInput key={6} value={phone3} onChange={(e) => setPhone3(e.target.value)} />
          </>
        );

      default:
        return;
    }
  };

  const renderEmails = () => {
    switch (emailCount) {
      case 0:
      case 1:
        return (
          <Input key={1} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        );

      case 2:
        return (
          <>
            <Input key={2} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input key={3} type="text" value={email2} onChange={(e) => setEmail2(e.target.value)} />
          </>
        );

      case 3:
        return (
          <>
            <Input key={4} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input key={5} type="text" value={email2} onChange={(e) => setEmail2(e.target.value)} />

            <Input key={6} type="text" value={email3} onChange={(e) => setEmail3(e.target.value)} />
          </>
        );

      default:
        return;
    }
  };
  const IncrementCount = (type) => {
    const phonesObj = {
      1: phone,
      2: phone2,
      3: phone3,
    };

    const emailsObj = {
      1: email,
      2: email2,
      3: email3,
    };
    if (type === 'phone') {
      if (phoneCount < 3) {
        if (phonesObj[phoneCount] === '') {
          setError({
            type: 'phone',
            text: 'Aby dodać kolejny telefon uzupełnij poprzedni',
          });
          return;
        } else {
          setPhoneCount(phoneCount + 1);
          return;
        }
      } else {
        return;
      }
    }

    if (type === 'email') {
      if (emailCount < 3) {
        if (emailsObj[emailCount] === '') {
          setError({
            type: 'email',
            text: 'Aby dodać kolejny email, uzupełnij poniższe pola',
          });
        } else {
          setEmailCount(emailCount + 1);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    // event.target[].offestTop + 100
    // console.log(e.target);
    e.preventDefault();
    //1. check required fields
    //console.log(clubName);
    if (clubName.trim() === '') {
      setError({ text: 'Proszę podać nazwe klubu', type: 'main data' });
      window.scrollTo(0, 0);
      return;
    } else if (clubName) {
      let { valid, message } = validateText(clubName);
      if (!valid) {
        setError({ text: message, type: 'main data' });
        window.scrollTo(0, 0);
        return;
      }
    }

    //club address validation
    if (!clubCity) {
      setError({
        text: 'Proszę podać miasto ',
        type: 'main city',
      });
      window.scrollTo(0, 0);
      return;
    }
    if (!clubZipCode) {
      setError({
        text: 'Proszę podać kod pocztowy ',
        type: 'main zipCode',
      });
      window.scrollTo(0, 0);
      return;
    }
    if (!clubStreet) {
      setError({
        text: 'Proszę podać ulice,na której znajduje się klub ',
        type: 'main street',
      });
      window.scrollTo(0, 0);
      return;
    }

    if (clubCity && clubZipCode && clubStreet) {
      let properCity = validateText(clubCity);
      if (!properCity.valid) {
        setError({ text: properCity.message, type: 'main address' });
        return;
      }
    }

    // postal address validation
    if (!postalCity) {
      setError({
        text: 'Proszę podać miasto ',
        type: 'postal city',
      });
      window.scrollTo(0, 0);
      return;
    }
    if (!postalZipCode) {
      setError({
        text: 'Proszę podać kod pocztowy ',
        type: 'postal zipCode',
      });
      window.scrollTo(0, 0);
      return;
    }
    if (!postalStreet) {
      setError({
        text: 'Proszę podać ulice ',
        type: 'postal street',
      });
      window.scrollTo(0, 0);
      return;
    }

    let properCity = validateText(postalCity);
    if (!properCity.valid) {
      setError({ text: properCity.message, type: 'postal address' });
      return;
    }

    //stadium validation
    if (!stadiumCity) {
      setError({
        text: 'Proszę podać miasto ',
        type: 'stadium city',
      });
      window.scrollTo(0, 0);
      return;
    }
    if (!stadiumZipCode) {
      setError({
        text: 'Proszę podać kod pocztowy ',
        type: 'stadium zipCode',
      });
      window.scrollTo(0, 0);
      return;
    }
    if (!stadiumStreet) {
      setError({
        text: 'Proszę podać ulice ',
        type: 'stadium street',
      });
      window.scrollTo(0, 0);
      return;
    }
    properCity = validateText(stadiumCity);
    if (!properCity.valid) {
      setError({ text: properCity.message, type: 'stadium address' });
      return;
    }

    if (!phone) {
      setError({
        text: 'Proszę podać przynajmniej jeden telefon komórkowy',
        type: 'phone',
      });
      return;
    }

    if (!email) {
      setError({
        text: 'Proszę podać przynajmniej jeden email',
        type: 'email',
      });
      return;
    }

    // chairman validation
    if (!chairmanPhone || !chairmanName || !chairmanLastName || !chairmanEmail) {
      setError({
        text: 'Proszę podać wszystkie dane prezesa',
        type: 'chairman',
      });
      return;
    } else {
      let properPhone = validatePhone(chairmanPhone);
      if (!properPhone.valid) {
        setError({ text: properPhone.message, type: 'chairman' });
        return;
      }

      let properName = validateText(chairmanName);
      let properLastName = validateText(chairmanLastName);
      if (!properName.valid) {
        setError({ text: properName.message, type: 'chairman' });
        return;
      }
      if (!properLastName.valid) {
        setError({ text: properLastName.message, type: 'chairman' });
        return;
      }

      let properEmail = validateEmail(chairmanEmail);
      if (!properEmail.valid) {
        setError({ text: properEmail.message, type: 'chairman' });
        return;
      }
    }

    //agent validation
    if (!agentName || !agentLastName || !agentPhone || !agentEmail || !position) {
      setError({ text: 'Proszę podać dane pełnomocnika', type: 'agent' });
      return;
    } else {
      let properName = validateText(agentLastName);
      let properLastName = validateText(agentName);

      if (!properName.valid) {
        setError({ text: properName.message, type: 'agent' });
        return;
      }
      if (!properLastName.valid) {
        setError({ text: properLastName.message, type: 'agent' });
        return;
      }
      let properPhone = validatePhone(agentPhone);
      if (!properPhone.valid) {
        setError({ text: properPhone.message, type: 'agent' });
        return;
      }

      let properEmail = validateEmail(agentEmail);
      if (!properEmail.valid) {
        setError({ text: properEmail.message, type: 'agent' });
        return;
      }
    }

    //2. validate data

    //phone validation

    let properPhone = validatePhone(phone);
    if (!properPhone.valid) {
      setError({ text: properPhone.message, type: 'phone' });
      window.scrollTo(0, e.target[11].offsetTop + 100);
      return;
    }

    //email validation
    let properEmail = validateEmail(email);
    if (!properEmail.valid) {
      setError({ text: properEmail.message, type: 'email' });
      return;
    }
    if (emailCount === 2) {
      properEmail = validateEmail(email2);
      if (!properEmail.valid) {
        setError({ text: properEmail.message, type: 'email' });
        return;
      }
    }
    if (emailCount === 3) {
      properEmail = validateEmail(email3);
      if (!properEmail.valid) {
        setError({ text: properEmail.message, type: 'email' });
        return;
      }
    }

    setLoading(true);
    axios
      .post('/api/clubs/addClub', {
        data: {
          name: clubName,
          address: convertAddressData(clubCity, clubStreet, clubZipCode),
          email: email,
          phone: phone,
          email_2: email2,
          agent_name: `${agentName} ${agentLastName}`,
          leauge: leauge,
          stadium: convertAddressData(stadiumCity, stadiumStreet, stadiumZipCode),
          agent_email: agentEmail,
          email_3: email3,
          phone_2: phone2,
          chairman_email: chairmanEmail,
          landline_phone: landlinePhone,
          agent_phone: agentPhone,
          agent_position: position,
          chairman: `${chairmanName} ${chairmanLastName}`,
          chairman_phone: chairmanPhone,
          postal_address: convertAddressData(postalCity, postalStreet, postalZipCode),
          phone_3: phone3,
        },
      })
      .then(() => {
        axios.post('/api/helpers/sendSinglePassword', {
          clubEmail: email,
        });
        setLoading(false);
        toast.success('Utworzono nowy klub');
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Wystąpił problem, sprawdź swoje połączenie i spróbuj ponownie');
        console.log(err);
      });

    //3. send axios call

    // console.log("form submitted");
  };

  if (loading) {
    return <StyledSpinner style={{ width: '150px' }} />;
  }
  return (
    <FormTemplate
      onChange={() => setError(null)}
      onSubmit={handleSubmit}
      width="100%"
      style={{ marginBottom: '32px' }}
    >
      <h2>Dane podstawowe</h2>

      <Label width="50%">
        Pełna nazwa klubu
        <Input value={clubName} onChange={(e) => setClubName(e.target.value)} type="text" />
        {error && error.type === 'main data' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
      </Label>
      <Label width="50%">
        Klasa rozgrywkowa
        <Select value={leauge} onChange={(e) => setLeauge(e.target.value)}>
          <option value="IV liga">IV liga</option>
          <option value="V liga">V liga</option>
          <option value="Klasa okręgowa">Klasa okręgowa</option>
          <option value="Klasa A">Klasa A</option>
          <option value="Klasa B">Klasa B</option>
          <option value="młodzież">Ligi młodzieżowe</option>
          <option value="futsal">Futsal</option>
          <option value="ligi kobiece">Ligi kobiece</option>
        </Select>
      </Label>
      {leauge === 'futsal' ? (
        <Select value={subtype} onChange={(e) => setSubtype(e.target.value)}>
          <option value="II">II Liga Futsalu Kobiet</option>
          <option value="III">III Liga Futsalu Mężczyzn</option>
        </Select>
      ) : null}
      <FormRow cols={4}>
        <Label style={{ gridColumn: '1 / span 2' }}>
          Adres klubu (ulica)
          <Input value={clubStreet} onChange={(e) => setStreet(e.target.value)} type="text" />
          {error && error.type === 'main street' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        </Label>

        <Label>
          Kod pocztowy{' '}
          <ZipCodeInput value={clubZipCode} onChange={(e) => setZipCode(e.target.value)} />
          {error && error.type === 'main zipCode' ? (
            <ErrorMessage>{error.text}</ErrorMessage>
          ) : null}
        </Label>
        <Label>
          Miasto
          <Input value={clubCity} onChange={(e) => setClubCity(e.target.value)} type="text" />
          {error && error.type === 'main city' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        </Label>
      </FormRow>
      <FormRow cols={4}>
        <Label style={{ gridColumn: '1 / span 2' }}>
          Adres korespondencyjny
          <Input
            value={postalStreet}
            onChange={(e) => setPostalStreet(e.target.value)}
            type="text"
          />
          {error && error.type === 'postal street' ? (
            <ErrorMessage>{error.text}</ErrorMessage>
          ) : null}
        </Label>

        <Label>
          Kod pocztowy{' '}
          <ZipCodeInput value={postalZipCode} onChange={(e) => setPostalZipCode(e.target.value)} />
          {error && error.type === 'postal zipCode' ? (
            <ErrorMessage>{error.text}</ErrorMessage>
          ) : null}
        </Label>
        <Label>
          Miasto
          <Input type="text" value={postalCity} onChange={(e) => setPostalCity(e.target.value)} />
          {error && error.type === 'postal city' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        </Label>
      </FormRow>
      <FormRow cols={4}>
        <Label style={{ gridColumn: '1 / span 2' }}>
          Adres stadionu
          <Input
            type="text"
            value={stadiumStreet}
            onChange={(e) => setStadiumStreet(e.target.value)}
          />
          {error && error.type === 'stadium street' ? (
            <ErrorMessage>{error.text}</ErrorMessage>
          ) : null}
        </Label>

        <Label>
          Kod pocztowy{' '}
          <ZipCodeInput
            value={stadiumZipCode}
            onChange={(e) => setStadiumZipCode(e.target.value)}
          />
          {error && error.type === 'stadium zipCode' ? (
            <ErrorMessage>{error.text}</ErrorMessage>
          ) : null}
        </Label>
        <Label>
          Miasto
          <Input value={stadiumCity} onChange={(e) => setStadiumCity(e.target.value)} type="text" />
          {error && error.type === 'stadium city' ? (
            <ErrorMessage>{error.text}</ErrorMessage>
          ) : null}
        </Label>
      </FormRow>
      <Label>
        Telefon komórkowy
        {error && error.type === 'phone' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '350px',
              width: '100%',
            }}
          >
            {renderPhones()}
          </div>
          <OutlineButton
            type="button"
            align="flex-start"
            style={{ marginTop: '15px', marginLeft: '16px' }}
            onClick={() => IncrementCount('phone')}
          >
            + Dodaj alternatywny
          </OutlineButton>
        </div>
      </Label>
      <Label style={{ maxWidth: '350px', width: '100%' }}>
        Telefon stacjonarny (opcjonalnie)
        <PhoneInput value={landlinePhone} onChange={(e) => setLandlinePhone(e.target.value)} />
        {error && error.type === 'landline phone' ? (
          <ErrorMessage>{error.text}</ErrorMessage>
        ) : null}
      </Label>
      <Label>
        Adres e-mail klubu
        {error && error.type === 'email' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '350px',
              width: '100%',
            }}
          >
            {renderEmails()}
          </div>
          <OutlineButton
            style={{ marginTop: '15px', marginLeft: '16px' }}
            align="flex-start"
            onClick={() => IncrementCount('email')}
            type="button"
          >
            + Dodaj alternatywny
          </OutlineButton>
        </div>
      </Label>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2 style={{ margin: '24px 0' }}>Dane prezesa</h2>
        {error && error.type === 'chairman' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        <FormRow>
          <Label>
            Imię prezesa{' '}
            <Input
              value={chairmanName}
              onChange={(e) => setChairmanName(e.target.value)}
              type="text"
            />
          </Label>
          <Label>
            Nazwisko prezesa{' '}
            <Input
              value={chairmanLastName}
              onChange={(e) => setChairmanLastName(e.target.value)}
              type="text"
            />
          </Label>
        </FormRow>
        <FormRow>
          <Label>
            E-mail prezesa{' '}
            <Input
              value={chairmanEmail}
              onChange={(e) => setChairmanEmail(e.target.value)}
              type="text"
            />
          </Label>
          <Label>
            Telefon prezesa{' '}
            <PhoneInput value={chairmanPhone} onChange={(e) => setChairmanPhone(e.target.value)} />
          </Label>
        </FormRow>
        <h2 style={{ margin: '24px 0' }}>Dane pełnomocnika</h2>
        {error && error.type === 'agent' ? <ErrorMessage>{error.text}</ErrorMessage> : null}
        <FormRow>
          <Label>
            Imię pełnomocnika{' '}
            <Input value={agentName} onChange={(e) => setAgentName(e.target.value)} type="text" />
          </Label>
          <Label>
            Nazwisko pełnomocnika{' '}
            <Input
              value={agentLastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
            />
          </Label>
        </FormRow>
        <Label>
          Funkcja / stanowisko pełnomocnika
          <Input value={position} onChange={(e) => setPosition(e.target.value)} type="text" />
        </Label>
        <FormRow>
          <Label>
            E-mail pełnomocnika{' '}
            <Input value={agentEmail} onChange={(e) => setAgentEmail(e.target.value)} type="text" />
          </Label>
          <Label>
            Telefon pełnomocnika{' '}
            <PhoneInput value={agentPhone} onChange={(e) => setAgentPhone(e.target.value)} />
          </Label>
        </FormRow>
      </div>
      <PrimaryButton style={{ marginTop: '16px' }} color="success" hoverColor="successDark">
        Dodaj klub
      </PrimaryButton>
    </FormTemplate>
  );
};

export default AddNewClub;
