import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import React, {useEffect} from "react";
import {createStackNavigator} from '@react-navigation/stack' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from "./Screens/LoginScreen";
import OnBoardingScreen from "./Screens/OnBoardingScreen";

const AppStack = createStackNavigator();

export default function App() {
  const [ isFirstLaunch , setIsFirstLaunch ] = React.useState(null);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched' ).then(value => {
      if(value== null){
        AsyncStorage.setItem('alreadyLaunched' , 'true');
        setIsFirstLaunch(true);

      }else{
        setIsFirstLaunch(false);
      }
    });



  },[]);
  if (isFirstLaunch == null){
    return null ;
  }else if (isFirstLaunch===true) {
    return (
        <NavigationContainer>
          <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name={"Onboarding"} component={OnBoardingScreen}/>
            <AppStack.Screen name={"login"} component={LoginScreen}/>

          </AppStack.Navigator>
        </NavigationContainer>
    );
  }
  else {
    return (
          <NavigationContainer>
            <AppStack.Navigator headerMode="none">
              <AppStack.Screen name={"login"} component={LoginScreen}/>
              <AppStack.Screen name={"Onboarding"} component={OnBoardingScreen}/>
            </AppStack.Navigator>
          </NavigationContainer>
    )

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
