import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
interface ButtonPageProps {
  offset: number;
  setOffset: any;
  data: any;
}

export const ButtonPage = ({offset, setOffset, data}: ButtonPageProps) => {
  const limit = 20; // Asegúrate de que este valor coincida con el usado en la API
  const isFirstPage = offset === 0;
  const isLastPage = data?.data?.length < limit;

  return (
    <View style={styles.paginationContainer}>
      <Button
        mode="contained"
        onPress={() => setOffset((prev: any) => Math.max(prev - limit, 0))}
        disabled={isFirstPage}
        style={styles.button}>
        Anterior
      </Button>
      <Button
        mode="contained"
        onPress={() => setOffset((prev: any) => prev + limit)}
        disabled={isLastPage}
        style={styles.button}>
        Siguiente
      </Button>
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
    //backgroundColor: '#d0d0d0',
  },
  card: {
    margin: 16,
  },
  gridContainer: {
    paddingHorizontal: 5,
  },
  columnWapper: {
    justifyContent: 'space-between',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
