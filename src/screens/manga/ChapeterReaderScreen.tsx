import {NavigationProp, RouteProp, useRoute} from '@react-navigation/native';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';
import {useChapeterImage} from '../../hooks/useManga';
import {useEffect, useState} from 'react';

type Props = {
  ChapterReaderScreen: {id: string};
  navigation: NavigationProp<any>;
};

type ChapterReaderScreenProps = RouteProp<Props, 'ChapterReaderScreen'>;

const ChapterReaderScreen = () => {
  const [image, setImage] = useState<string[]>([]);
  const route = useRoute<ChapterReaderScreenProps>();
  const {id} = route.params;
  const {data, isLoading, error} = useChapeterImage(id);
  const windowWidth = Dimensions.get('window').width;
  useEffect(() => {
    if (Array.isArray(data)) {
      setImage(data);
    }
  }, [data]);
  console.log('tarido desde usestate', image);
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>No data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {image?.map((url, index) => (
        <Image
          key={index}
          source={{uri: url}}
          style={{
            width: windowWidth,
            height: 500,
            resizeMode: 'contain',
          }}
        />
      ))}
    </ScrollView>
  );
};

export default ChapterReaderScreen;
