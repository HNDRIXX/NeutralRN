import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/app/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContextProvider } from './src/context/Context';
import Form from './src/app/Form';
import { Fonts } from './src/constants/Fonts';

export default function App() {
  const Stack = createNativeStackNavigator()
  const [fontsLoaded] = Fonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style='dark' />
        <NavigationContainer>
          {/* @ts-ignore */}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Home'
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={Form} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ContextProvider>
  );
}