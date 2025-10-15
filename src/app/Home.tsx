import React from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Header } from '@/components/Header';
import { Title } from '@/components/Title';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
  Home: undefined;
  Product: undefined;
};

export function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>(); 

  return (
    <View style={{ flex: 1, padding: 32, paddingTop: 54 }}>
      <Header>
        <Title>Home</Title>
        <ButtonIcon
          name="add-circle"
          onPress={() => navigation.navigate('Product')}
        />
      </Header>
    </View>
  );
}