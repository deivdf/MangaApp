import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, Text, Surface} from 'react-native-paper';
import {useMangaSearch} from '../../hooks/useManga';

export const SerchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const {data, loading, error} = useMangaSearch(searchQuery);

  return (
    <Surface style={styles.container}>
      <Searchbar
        placeholder="Buscar manga..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.content}>
        <Text variant="titleMedium">Resultados de búsqueda</Text>
        {/* Aquí puedes agregar la lista de resultados */}
        {data?.data?.map(manga => (
          <Text key={manga.id}>{manga?.attributes?.title?.en}</Text>
        ))}
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
});
