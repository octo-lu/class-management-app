import { RootStackParamList } from '@/types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = StackScreenProps<RootStackParamList, 'DetalhesTurma'>;

type Participante = {
  id: number;
  nome: string;
  time: 'time 1' | 'time 2';
};

export default function DetalhesTurmaScreen({ route, navigation }: Props) {
  const { turma } = route.params;
  const STORAGE_KEY = '@turmas';

  const [participantes, setParticipantes] = useState<Participante[]>(
    (turma.participantes
      ? turma.participantes.map((p: any) => ({
          ...p,
          time: p.time === 'time 1' ? 'time 1' : 'time 2',
        }))
      : [])
  );
  const [nome, setNome] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<'time 1' | 'time 2'>('time 1');

  const saveParticipants = useCallback(async (updatedParticipants: Participante[]) => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const turmas = saved ? JSON.parse(saved) : [];

      const updatedTurmas = turmas.map((t: any) =>
        t.nome === turma.nome ? { ...t, participantes: updatedParticipants } : t
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTurmas));
      console.log('Participantes salvos com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar participantes:', e);
    }
  }, [turma.nome]);

  useEffect(() => {
    saveParticipants(participantes);
  }, [participantes, saveParticipants]);

  const handleAdd = () => {
    if (!nome.trim()) return;

    const newParticipant: Participante = {
      id: Date.now(),
      nome: nome.trim(),
      time: selectedTeam,
    };

    const updatedParticipants = [...participantes, newParticipant];
    setParticipantes(updatedParticipants);
    setNome('');
  };

  const handleRemove = (id: number) => {
    const updatedParticipants = participantes.filter((p) => p.id !== id);
    setParticipantes(updatedParticipants);
  };

  const filteredParticipants = participantes.filter(
    (p) => p.time === selectedTeam
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{turma.nome}</Text>
      <Text style={styles.subtitle}>adicione a galera e separe os times</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#777"
          value={nome}
          onChangeText={setNome}
          onSubmitEditing={handleAdd} 
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTeam === 'time 1' && styles.tabActive]}
          onPress={() => setSelectedTeam('time 1')}
        >
          <Text style={styles.tabText}>TIME 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTeam === 'time 2' && styles.tabActive]}
          onPress={() => setSelectedTeam('time 2')}
        >
          <Text style={styles.tabText}>TIME 2</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {filteredParticipants.map((p) => (
          <View key={p.id} style={styles.item}>
            <Text style={styles.itemText}>{p.nome}</Text>
            <TouchableOpacity onPress={() => handleRemove(p.id)}>
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    padding: 24,
  },
  backButton: {
    marginTop: 40,
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#202024',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#00875f',
    width: 45,
    height: 45,
    marginLeft: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 24,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#202024',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#00875f',
  },
  tabText: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#202024',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
  },
  removeText: {
    color: '#f75a68',
    fontSize: 20,
  },
  removeTeamButton: {
    backgroundColor: '#f75a68',
    padding: 16,
    borderRadius: 8,
  },
  removeTextButton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
