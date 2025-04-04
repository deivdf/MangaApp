import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Searchbar, Text, Surface, IconButton} from 'react-native-paper';
import {useMangaSearch} from '../../hooks/useManga';
import {MangaCard} from '../../components/manga/MangaCard';
import {MangaModal} from '../../components/modals/MangaModal';
import {Manga} from '../../services/types/manga';
import {FlatList} from 'react-native';

export const SerchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const {data, isLoading, isError} = useMangaSearch(debouncedQuery);
  const [visible, setVisible] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);

  useEffect(() => {
    // Crear un timer que actualizará debouncedQuery después de 500ms
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 2000);

    // Limpiar el timer si searchQuery cambia antes de que pasen los 500ms
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const showModal = (manga: Manga) => {
    setSelectedManga(manga);
    setVisible(true);
  };

  const hidenModal = () => setVisible(false);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.center}
        size="large"
        animating={true}
        color="#000"
      />
    );
  }

  if (isError) {
    return <Text>Error...</Text>;
  }

  return (
    <Surface style={styles.container}>
      <Searchbar
        placeholder="Buscar manga..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        icon="magnify" // Icono de búsqueda
        clearIcon="close" // Icono para limpiar
        // Opcional: Agregar un icono al final
        right={() => (
          <IconButton
            icon="home-outline"
            size={20}
            onPress={() => {
              // Manejar el press del filtro
            }}
          />
        )}
      />

      <View style={styles.content}>
        <Text variant="titleMedium">Resultados de búsqueda</Text>
        <FlatList
          data={data?.data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <MangaCard manga={item} onPress={() => showModal(item)} />
            </View>
          )}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWapper}
        />
        <MangaModal
          visible={visible}
          hidenModal={hidenModal}
          navigation={navigation}
          manga={selectedManga}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 4,
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  columnWapper: {
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C7D9DD',
    alignItems: 'center',
  },
});
