import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthContextType {
  token: string | null;
  usuario: any;
  login: (correo: string, password: string) => Promise<void>;
  registrar: (nombre: string, correo: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarToken = async () => {
      try {
        const t = await AsyncStorage.getItem('token');
        const u = await AsyncStorage.getItem('usuario');
        if (t) setToken(t);
        if (u) setUsuario(JSON.parse(u));
      } catch (e) {
        console.log(e);
      } finally {
        setCargando(false);
      }
    };
    cargarToken();
  }, []);

  const login = async (correo: string, password: string) => {
    const res = await api.post('/usuarios/login', { correo, password });
    setToken(res.data.token);
    setUsuario(res.data.usuario);
    await AsyncStorage.setItem('token', res.data.token);
    await AsyncStorage.setItem('usuario', JSON.stringify(res.data.usuario));
  };

  const registrar = async (nombre: string, correo: string, password: string) => {
    await api.post('/usuarios/registrar', { nombre, correo, password });
    await login(correo, password);
  };

  const logout = async () => {
    setToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, registrar, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);