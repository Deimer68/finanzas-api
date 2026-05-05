import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ScrollView, ActivityIndicator
} from 'react-native';
import api from '../services/api';


const AgregarTransaccionScreen = ({ navigation }: any) => {
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('gasto');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    api.get('/categorias').then(res => setCategorias(res.data)).catch(console.log);
  }, []);

  const guardar = async () => {
    if (!monto || !categoriaId) return Alert.alert('Error', 'Monto y categoría son obligatorios');
    setCargando(true);
    try {
      await api.post('/transacciones', { tipo, monto: Number(monto), descripcion, categoria: categoriaId });
      Alert.alert('✓', 'Transacción guardada');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.mensaje || 'Error al guardar');
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
          <Text style={styles.titulo}>Nueva transacción</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.body}>
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

          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Mercado, salario..."
            placeholderTextColor="#9CA3AF"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <Text style={styles.label}>Categoría</Text>
          {categorias.length === 0 ? (
            <Text style={styles.sinCat}>No hay categorías. Crea una primero.</Text>
          ) : (
            categorias.map((cat: any) => (
              <TouchableOpacity
                key={cat._id}
                style={[styles.catItem, categoriaId === cat._id && styles.catItemActivo]}
                onPress={() => setCategoriaId(cat._id)}
              >
                <Text style={[styles.catTexto, categoriaId === cat._id && styles.catTextoActivo]}>
                  {cat.nombre}
                </Text>
                {categoriaId === cat._id && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            ))
          )}

          <TouchableOpacity style={styles.boton} onPress={guardar} disabled={cargando}>
            {cargando
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botonTexto}>Guardar transacción</Text>}
          </TouchableOpacity>
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
  tipoRow: { flexDirection: 'row', gap: 12 },
  tipoBtn: { flex: 1, padding: 14, borderRadius: 14, backgroundColor: '#FAFAFA', borderWidth: 1.5, borderColor: '#EDE9FE', alignItems: 'center' },
  tipoBtnActivo: { backgroundColor: 'rgba(124,58,237,0.08)', borderColor: '#7C3AED' },
  tipoBtnTexto: { color: '#6B7280', fontWeight: '500', fontSize: 14 },
  tipoBtnTextoActivo: { color: '#7C3AED', fontWeight: '600' },
  catItem: { borderWidth: 1.5, borderColor: '#EDE9FE', borderRadius: 14, padding: 14, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA' },
  catItemActivo: { borderColor: '#7C3AED', backgroundColor: 'rgba(124,58,237,0.08)' },
  catTexto: { fontSize: 15, color: '#6B7280' },
  catTextoActivo: { color: '#7C3AED', fontWeight: '600' },
  check: { color: '#7C3AED', fontWeight: 'bold' },
  sinCat: { color: '#9CA3AF', fontStyle: 'italic', marginTop: 8 },
  boton: { backgroundColor: '#7C3AED', borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 32 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AgregarTransaccionScreen;