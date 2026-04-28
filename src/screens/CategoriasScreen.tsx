import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Alert, SafeAreaView, ActivityIndicator
} from 'react-native';
import api from '../services/api';

const CategoriasScreen = ({ navigation }: any) => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('gasto');
  const [cargando, setCargando] = useState(false);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const res = await api.get('/categorias');
    setCategorias(res.data);
  };

  const crear = async () => {
    if (!nombre) return Alert.alert('Error', 'Escribe un nombre');
    setCargando(true);
    try {
      await api.post('/categorias', { nombre, tipo });
      setNombre('');
      cargar();
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.mensaje || 'Error al crear');
    } finally {
      setCargando(false);
    }
  };

  const eliminar = async (id: string) => {
    Alert.alert('Eliminar', '¿Seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        await api.delete(`/categorias/${id}`);
        cargar();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Categorías</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva categoría..."
          placeholderTextColor="#9CA3AF"
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={styles.label}>Tipo</Text>
        <View style={styles.tipoRow}>
          {(['gasto', 'ingreso'] as const).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tipoBtn, tipo === t && styles.tipoBtnActivo]}
              onPress={() => setTipo(t)}
            >
              <Text style={[styles.tipoBtnTexto, tipo === t && styles.tipoBtnTextoActivo]}>
                {t === 'gasto' ? '↑ Gasto' : '↓ Ingreso'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.boton} onPress={crear} disabled={cargando}>
          {cargando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botonTexto}>+ Agregar categoría</Text>}
        </TouchableOpacity>
      </View>

      <FlatList
        data={categorias}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.vacio}>No hay categorías aún</Text>}
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={[styles.itemDot, { backgroundColor: item.tipo === 'ingreso' ? '#059669' : '#DC2626' }]} />
              <View>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemTipo}>{item.tipo}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => eliminar(item._id)} style={styles.eliminarBtn}>
              <Text style={styles.eliminarTexto}>Eliminar</Text>
            </TouchableOpacity>
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
  titulo: { fontSize: 18, fontWeight: '400', color: '#0F0A1E', letterSpacing: 0.5 },
  form: { padding: 16, gap: 8 },
  label: { fontSize: 12, color: '#6B7280', fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase', marginTop: 8, marginBottom: 4 },
  input: { borderWidth: 1.5, borderColor: '#EDE9FE', borderRadius: 14, padding: 16, fontSize: 15, color: '#0F0A1E', backgroundColor: '#FAFAFA' },
  tipoRow: { flexDirection: 'row', gap: 12 },
  tipoBtn: { flex: 1, padding: 14, borderRadius: 14, backgroundColor: '#FAFAFA', borderWidth: 1.5, borderColor: '#EDE9FE', alignItems: 'center' },
  tipoBtnActivo: { backgroundColor: 'rgba(124,58,237,0.08)', borderColor: '#7C3AED' },
  tipoBtnTexto: { color: '#6B7280', fontWeight: '500', fontSize: 14 },
  tipoBtnTextoActivo: { color: '#7C3AED', fontWeight: '600' },
  boton: { backgroundColor: '#7C3AED', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontWeight: '600', fontSize: 15 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: 16, borderWidth: 1, borderColor: '#EDE9FE', padding: 16, marginBottom: 10 },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemDot: { width: 10, height: 10, borderRadius: 5 },
  itemNombre: { fontSize: 15, color: '#0F0A1E', fontWeight: '400' },
  itemTipo: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  eliminarBtn: { padding: 8 },
  eliminarTexto: { color: '#DC2626', fontSize: 13 },
  vacio: { color: '#9CA3AF', textAlign: 'center', marginTop: 40 },
});

export default CategoriasScreen;