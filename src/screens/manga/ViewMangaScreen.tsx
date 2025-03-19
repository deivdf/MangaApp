import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Manga} from '../../services/types/manga';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Title} from 'react-native-paper';
import {ChapetersRespones} from '../../services/types/manga';
import {useMangaCaplist} from '../../hooks/useManga';
type Mangaprops = {
  ViewMangaScreen: {manga: Manga};
};
type ViewMangaScreenRouteProp = RouteProp<Mangaprops, 'ViewMangaScreen'>;
export const ViewMangaScreen = () => {
  const route = useRoute<ViewMangaScreenRouteProp>(); // Obtiene los params
  const {manga} = route.params;
  const coverArt = manga?.relationships.find(r => r.type === 'cover_art');
  const coverUrl = coverArt?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga?.id}/${coverArt.attributes.fileName}`
    : 'https://via.placeholder.com/150';
  const id = manga?.id;
  const {data} = useMangaCaplist(id);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{uri: coverUrl}} style={styles.image} />
        <Title style={styles.title}>{manga?.attributes.title.en}</Title>
        <Text style={styles.description}>
          {manga?.attributes.description.es?.length
            ? manga?.attributes.description.es
            : manga?.attributes.description.en || 'descripción no encontrada'}
        </Text>
        <Text style={styles.capitulos}>
          Capítulos: {data?.data?.length || 'No hay capítulos'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  description: {
    paddingBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  capitulos: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    marginTop: 16,
  },
});
