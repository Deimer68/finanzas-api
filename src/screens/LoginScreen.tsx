import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView,
  Platform, ActivityIndicator
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!correo || !password) return Alert.alert('Error', 'Completa todos los campos');
    setCargando(true);
    try {
      await login(correo, password);
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>$</Text>
          </View>
          <Text style={styles.titulo}>FinanzApp</Text>
          <Text style={styles.subtitulo}>Tu dinero, bajo control.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="hola@correo.com"
            placeholderTextColor={colors.textLight}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.boton} onPress={handleLogin} disabled={cargando}>
            {cargando
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botonTexto}>Iniciar sesión</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  inner: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primaryGlow, borderWidth: 1.5, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoText: { fontSize: 28, color: colors.primary, fontWeight: '300' },
  titulo: { fontSize: 28, fontWeight: '300', color: colors.text, letterSpacing: 1 },
  subtitulo: { fontSize: 14, color: colors.textSecondary, marginTop: 6 },
  form: { gap: 8 },
  label: { fontSize: 12, color: colors.textSecondary, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: colors.primaryBorder, borderRadius: 14, padding: 16, fontSize: 15, color: colors.text, backgroundColor: colors.card },
  boton: { backgroundColor: colors.primary, borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 24 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linkBtn: { alignItems: 'center', marginTop: 16 },
  link: { color: colors.textSecondary, fontSize: 14 },
  linkBold: { color: colors.primary, fontWeight: '600' },
});

export default LoginScreen;