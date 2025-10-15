import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, FlatList 
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Turma = {
  nome: string;
  participantes: { id?: number; nome: string; time: string }[];
};

type RootStackParamList = {
  DetalhesTurma: { turma: Turma };
  NovaTurma: undefined;
};

type TurmasScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function TurmasScreen({ navigation }: TurmasScreenProps) {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const STORAGE_KEY = '@turmas';

  useEffect(() => {
    const loadTurmas = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setTurmas(JSON.parse(saved));
        } else {
          setTurmas([]);
        }
      } catch (e) {
        console.error('Erro ao carregar turmas:', e);
      }
    };

    loadTurmas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/Logo.png')} />
        <Text style={styles.title}>Turmas</Text>
        <Text style={styles.subtitle}>jogue com a sua turma</Text>
      </View>

      <FlatList
        style={styles.list}
        data={turmas}
        keyExtractor={(item, index) => item.nome + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.turmaItem}
            onPress={() => navigation.navigate('DetalhesTurma', { turma: item })}
          >
            <Image style={styles.icon} source={require('../../assets/group.png')} />
            <Text style={styles.turmaText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
            Nenhuma turma cadastrada
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('NovaTurma')}
      >
        <Text style={styles.buttonText}>Criar nova turma</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
  },
  list: {
    flex: 1,
    marginTop: 40,
  },
  turmaItem: {
    backgroundColor: '#202024',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  turmaText: {
    color: '#fff',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#00875f',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
