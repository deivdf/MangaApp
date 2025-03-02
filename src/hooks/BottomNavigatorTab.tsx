import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {SerchScreen} from '../screens/serch/SerchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {SaveMangaScreen} from '../screens/manga/SaveMangaScreen';

const Tab = createBottomTabNavigator();

export const BottomNavigatorTab = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        // Asigna íconos según la ruta
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Love') {
          iconName = focused ? 'heart' : 'heart-outline';
        }

        // Retorna el ícono
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'red', // Color del ícono activo
      tabBarInactiveTintColor: 'black', // Color del ícono inactivo
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SerchScreen} />
    <Tab.Screen name="Love" component={SaveMangaScreen} />
  </Tab.Navigator>
);
