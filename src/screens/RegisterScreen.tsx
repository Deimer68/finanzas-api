import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

const RegisterScreen = ({ navigation }: any) => {
  const { registrar } = useAuth();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleRegistrar = async () => {
    if (!nombre || !correo || !password) return Alert.alert('Error', 'Completa todos los campos');
    setCargando(true);
    try {
      await registrar(nombre, correo, password);
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.mensaje || 'Error al registrarse');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTexto}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.titulo}>Crea tu cuenta</Text>
          <Text style={styles.subtitulo}>Empieza a controlar tus finanzas hoy.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput style={styles.input} placeholder="Tu nombre" placeholderTextColor={colors.textLight} value={nombre} onChangeText={setNombre} />
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput style={styles.input} placeholder="hola@correo.com" placeholderTextColor={colors.textLight} value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={colors.textLight} value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity style={styles.boton} onPress={handleRegistrar} disabled={cargando}>
            {cargando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Crear cuenta</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  inner: { flex: 1, padding: 24 },
  backBtn: { marginTop: 8, marginBottom: 32 },
  backTexto: { color: colors.primary, fontSize: 15 },
  header: { marginBottom: 32 },
  titulo: { fontSize: 28, fontWeight: '300', color: colors.text, letterSpacing: 0.5 },
  subtitulo: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
  form: { gap: 8 },
  label: { fontSize: 12, color: colors.textSecondary, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: colors.primaryBorder, borderRadius: 14, padding: 16, fontSize: 15, color: colors.text, backgroundColor: colors.card },
  boton: { backgroundColor: colors.primary, borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 24 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linkBtn: { alignItems: 'center', marginTop: 16 },
  link: { color: colors.textSecondary, fontSize: 14 },
  linkBold: { color: colors.primary, fontWeight: '600' },
});

export default RegisterScreen;