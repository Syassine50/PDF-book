import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import React, { useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from "./Screens/LoginScreen";
import OnBoardingScreen from "./Screens/OnBoardingScreen";
import ListingPage from "./Screens/ListingPage";
import AdddBook from "./Screens/AdddBook";
import BookDetails from "./Screens/BookDetail";
import PdfViewer from "./Screens/PdfViewer";

const AppStack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === true) {
    return (
        <NavigationContainer>
          <AppStack.Navigator>
            <AppStack.Screen name={"OnBording"} component={OnBoardingScreen} options={{ headerShown: false }} />
            <AppStack.Screen name={"BOOKS"} component={ListingPage} />
            <AppStack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Détails du livre' }} />
            <AppStack.Screen name={"add"} component={AdddBook} />
            <AppStack.Screen name={"login"} component={LoginScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
    );
  } else {
    return (
        <NavigationContainer>
          <AppStack.Navigator>
            <AppStack.Screen name="BOOKS" component={ListingPage} options={{ title: 'LIVRES' }} />
            <AppStack.Screen name={"OnBording"} component={OnBoardingScreen} options={{ headerShown: false }} />
            <AppStack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Détails du livre' }} />
            <AppStack.Screen name="PdfViewer" component={PdfViewer} options={{ headerShown: true , title:'' }} />
            <AppStack.Screen name="add" component={AdddBook} options={{ title: 'AJOUT LIVRE' }} />
          </AppStack.Navigator>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
