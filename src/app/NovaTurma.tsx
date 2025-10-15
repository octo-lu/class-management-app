import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation'; 

type Turma = {
  nome: string;
  participantes: { id?: number; nome: string; time: string }[];
};

type Props = StackScreenProps<RootStackParamList, 'NovaTurma'>;

export default function NovaTurmaScreen({ navigation }: Props) {
  const [nomeTurma, setNomeTurma] = useState('');
  const STORAGE_KEY = '@turmas';

  const handleCreate = async () => {
    if (!nomeTurma.trim()) return;

    try {

      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const turmas: Turma[] = saved ? JSON.parse(saved) : [];

      const newTurma: Turma = { nome: nomeTurma, participantes: [] };
      const updatedTurmas = [...turmas, newTurma];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTurmas));

      navigation.navigate('DetalhesTurma', { 
        turma: { 
          nome: newTurma.nome, 
          participantes: newTurma.participantes.map((p, idx) => ({
            id: p.id ?? idx, 
            nome: p.nome,
            time: p.time
          }))
        } 
      });

      setNomeTurma('');
    } catch (e) {
      console.error('Erro ao salvar turma:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Image style={styles.icon} source={require('../../assets/group.png')} />

      <Text style={styles.title}>Nova Turma</Text>
      <Text style={styles.subtitle}>crie uma turma para adicionar pessoas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da turma"
        placeholderTextColor="#777"
        value={nomeTurma}
        onChangeText={setNomeTurma}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#202024',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#00875f',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
