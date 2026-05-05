import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, RefreshControl,
  Dimensions, Platform, NativeScrollEvent, NativeSyntheticEvent
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import PerfilScreen from './PerfilScreen';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }: any) => {
  const { usuario, logout } = useAuth();
  const [resumen, setResumen] = useState({ ingresos: 0, gastos: 0, saldo: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const horizontalRef = useRef<ScrollView>(null);

  useEffect(() => { cargarResumen(); }, []);

  const cargarResumen = async () => {
    try {
      const res = await api.get('/transacciones/resumen');
      setResumen(res.data);
    } catch (e) { console.log(e); }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await cargarResumen();
    setRefreshing(false);
  }, []);

  const fmt = (n: number) => `$${n.toLocaleString('es-CO')}`;

  const accesos = [
    { icon: '＋', label: 'Agregar', screen: 'AgregarTransaccion' },
    { icon: '◷', label: 'Historial', screen: 'Transacciones' },
    { icon: '⊞', label: 'Categorías', screen: 'Categorias' },
    { icon: '◎', label: 'Presupuestos', screen: 'Presupuestos' },
  ];

  const MainContent = () => (
    <View style={{ width }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#7C3AED"
            colors={['#7C3AED']}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.saludo}>Hola, {usuario?.nombre} 👋</Text>
            <Text style={styles.fecha}>
              {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => horizontalRef.current?.scrollTo({ x: width, animated: true })}
          >
            <Text style={styles.avatarTexto}>
              {usuario?.nombre?.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.saldoCard}>
          <Text style={styles.saldoLabel}>Saldo disponible</Text>
          <Text style={styles.saldo}>{fmt(resumen.saldo)}</Text>
          <View style={styles.saldoLine} />
          <View style={styles.saldoRow}>
            <View>
              <Text style={styles.saldoSubLabel}>Ingresos</Text>
              <Text style={styles.saldoIngreso}>{fmt(resumen.ingresos)}</Text>
            </View>
            <View style={styles.saldoDivider} />
            <View>
              <Text style={styles.saldoSubLabel}>Gastos</Text>
              <Text style={styles.saldoGasto}>{fmt(resumen.gastos)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.seccion}>Accesos rápidos</Text>
        <View style={styles.grid}>
          {accesos.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.gridIconBox}>
                <Text style={styles.gridIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.gridLabel}>{item.label}</Text>
              <Text style={styles.gridArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const ProfileContent = () => (
    <View style={{ width }}>
      <View style={styles.perfilHeader}>
        <TouchableOpacity onPress={() => horizontalRef.current?.scrollTo({ x: 0, animated: true })}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.perfilTitulo}>Perfil</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarGrande}>{usuario?.nombre?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.perfilNombre}>{usuario?.nombre}</Text>
        <Text style={styles.perfilCorreo}>{usuario?.correo}</Text>
      </View>

      <View style={styles.infoCard}>
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

      <TouchableOpacity
        style={styles.botonLogout}
        onPress={() => logout()}
      >
        <Text style={styles.botonLogoutTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        ref={horizontalRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <MainContent />
        <ProfileContent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 54 : StatusBar.currentHeight ?? 24,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16,
  },
  saludo: { fontSize: 22, fontWeight: '300', color: '#0F0A1E' },
  fecha: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  avatarBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(124,58,237,0.1)',
    borderWidth: 1.5, borderColor: '#7C3AED',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarTexto: { color: '#7C3AED', fontSize: 18, fontWeight: '600' },
  saldoCard: {
    margin: 16, borderRadius: 24, borderWidth: 1.5,
    borderColor: '#7C3AED', padding: 28, backgroundColor: '#FAFAFA',
  },
  saldoLabel: { fontSize: 12, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  saldo: { fontSize: 42, fontWeight: '300', color: '#0F0A1E', letterSpacing: -1 },
  saldoLine: { height: 1, backgroundColor: '#EDE9FE', marginVertical: 20 },
  saldoRow: { flexDirection: 'row', alignItems: 'center' },
  saldoSubLabel: { fontSize: 11, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  saldoIngreso: { fontSize: 18, fontWeight: '400', color: '#059669' },
  saldoGasto: { fontSize: 18, fontWeight: '400', color: '#DC2626' },
  saldoDivider: { width: 1, height: 36, backgroundColor: '#EDE9FE', marginHorizontal: 32 },
  seccion: { fontSize: 12, color: '#6B7280', paddingHorizontal: 24, marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' },
  grid: { paddingHorizontal: 16, gap: 12, paddingBottom: 32 },
  gridItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FAFAFA', borderRadius: 16,
    borderWidth: 1, borderColor: '#EDE9FE', padding: 18, gap: 16,
  },
  gridIconBox: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(124,58,237,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  gridIcon: { fontSize: 18, color: '#7C3AED' },
  gridLabel: { flex: 1, fontSize: 15, color: '#0F0A1E', fontWeight: '400' },
  gridArrow: { fontSize: 20, color: '#9CA3AF' },
  // Perfil
  perfilHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16,
  },
  back: { color: '#7C3AED', fontSize: 15 },
  perfilTitulo: { fontSize: 18, fontWeight: '400', color: '#0F0A1E' },
  avatarSection: { alignItems: 'center', paddingVertical: 32 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(124,58,237,0.1)',
    borderWidth: 1.5, borderColor: '#7C3AED',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarGrande: { fontSize: 32, color: '#7C3AED', fontWeight: '300' },
  perfilNombre: { fontSize: 22, fontWeight: '300', color: '#0F0A1E' },
  perfilCorreo: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  infoCard: {
    marginHorizontal: 16, borderRadius: 16,
    borderWidth: 1, borderColor: '#EDE9FE',
    overflow: 'hidden', backgroundColor: '#FAFAFA',
  },
  campo: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EDE9FE' },
  campoLabel: { fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  campoValor: { fontSize: 15, color: '#0F0A1E', fontWeight: '400' },
  botonLogout: {
    marginHorizontal: 16, marginTop: 24,
    borderWidth: 1.5, borderColor: '#DC2626',
    borderRadius: 14, padding: 16, alignItems: 'center',
  },
  botonLogoutTexto: { color: '#DC2626', fontSize: 15, fontWeight: '500' },
});

export default DashboardScreen;