import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Alert, ScrollView, ActivityIndicator
} from 'react-native';
import api from '../services/api';


const PresupuestosScreen = ({ navigation }: any) => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [monto, setMonto] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [mes, setMes] = useState(String(new Date().getMonth() + 1));
  const [anio, setAnio] = useState(String(new Date().getFullYear()));
  const [cargando, setCargando] = useState(false);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const [p, c] = await Promise.all([api.get('/presupuestos'), api.get('/categorias')]);
    setPresupuestos(p.data);
    setCategorias(c.data);
  };

  const crear = async () => {
    if (!monto || !categoriaId) return Alert.alert('Error', 'Completa todos los campos');
    setCargando(true);
    try {
      await api.post('/presupuestos', { monto: Number(monto), categoria: categoriaId, mes: Number(mes), anio: Number(anio) });
      setMonto('');
      setCategoriaId('');
      cargar();
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.mensaje || 'Error al crear');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>Presupuestos</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.body}>
          <Text style={styles.label}>Monto límite</Text>
          <TextInput style={styles.input} placeholder="0" placeholderTextColor="#9CA3AF" value={monto} onChangeText={setMonto} keyboardType="numeric" />

          <Text style={styles.label}>Período</Text>
          <View style={styles.row}>
            <TextInput style={[styles.input, { flex: 1 }]} placeholder="Mes" placeholderTextColor="#9CA3AF" value={mes} onChangeText={setMes} keyboardType="numeric" />
            <TextInput style={[styles.input, { flex: 1 }]} placeholder="Año" placeholderTextColor="#9CA3AF" value={anio} onChangeText={setAnio} keyboardType="numeric" />
          </View>

          <Text style={styles.label}>Categoría</Text>
          {categorias.map((cat: any) => (
            <TouchableOpacity
              key={cat._id}
              style={[styles.catItem, categoriaId === cat._id && styles.catItemActivo]}
              onPress={() => setCategoriaId(cat._id)}
            >
              <Text style={[styles.catTexto, categoriaId === cat._id && styles.catTextoActivo]}>{cat.nombre}</Text>
              {categoriaId === cat._id && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.boton} onPress={crear} disabled={cargando}>
            {cargando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>+ Agregar presupuesto</Text>}
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: 32 }]}>Presupuestos activos</Text>
          {presupuestos.map((p: any) => (
            <View key={p._id} style={styles.presItem}>
              <View>
                <Text style={styles.presNombre}>{p.categoria?.nombre}</Text>
                <Text style={styles.presPeriodo}>{p.mes}/{p.anio}</Text>
              </View>
              <Text style={styles.presMonto}>${p.monto.toLocaleString('es-CO')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 16 },
  back: { color: '#7C3AED', fontSize: 15 },
  titulo: { fontSize: 18, fontWeight: '400', color: '#0F0A1E' },
  body: { padding: 16 },
  label: { fontSize: 12, color: '#6B7280', fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
  input: { borderWidth: 1.5, borderColor: '#EDE9FE', borderRadius: 14, padding: 16, fontSize: 15, color: '#0F0A1E', backgroundColor: '#FAFAFA' },
  row: { flexDirection: 'row', gap: 12 },
  catItem: { borderWidth: 1.5, borderColor: '#EDE9FE', borderRadius: 14, padding: 14, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA' },
  catItemActivo: { borderColor: '#7C3AED', backgroundColor: 'rgba(124,58,237,0.08)' },
  catTexto: { fontSize: 15, color: '#6B7280' },
  catTextoActivo: { color: '#7C3AED', fontWeight: '600' },
  check: { color: '#7C3AED', fontWeight: 'bold' },
  boton: { backgroundColor: '#7C3AED', borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 16 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  presItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: 16, borderWidth: 1, borderColor: '#EDE9FE', padding: 16, marginBottom: 10 },
  presNombre: { fontSize: 15, color: '#0F0A1E', fontWeight: '400' },
  presPeriodo: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  presMonto: { fontSize: 18, fontWeight: '300', color: '#7C3AED' },
});

export default PresupuestosScreen;