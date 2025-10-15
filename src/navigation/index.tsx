import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../app/Home';
import { Product } from '../app/Product';
import { createStackNavigator } from '@react-navigation/stack';

const MyStack = createStackNavigator();
    
const Bottom = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


export function MyTabs() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} 
      />
      <MyStack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }} 
      />
    </MyStack.Navigator>
  );
}