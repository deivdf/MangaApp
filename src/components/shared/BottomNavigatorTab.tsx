import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../../screens/home/HomeScreen';
import {SerchScreen} from '../../screens/serch/SerchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {SaveMangaScreen} from '../../screens/manga/SaveMangaScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {ViewMangaScreen} from '../../screens/manga/ViewMangaScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const screenOption = ({route}: any) => ({
  tabBarIcon: ({focused, color, size}: any) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Search') {
      iconName = focused ? 'search' : 'search-outline';
    } else if (route.name === 'Love') {
      iconName = focused ? 'heart' : 'heart-outline';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarStyle: {backgroundColor: '#FF9D3D'},
  tabBarActiveTintColor: '#000000',
  tabBarInactiveTintColor: '#697565',
  headerShown: false,
});
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ViewMangaScreen" component={ViewMangaScreen} />
    </Stack.Navigator>
  );
}

export const BottomNavigatorTab = () => (
  <Tab.Navigator screenOptions={screenOption}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Search" component={SerchScreen} />
    <Tab.Screen name="Love" component={SaveMangaScreen} />
  </Tab.Navigator>
);
