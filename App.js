import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler' ;


import React, {useEffect} from "react";
import {createStackNavigator} from '@react-navigation/stack' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from "./Screens/LoginScreen";
import OnBoardingScreen from "./Screens/OnBoardingScreen";
import ListingPage from "./Screens/ListingPage";
import AdddBook from "./Screens/AdddBook";
const AppStack = createStackNavigator();

export default function App({navigation}) {

  const Stack = createStackNavigator()
  const [ isFirstLaunch , setIsFirstLaunch ] = React.useState(null);
  console.log(isFirstLaunch)
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
if (isFirstLaunch===true) {
    return (
        <NavigationContainer>
          <AppStack.Navigator  >

            <AppStack.Screen  name={"OnBording"} component={OnBoardingScreen}
                              options={{ headerShown: false }}/>
            <AppStack.Screen name={"BOOKS"} component={ListingPage}/>
            <AppStack.Screen name={"add"} component={AdddBook}/>
            <AppStack.Screen name={"login"} component={LoginScreen}/>


          </AppStack.Navigator>
        </NavigationContainer>
    );
  }
  else {
    return (
        /*<NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
              <AppStack.Screen name={"Listing"} component={ListingPage}/>
              <AppStack.Screen name={"Onboarding"} component={OnBoardingScreen}/>
            </AppStack.Navigator>
          </NavigationContainer>

        <NavigationContainer>
          <AppStack.Navigator>

          <AppStack.Screen name={"Onboarding"} component={OnBoardingScreen}/>
          <AppStack.Screen name={"Listing"} component={ListingPage}/>
          </AppStack.Navigator>
        </NavigationContainer>*/
        <NavigationContainer>
          <AppStack.Navigator>

            <AppStack.Screen name="BOOKS" component={ListingPage}
                          options={{ title: 'BOOKS' }} />
            <AppStack.Screen  name={"OnBording"} component={OnBoardingScreen} options={{ headerShown: false }}/>

            <AppStack.Screen name="add" component={AdddBook}
                          options={{ title: 'Overview' }} />
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
