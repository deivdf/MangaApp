import React, {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Manga} from '../../services/types/manga';
import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import {Title} from 'react-native-paper';
import {useMangaCaplist} from '../../hooks/useManga';

type Mangaprops = {
  ViewMangaScreen: {manga: Manga};
  navigation: NavigationProp<any>;
};

type ViewMangaScreenRouteProp = RouteProp<Mangaprops, 'ViewMangaScreen'>;

export const ViewMangaScreen = ({navigation}: any) => {
  const route = useRoute<ViewMangaScreenRouteProp>(); // Obtiene los params
  const {manga} = route.params;
  const coverArt = manga?.relationships.find(r => r.type === 'cover_art');
  const coverUrl = coverArt?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga?.id}/${coverArt.attributes.fileName}`
    : 'https://via.placeholder.com/150';
  const id = manga?.id;
  const {data} = useMangaCaplist(id);
  const [language, setLanguage] = useState<'en' | 'es'>('en'); // Estado para el idioma seleccionado

  // Función para obtener el título del capítulo según el idioma
  const getChapterTitle = useCallback(
    (chapter: any) => {
      if (chapter?.attributes?.title) {
        return chapter.attributes.title; // Si el capítulo tiene un título, usarlo independientemente del idioma
      }

      const localizedTitle = chapter?.attributes?.names?.[language];
      if (localizedTitle) {
        return localizedTitle;
      }

      // Si no hay título localizado, devolver un título por defecto.  Esto es importante para que no aparezca undefined
      return `Capítulo ${chapter?.attributes?.chapter}`;
    },
    [language],
  );
  //funcion que ordena los capitulos por numero organizadolos en compracion
  const sortedChapters = data?.data
    ? //revisa que exista el arreglo de capitulos y no sean nulos
      [...data.data].sort((a: any, b: any) => {
        //guarda un a copia de los capitulos para no modificar el original y aplica el ordenamiento con dos
        //parametros para comparar los capitulos por numero ya que son strings en formato decimal
        const chapterA = parseFloat(a?.attributes?.chapter || '0');
        // los ordena de forma ascendente y los parsea para que sean numeros
        const chapterB = parseFloat(b?.attributes?.chapter || '0');
        return chapterA - chapterB;
        // aqui se agrega el ordenamiento por numero de capitulos y se ordena deacuerdo a los capitulos si estan o no
      })
    : [];

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

        {/* Selector de Idioma */}
        <View style={styles.languageSelector}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'en' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('en')}>
            <Text
              style={[
                styles.languageButtonText,
                language === 'en' && styles.languageButtonTextActive,
              ]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'es' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('es')}>
            <Text
              style={[
                styles.languageButtonText,
                language === 'es' && styles.languageButtonTextActive,
              ]}>
              Español
            </Text>
          </TouchableOpacity>
        </View>
        {/*
          <Text style={styles.capitulos}>
            Capítulos: {data?.data?.length || 'No hay capítulos'}
          </Text>
          */}

        {sortedChapters.map((cap: any) => (
          <TouchableOpacity
            key={cap.id}
            onPress={() =>
              navigation.navigate('ChapeterReaderScreen', {id: cap.id})
            }>
            <Text>{getChapterTitle(cap)}</Text>
          </TouchableOpacity>
        ))}
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
    fontSize: 32,
    fontWeight: '800',
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
    textAlign: 'justify',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 16,
  },
  capitulos: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    marginTop: 16,
  },
  languageSelector: {
    marginBottom: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 8,
  },
  languageButtonActive: {
    backgroundColor: '#ddd',
  },
  languageButtonText: {
    fontSize: 16,
    color: '#333',
  },
  languageButtonTextActive: {
    fontWeight: 'bold',
  },
});
