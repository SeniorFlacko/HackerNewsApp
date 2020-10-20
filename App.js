import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, TouchableOpacity} from 'react-native';
import HomeScreen from './screens/Home';
import NewDetails from './screens/NewDetails';
import OpenUrlButton from './components/OpenUrlButton';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ff6600',
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Top Stories',
            }}
          />
          <Stack.Screen
            name="NewDetails"
            component={NewDetails}
            options={(navigation) => ({
              title: '',
              headerRight: () => (
                <OpenUrlButton
                  style={styles.urlButton}
                  url={navigation.route.params.url}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  urlButton: {
    color: 'white',
    marginHorizontal: 15,
  },
});

export default App;
