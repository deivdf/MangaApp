import {ScrollView, Text} from 'react-native';
import {Manga} from '../../services/types/manga';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Title} from 'react-native-paper';
type Mangaprops = {
  ViewMangaScreen: {manga: Manga};
};
type ViewMangaScreenRouteProp = RouteProp<Mangaprops, 'ViewMangaScreen'>;
export const ViewMangaScreen = () => {
  const route = useRoute<ViewMangaScreenRouteProp>(); // Obtiene los params
  const {manga} = route.params;
  return (
    <ScrollView>
      <Title>{manga?.attributes.title.en}</Title>
      <Text>
        {manga?.attributes.description.es?.length
          ? manga?.attributes.description.es
          : manga?.attributes.description.en || 'descripción no encontrada'}
      </Text>
      <Text>Caplitulos: {manga?.attributes.lastChapter}</Text>
    </ScrollView>
  );
};
