import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import api from '../services/api';


const TransaccionesScreen = ({ navigation }: any) => {
  const [transacciones, setTransacciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    try {
      const res = await api.get('/transacciones');
      setTransacciones(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Historial</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AgregarTransaccion')}>
          <Text style={styles.agregar}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transacciones}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.vacio}>{cargando ? 'Cargando...' : 'No hay transacciones aún'}</Text>}
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <View style={[styles.itemDot, { backgroundColor: item.tipo === 'ingreso' ? '#059669' : '#DC2626' }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.descripcion}>{item.descripcion || 'Sin descripción'}</Text>
              <Text style={styles.categoria}>{item.categoria?.nombre || 'Sin categoría'}</Text>
              <Text style={styles.fecha}>{new Date(item.fecha).toLocaleDateString('es-CO')}</Text>
            </View>
            <Text style={[styles.monto, { color: item.tipo === 'ingreso' ? '#059669' : '#DC2626' }]}>
              {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toLocaleString('es-CO')}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 16 },
  back: { color: '#7C3AED', fontSize: 15 },
  titulo: { fontSize: 18, fontWeight: '400', color: '#0F0A1E' },
  agregar: { color: '#7C3AED', fontSize: 15, fontWeight: '600' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: 16, borderWidth: 1, borderColor: '#EDE9FE', padding: 16, marginBottom: 10, gap: 12 },
  itemDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  descripcion: { fontSize: 15, color: '#0F0A1E', fontWeight: '400' },
  categoria: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  fecha: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  monto: { fontSize: 16, fontWeight: '500' },
  vacio: { color: '#9CA3AF', textAlign: 'center', marginTop: 40 },
});

export default TransaccionesScreen;