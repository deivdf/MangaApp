import {Modal, Portal, Text, Title} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Manga} from '../../services/types/manga';
interface ModalProps {
  visible: boolean;
  hidenModal: () => void;
  manga: Manga | null;
}

export const MangaModal = ({visible, hidenModal, manga}: ModalProps) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hidenModal} style={styles.container}>
        <Title>{manga?.attributes.title.en}</Title>
        <Text>{manga?.attributes.description.en}</Text>
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
});
