import React, { useLayoutEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet ,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from "./Screens/LoginScreen";
import OnBoardingScreen from "./Screens/OnBoardingScreen";
import ListingPage from "./Screens/ListingPage";
import AdddBook from "./Screens/AdddBook";
import BookDetails from "./Screens/BookDetail";
import PdfViewer from "./Screens/PdfViewer";
import NotificationPage from "./Screens/Notifications";

const AppStack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
      <NavigationContainer>
        <AppStack.Navigator
            screenOptions={{
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
          {isFirstLaunch ? (
              <>
                <AppStack.Screen
                    name="OnBording"
                    component={OnBoardingScreen}
                    options={{ headerShown: false }}
                />
                <AppStack.Screen
                    name="BOOKS"
                    component={ListingPage}
                    options={{
                      title: 'LIVRES',
                      headerRight: () => (
                          <TouchableOpacity
                              onPress={() => navigation.navigate('NotificationPage')}
                              style={{ marginRight: 15 }}
                          >
                            <Ionicons name="notifications-outline" size={24} color="black" />
                          </TouchableOpacity>
                      ),
                    }}
                />
                <AppStack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Détails du livre' }} />
                <AppStack.Screen name="PdfViewer" component={PdfViewer} options={{ headerShown: true, title: '' }} />
                <AppStack.Screen name="add" component={AdddBook} options={{ title: 'AJOUT LIVRE' }} />
                <AppStack.Screen name="NotificationPage" component={NotificationPage} options={{ title: 'Notifications' }} />
                <AppStack.Screen name="login" component={LoginScreen} />
              </>
          ) : (
              <>
                <AppStack.Screen
                    name="BOOKS"
                    component={ListingPage}
                    options={{
                      title: 'LIVRES',
                      headerRight: () => (
                          <TouchableOpacity
                              onPress={() => navigation.navigate('NotificationPage')}
                              style={{ marginRight: 15 }}
                          >
                            <Ionicons name="notifications-outline" size={24} color="black" />
                          </TouchableOpacity>
                      ),
                    }}
                />
                <AppStack.Screen name="OnBording" component={OnBoardingScreen} options={{ headerShown: false }} />
                <AppStack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Détails du livre' }} />
                <AppStack.Screen name="PdfViewer" component={PdfViewer} options={{ headerShown: true, title: '' }} />
                <AppStack.Screen name="add" component={AdddBook} options={{ title: 'AJOUT LIVRE' }} />
                <AppStack.Screen name="NotificationPage" component={NotificationPage} options={{ title: 'Notifications' }} />
                <AppStack.Screen name="login" component={LoginScreen} />
              </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
