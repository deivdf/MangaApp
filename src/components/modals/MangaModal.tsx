import {Button, Modal, Portal, Text, Title} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import {Manga} from '../../services/types/manga';
import {ScrollView} from 'react-native';
//import {useNavigation} from '@react-navigation/native';
interface ModalProps {
  visible: boolean;
  hidenModal: () => void;
  manga: Manga;
}

export const MangaModal = ({visible, hidenModal, manga}: ModalProps) => {
  //const navigation = useNavigation();
  const coverArt = manga?.relationships.find(r => r.type === 'cover_art');
  const coverUrl = coverArt?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
    : 'https://via.placeholder.com/150';
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hidenModal} style={styles.container}>
        <View style={styles.textcontainer}>
          <Image source={{uri: coverUrl}} style={styles.image} />
          <Title style={styles.title}>{manga?.attributes.title.en}</Title>
          <ScrollView>
            <Text style={styles.text}>
              {manga?.attributes.description.es?.length
                ? manga?.attributes.description.es
                : manga?.attributes.description.en}
            </Text>
          </ScrollView>
          <Button>Leer</Button>
        </View>
      </Modal>
    </Portal>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%', // Increased width for better visibility
    height: '60%',
    alignSelf: 'center',
    borderRadius: 10,
    position: 'absolute', // Added for absolute positioning
    marginLeft: 40,
    marginTop: 100,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
});
