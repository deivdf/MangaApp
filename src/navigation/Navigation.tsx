import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MangaModal} from '../components/modals/MangaModal';
import {ViewMangaScreen} from '../screens/manga/ViewMangaScreen';
import {Manga} from '../services/types/manga';
export type RootStackParamList = {
  MangaModal: { visible: boolean; manga: Manga }; // Define los parámetros aquí
  ViewMangaScreen: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ViewMangaScreen">
        {/*<Stack.Screen name="MangaModal" component={MangaModal} />*/}
        <Stack.Screen name="ViewMangaScreen" component={ViewMangaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
