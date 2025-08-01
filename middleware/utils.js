import axios from 'axios';
import * as XLSX from 'xlsx';
export const logout = async (type) => {
  if (type === 'admin') {
    axios
      .post('/api/auth/logout')
      .then((res) => {
        router.push('/admin/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (type === 'klub') {
    axios
      .post('/api/clubAuth/logout')
      .then((res) => {
        router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const extractAddressData = (address) => {
  if (!address) {
    return [null, null, null];
  }

  //1. MAMY PEŁNY ADRES   | ulica nr,kod pocztowy,miasto
  //2. MAMY TYLKO ULICE I NR  | bez przecinka
  //3. MAMY ULICE,NR I MIASTO |  ulica nr,miasto
  // STREET , ZIPCODE , CITY
  const splitedAddress = address.split(',');

  let city;
  let zipCode;
  let street;
  if (address.includes('-')) {
    // mamy wszystkie dane (1)
    street = splitedAddress[0];
    zipCode = splitedAddress[1];
    city = splitedAddress[2];
    return [city, street, zipCode?.replace(/\n/g, '')];
  } else if (address.includes(',')) {
    // ulica nr,miasto
    street = splitedAddress[0];
    city = splitedAddress[1];
    return [city, street, null];
  } else {
    street = splitedAddress[0];
    return [null, street, null];
    // ulica i nr
  }
};

export const convertAddressData = (city = '', street = '', zipCode = '') => {
  city = city.replace(/,/g, '');
  street = street.replace(/,/g, '');
  zipCode = zipCode.replace(/,/g, '');
  return `${street},${zipCode},${city}`;
};

export const saveStepOneForm = (data) => {
  // liczba sezonów do tabeli applications
  // reszta idzie do tabeli kluby
};

export const convertToFormData = (files) => {
  const data = new FormData();

  files.forEach((item) => {
    data.append('files', item.file);
  });

  return data;
};

export const getCurrentDate = () => {
  const newDate = new Date();
  const date = ` ${newDate.getDate()}/${(newDate.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${newDate.getFullYear()}, ${newDate.getHours()}:${newDate
    .getMinutes()
    .toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;

  return date;
};

export const getInternalId = (id, isApplication) => {
  if (isApplication) {
    return `W/${id}/${new Date().getFullYear()}`;
  }
  return `K/${new Date().getFullYear()}/${id}`;
};

export const exportApplicationData = (data) => {
  const exportData = [
    [
      'ID wniosku',
      'Klub',
      'Data złożenia wniosku',
      'liczba sezonów',
      'Status',
      'Pełnomocnik',
      'Stanowisko',
      'telefon',
      'liczba zespołów młodzieżowych',
      'Udział zawodników młodzieżowych',
      'Zespoły młodzieżowe',
    ],
  ];

  data.forEach((item) => {
    const row = [
      item.internal_id || '',
      item.clubs.name,
      item.created_at,
      item.number_of_seasons,
      item.statuses.name,
      item.clubs.agent_name,
      item.clubs.agent_position,
      item.clubs.phone,
      item.number_of_youth_groups,
      item.share_of_youth_groups,
      item.youth_groups_possession,
    ];

    exportData.push(row);
  });

  const wb = XLSX.utils.book_new();
  const wsAll = XLSX.utils.aoa_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, wsAll, 'Wnioski licencyjne');
  XLSX.writeFile(wb, `Wnioski licencyjne.xlsx`);
};

export const exportClubData = (data) => {
  const exportData = [
    [
      'ID klubu',
      'ostatnia aktualizacja',
      'pełna nazwa',
      'status',
      'Strefa',
      'Klasa rozgrywkowa',
      'Adres klubu',
      'Adres korespondencyjny',
      'Adres stadionu',
      'Telefon_1',
      'Telefon_2',
      'Telefon_3',
      'Tel.stacjonarny',
      'Email_1',
      'Email_2',
      'Email_3',
      'Prezes',
      'email prezesa',
      'tel. prezesa',
      'pełnomocnik',
      'funkcja pełnomocnika',
      'email pełnomocnika',
      'tel.pełnomocnika',
    ],
  ];

  data.forEach((club) => {
    let row = [
      club.internal_id || '',
      club.updated_at || '',
      club.name || '',
      club.active ? 'aktywny' : 'nieaktywny',
      club.region || '',
      club.leauge || '',
      club.address || '',
      club.postal_address || '',
      club.stadium || '',
      club.phone || '',
      club.phone_2 || '',
      club.phone_3 || '',
      club.landline_phone || '',
      club.email || '',
      club.email_2 || '',
      club.email_3 || '',
      club.chairman || '',
      club.chairman_email || '',
      club.chairman_phone || '',
      club.agent_name || '',
      club.agent_position || '',
      club.agent_email || '',
      club.agent_phone || '',
    ];

    exportData.push(row);
  });

  const wb = XLSX.utils.book_new();
  const wsAll = XLSX.utils.aoa_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, wsAll, 'Kluby');
  XLSX.writeFile(wb, `Kluby.xlsx`);
};

export const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const renderAmount = (leauge, settings) => {
  console.log(leauge);
  let amount = '';
  switch (leauge) {
    case 'iv liga':
    case 'IV Liga':
      amount = `${settings.iv_possession_fee} PLN`;
      break;
    case 'v liga':
    case 'V Liga':
    case 'klasa okręgowa':
      amount = `${settings.v_possession_fee} PLN`;
      break;

    default:
      amount = 0;

      break;
  }
  console.log('extra amount', amount);
  return parseFloat(amount);
};

export const createSeasons = (amount) => {
  amount = parseInt(amount);
  const currentYear = new Date().getFullYear();

  if (amount === 2 || amount === '2') {
    return `${currentYear}/${currentYear + 1} i ${currentYear + 1}/${currentYear + 2}`;
  } else {
    return `${currentYear}/${currentYear + 1}`;
  }
};

export const convertLeauge = (leauge) => {
  let formatedLeauge = '';
  if (!leauge) {
    return '';
  }
  switch (leauge.toLowerCase()) {
    case 'iv liga':
      formatedLeauge = 'IV Liga';
      break;
    case 'v liga':
      formatedLeauge = 'V Liga';
      break;

    case 'klasa okręgowa':
      formatedLeauge = 'Klasa okręgowa';
      break;
    case 'klasa a':
      formatedLeauge = 'Klasa A';
      break;
    case 'klasa b':
      formatedLeauge = 'Klasa B';
      break;
    case 'młodzież':
      formatedLeauge = 'Ligi młodzieżowe';
      break;
    case 'futsal':
      formatedLeauge = 'Futsal';
      break;
    case 'ligi kobiece':
      formatedLeauge = 'Ligi Kobiece';
      break;

    default:
      formatedLeauge = null;
  }
  return formatedLeauge;
};

export const checkMimeType = (event) => {
  //getting file object
  let files = event.target.files;
  //define message container
  let err = '';
  // list allow mime type
  const types = ['image/png', 'image/jpeg', 'application/pdf', 'image/jpg'];
  // loop access array
  if (files[0].size > 15000000) {
    return {
      valid: false,
      error:
        'Plik jest zbyt duży,upewnij się że przesyłasz odpowiedni plik, możesz przesłać także kilka mniejszych plików',
    };
  }

  return {
    valid: true,
  };
};

export const renderMainAmount = (leauge, settings, seasons) => {
  let amount = 0;

  switch (leauge.toLowerCase()) {
    case 'iv liga':
      amount = settings.iv_application_fee;
      break;
    case 'v liga':
    case 'klasa okręgowa':
      amount = settings.v_application_fee;
      break;

    case 'klasa a':
    case 'klasa b':
      amount = settings.ab_application_fee;
      break;

    case 'młodzież':
      amount = settings.young_application_fee;
      break;
    case 'futsal':
      amount = settings.futsal_application_fee;
      break;
    case 'ligi kobiece':
      amount = settings.women_application_fee;
      break;
    default:
      amount = settings.young_application_fee;
  }

  if (seasons === '1' || seasons.match(/\//g)?.length === 1) {
    return parseFloat(amount);
  } else if (seasons === '2' || seasons.match(/\//g)?.length === 2) {
    return parseFloat(amount * 2);
  }
};

export const filterArr = (el) => {
  return el != '' && el != ' ';
};

export const convertStepsToString = (steps) => {
  let allStepsArr = Object.entries(steps);

  let filteredSteps = allStepsArr.filter((step) => step[1]);

  let result = [];

  filteredSteps.forEach((step) => {
    console.log(step[0]);
    switch (step[0]) {
      case 'one':
        result.push('1');
        break;
      case 'two':
        result.push('2');
        break;
      case 'three':
        result.push('3');
        break;
      case 'four':
        result.push('4');
        break;
      case 'five':
        result.push('5');
        break;
      case 'six':
        result.push('6');
        break;
      case 'seven':
        result.push('7');
        break;
    }
  });

  return result.join(',');
};

export const checkSupervision = (application) => {
  const stepTwoFiles = application.applications_attachments?.filter(
    (file) => file.category === 'krs_documents',
  );
  const stepThreeFiles = application.applications_attachments?.filter(
    (file) => file.category === 'agreement_documents',
  );
  if (stepTwoFiles?.length === 0 || !stepTwoFiles) {
    return true;
  }

  if (
    stepThreeFiles?.length === 0 &&
    application.youthGroupsPossession === 'porozumienie na szkolenie'
  ) {
    return true;
  }
  if (
    stepThreeFiles.length === 0 &&
    application.youthGroupsPossession === 'porozumienie na szkolenie'
  ) {
    return true;
  }

  application.sport_facilities.forEach((facility) => {
    const files1 = facility.applications_attachments.filter(
      (el) => el.category === 'I01_agreement',
    );

    const files2 = facility.applications_attachments.filter(
      (el) => el.category === 'I17_intensity_level',
    );
    if (facility.I01_1 === false && files1.length === 0) {
      return true;
    }
    if (facility.I17_1 === true && files2.length === 0) {
      return true;
    }
  });

  return false;
};
