import {useState} from 'react';
import {View} from 'react-native';
import {Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import {FlatList, StyleSheet} from 'react-native';
import {useMangalist} from '../../hooks/useManga';
import {MangaCard} from '../../components/manga/MangaCard';
import {ButtonPage} from '../../components/bottons/BottonPage';
import {MangaModal} from '../../components/modals/MangaModal';
import {Manga} from '../../services/types/manga';
//import {Manga} from '../../services/types/manga';
export const HomeScreen = ({navigation}: any) => {
  const [offset, setOffset] = useState(0);
  //const [recarga, setRecarga] = useState(false);
  const {data, isLoading, isError, error} = useMangalist(offset);
  const [visible, setVisible] = useState(false);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const showModal = (manga: Manga) => {
    setSelectedManga(manga);
    setVisible(true);
  };
  const hidenModal = () => setVisible(false);
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
    <View style={styles.center}>
      <ButtonPage offset={offset} setOffset={setOffset} data={data} />
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
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#295075',
    alignItems: 'center',
  },
  card: {
    margin: 16,
  },
  gridContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  columnWapper: {
    justifyContent: 'space-between',
  },
});
