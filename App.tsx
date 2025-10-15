import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TurmasScreen from '@/app/Turmas';
import NovaTurmaScreen from '@/app/NovaTurma';
import DetalhesTurmaScreen from '@/app/DetalhesTurma';

export type RootStackParamList = {
  Turmas: undefined;
  NovaTurma: undefined;
  DetalhesTurma: {
    turma: {
      nome: string;
      participantes?: { id: number; nome: string; time: string }[];
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Turmas" component={TurmasScreen} />
        <Stack.Screen name="NovaTurma" component={NovaTurmaScreen} />
        <Stack.Screen name="DetalhesTurma" component={DetalhesTurmaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

