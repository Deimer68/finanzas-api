import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TransaccionesScreen from '../screens/TransaccionesScreen';
import AgregarTransaccionScreen from '../screens/AgregarTransaccionScreen';
import CategoriasScreen from '../screens/CategoriasScreen';
import PresupuestosScreen from '../screens/PresupuestosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token } = useAuth();
  const scheme = useColorScheme();
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('onboardingDone').then(v => {
      setOnboardingDone(v === 'false');
      setCheckingOnboarding(false);
    });
  }, []);

  if (checkingOnboarding) return null;

  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       {!token ? (
  <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </>
) : !onboardingDone ? (
  <Stack.Screen name="Onboarding">
    {(props: any) => <OnboardingScreen {...props} onComplete={() => setOnboardingDone(true)} />}
  </Stack.Screen>
) : (
  <>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="Transacciones" component={TransaccionesScreen} />
    <Stack.Screen name="AgregarTransaccion" component={AgregarTransaccionScreen} />
    <Stack.Screen name="Categorias" component={CategoriasScreen} />
    <Stack.Screen name="Presupuestos" component={PresupuestosScreen} />
    <Stack.Screen name="Perfil" component={PerfilScreen} />
  </>
)}
</Stack.Navigator>
    </NavigationContainer>
  );
}