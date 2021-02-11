import { useState,createContext } from 'react';
import AdminLayout from '../../components/organisms/admin_layout';
import {protectedAdminRoute} from './protectedAdmin';
import cookie from 'cookie';
import nookies from 'nookies';

export const UserContext = createContext(null);

const MainPage = ({ userData }) => {
  const [currentView, setCurrentView] = useState('wnioski');
  console.log(userData);
  return (
    <UserContext.Provider value={{ userData,
    setView:setCurrentView,}} >

    <AdminLayout >
    
        <h1>{currentView}</h1>
    </AdminLayout>
    </UserContext.Provider>
    
  )
}

export const getServerSideProps = protectedAdminRoute((context,data) => {

  return {
    props: {
      userData:data,
    }
  }
}
);

export default MainPage;


