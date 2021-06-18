import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [doctorToken, setDoctorToken] = useState(null);

  useEffect(() => {
    getToken();
    getDrToken();
  }, []);

  const getToken = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    setUserToken(token);
    setLoading(false);
  };

  const getDrToken = async () => {
    setLoading(true);
    const drToken = await AsyncStorage.getItem('drToken');
    setDoctorToken(drToken);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        userToken,
        getToken,
        doctorToken,
        getDrToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
