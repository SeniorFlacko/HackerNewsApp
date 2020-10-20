import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import HackNewOverView from '../components/HackNewOverView';

const Separator = () => (
  <View
    style={{
      height: 1,
      width: '100%',
      backgroundColor: '#C8C8C8',
    }}
  />
);

const Home = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search')
      .then((response) => response.json())
      .then((response) => setNews(response.hits))
      .catch((error) => console.error('Error While Getting News: ', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            ItemSeparatorComponent={Separator}
            data={news}
            keyExtractor={(item) => item.objectID.toString()}
            renderItem={({item, index, separators}) => (
              <HackNewOverView
                title={item.title}
                author={item.author}
                points={item.points}
                objectID={item.objectID}
                navigation={props.navigation}
                numerOfComments={item.num_comments}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 3,
    backgroundColor: 'black',
  },
});
export default Home;
