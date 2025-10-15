import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Header } from '@/components/Header';
import { Title } from '@/components/Title';
type StackParamList = {
  Home: undefined;
  Product: undefined;
};

export function Product() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>(); 

  return (
    <View style={{ flex: 1, padding: 32, paddingTop: 54 }}>
      <Header>
        <ButtonIcon
          name="arrow-circle-left"
          onPress={() => navigation.navigate('Home')} 
        />
        <Title>Product</Title>
      </Header>
    </View>
  );
}