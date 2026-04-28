import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView,Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';



const { width } = Dimensions.get('window');

const PASOS = [
  {
    id: 'ingreso',
    titulo: '¿Cuál es tu\ningreso mensual?',
    subtitulo: 'Esto nos ayuda a personalizar\ntu experiencia financiera.',
    opciones: ['Menos de $1.000.000', '$1.000.000 - $3.000.000', '$3.000.000 - $6.000.000', 'Más de $6.000.000'],
  },
  {
    id: 'gastos',
    titulo: '¿En qué gastas\nmás cada mes?',
    subtitulo: 'Selecciona tu categoría\nde mayor gasto.',
    opciones: ['🍔 Alimentación', '🏠 Vivienda', '🚗 Transporte', '🎮 Entretenimiento', '👕 Ropa', '💊 Salud'],
  },
  {
    id: 'meta',
    titulo: '¿Tienes deudas\no metas de ahorro?',
    subtitulo: 'Cuéntanos para ayudarte\na organizarte mejor.',
    opciones: ['💳 Tengo deudas', '🎯 Quiero ahorrar', '📈 Ambas cosas', '✅ Estoy al día'],
  },
];

interface Props {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: Props) => {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [seleccionado, setSeleccionado] = useState('');

  const pasoActual = PASOS[paso];

  const siguiente = async () => {
    const nuevas = { ...respuestas, [pasoActual.id]: seleccionado };
    setRespuestas(nuevas);
    setSeleccionado('');
    if (paso < PASOS.length - 1) {
      setPaso(paso + 1);
    } else {
      await AsyncStorage.setItem('onboarding', JSON.stringify(nuevas));
      await AsyncStorage.setItem('onboardingDone', 'true');
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressRow}>
        {PASOS.map((_, i) => (
          <View key={i} style={[styles.progressDot, i <= paso && styles.progressDotActive]} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.paso}>Paso {paso + 1} de {PASOS.length}</Text>
        <Text style={styles.titulo}>{pasoActual.titulo}</Text>
        <Text style={styles.subtitulo}>{pasoActual.subtitulo}</Text>

        <View style={styles.opciones}>
          {pasoActual.opciones.map((op) => (
            <TouchableOpacity
              key={op}
              style={[styles.opcion, seleccionado === op && styles.opcionActiva]}
              onPress={() => setSeleccionado(op)}
            >
              <Text style={[styles.opcionTexto, seleccionado === op && styles.opcionTextoActivo]}>{op}</Text>
              {seleccionado === op && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.boton, !seleccionado && styles.botonDisabled]}
          onPress={siguiente}
          disabled={!seleccionado}
        >
          <Text style={styles.botonTexto}>
            {paso < PASOS.length - 1 ? 'Continuar' : 'Empezar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  progressRow: { flexDirection: 'row', gap: 8, padding: 24, paddingTop: 16 },
  progressDot: { flex: 1, height: 3, borderRadius: 2, backgroundColor: '#EDE9FE' },
  progressDotActive: { backgroundColor: '#7C3AED' },
  content: { padding: 24, paddingTop: 8 },
  paso: { color: '#7C3AED', fontSize: 12, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 },
  titulo: { fontSize: 32, fontWeight: '300', color: '#0F0A1E', lineHeight: 42, marginBottom: 12 },
  subtitulo: { fontSize: 15, color: '#6B7280', lineHeight: 22, marginBottom: 32 },
  opciones: { gap: 12 },
  opcion: { borderWidth: 1.5, borderColor: '#EDE9FE', borderRadius: 16, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA' },
  opcionActiva: { borderColor: '#7C3AED', backgroundColor: 'rgba(124, 58, 237, 0.08)' },
  opcionTexto: { fontSize: 15, color: '#6B7280', fontWeight: '400' },
  opcionTextoActivo: { color: '#7C3AED', fontWeight: '600' },
  check: { color: '#7C3AED', fontSize: 16, fontWeight: 'bold' },
  footer: { padding: 24 },
  boton: { backgroundColor: '#7C3AED', borderRadius: 16, padding: 18, alignItems: 'center' },
  botonDisabled: { opacity: 0.4 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5 },
});

export default OnboardingScreen;