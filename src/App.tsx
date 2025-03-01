import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigatorTab} from './hooks/BottomNavigatorTab';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <BottomNavigatorTab />
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
