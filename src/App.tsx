import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './screens/home/HomeScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <HomeScreen />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
