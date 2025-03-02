import {useState} from 'react';
import {View} from 'react-native';
import {Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import {FlatList, StyleSheet} from 'react-native';
import {useMangalist} from '../../hooks/useManga';
import {MangaCard} from '../../components/manga/MangaCard';
import {Alert} from 'react-native';
import {ButtonPage} from '../../components/bottons/BottonPage';
export const HomeScreen = () => {
  const [offset, setOffset] = useState(0);
  const [recarga, setRecarga] = useState(false);
  const {data, isLoading, isError, error} = useMangalist(offset);
  const handleMangaPress = () => {
    Alert.alert('Manga Pressed');
  };
  if (isLoading) {
    <ActivityIndicator
      style={styles.center}
      size="large"
      animating={true}
      color="#000"
    />;
  }
  if (isError) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>Error</Title>
          <Paragraph>{error.message}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
  return (
    <View style={styles.background}>
      <FlatList
        data={data?.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MangaCard manga={item} onPress={handleMangaPress} />
        )}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWapper}
        //style={styles.faslist}
      />

      <ButtonPage offset={offset} setOffset={setOffset} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#d0d0d0',
  },
  card: {
    margin: 16,
  },
  gridContainer: {
    paddingHorizontal: 5,
    //paddingBottom: 100,
  },
  faslist: {
    flex: 1,
  },
  columnWapper: {
    justifyContent: 'space-between',
  },
});
