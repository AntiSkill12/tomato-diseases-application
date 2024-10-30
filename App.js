import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './src/pages/firebaseConfig';  // Menginisialisasi Firebase
import SplashScreen1 from './src/pages/SplashScreen1';
import Home from './src/pages/Home';
import ArticleDetail from './src/pages/ArticleDetail';
import Deteksi from './src/pages/Deteksi';
import Hasil from './src/pages/Hasil';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="ArticleDetail" component={ArticleDetail} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = 'home-outline';
        } else if (route.name === 'Deteksi') {
          iconName = 'search-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="Deteksi" component={Deteksi} options={{ title: 'Deteksi' }} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen1" component={SplashScreen1} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Hasil" component={Hasil} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
