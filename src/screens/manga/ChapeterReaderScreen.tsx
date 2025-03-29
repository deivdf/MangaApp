import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import {Text, View} from 'react-native';

type Props = {
  ChapterReaderScreen: {id: string};
  navigation: NavigationProp<any>;
};

type ChapterReaderScreenProps = RouteProp<Props, 'ChapterReaderScreen'>;

const ChapeterReaderScreen = () => {
  const route = useRoute<ChapterReaderScreenProps>();
  const {id} = route.params;
  return (
    <View>
      <Text>Chapter Reader Screen hello {id}</Text>
    </View>
  );
};

export default ChapeterReaderScreen;
