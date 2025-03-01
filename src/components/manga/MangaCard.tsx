import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {Manga} from '../../services/types/manga';
interface MangaCardProps {
  manga: Manga;
  onPress: () => void;
}
export const MangaCard: React.FC<MangaCardProps> = ({manga, onPress}) => {
  const coverArt = manga.relationships.find(r => r.type === 'cover_art');
  const coverUrl = coverArt?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
    : 'https://via.placeholder.com/150';
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Cover source={{uri: coverUrl}} style={styles.cardImage} />
        <Card.Content>
          <Title style={{fontSize: 13}} numberOfLines={2}>
            {manga.attributes.title.en}
          </Title>
          <Paragraph
            style={{fontSize: 10}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {manga.attributes.tags.map(t => t.attributes.name.en).join(', ')}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    height: 250,
    margin: 8,
    width: width / 2 - 24,
  },
  cardImage: {
    height: 150,
    resizeMode: 'cover',
  },
});
