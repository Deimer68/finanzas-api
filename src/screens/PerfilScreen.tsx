import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useAuth } from '../context/AuthContext';


const PerfilScreen = ({ navigation }: any) => {
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: logout }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Perfil</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{usuario?.nombre?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.nombre}>{usuario?.nombre}</Text>
        <Text style={styles.correo}>{usuario?.correo}</Text>
      </View>

      <View style={styles.info}>
        {[
          { label: 'Nombre', valor: usuario?.nombre },
          { label: 'Correo', valor: usuario?.correo },
          { label: 'Moneda', valor: usuario?.moneda || 'COP' },
        ].map((item) => (
          <View key={item.label} style={styles.campo}>
            <Text style={styles.campoLabel}>{item.label}</Text>
            <Text style={styles.campoValor}>{item.valor}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.botonLogout} onPress={handleLogout}>
          <Text style={styles.botonLogoutTexto}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 16 },
  back: { color: '#7C3AED', fontSize: 15 },
  titulo: { fontSize: 18, fontWeight: '400', color: '#0F0A1E' },
  avatarSection: { alignItems: 'center', paddingVertical: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(124,58,237,0.1)', borderWidth: 1.5, borderColor: '#7C3AED', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarTexto: { fontSize: 32, color: '#7C3AED', fontWeight: '300' },
  nombre: { fontSize: 22, fontWeight: '300', color: '#0F0A1E' },
  correo: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  info: { marginHorizontal: 16, borderRadius: 16, borderWidth: 1, borderColor: '#EDE9FE', overflow: 'hidden', backgroundColor: '#FAFAFA' },
  campo: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EDE9FE' },
  campoLabel: { fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  campoValor: { fontSize: 15, color: '#0F0A1E', fontWeight: '400' },
  footer: { padding: 24, marginTop: 'auto' },
  botonLogout: { borderWidth: 1.5, borderColor: '#DC2626', borderRadius: 14, padding: 16, alignItems: 'center' },
  botonLogoutTexto: { color: '#DC2626', fontSize: 15, fontWeight: '500' },
});

export default PerfilScreen;