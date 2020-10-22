import React, {useState, useEffect} from 'react';
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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';

const Comments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/items/${props.objectID}`)
      .then((response) => response.json())
      .then((response) => setComments(response.children))
      .catch((error) => console.error('Error While Getting News: ', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <ScrollView style={{flex: 1}}>
            {comments
              .filter((comment) => comment.text)
              .map((comment) => {
                return (
                  <View key={comment.id} style={styles.commentSection}>
                    <View style={styles.authorContainer}>
                      <Text style={styles.authorText}>{comment.author}</Text>
                      <Icon
                        style={styles.chevron}
                        name="chevron-down-outline"
                        size={15}
                      />
                    </View>
                    <HTML html={comment.text} />
                  </View>
                );
              })}
          </ScrollView>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentSection: {
    marginHorizontal: 5,
  },
  chevron: {},
  authorText: {},
  commentsTitle: {
    fontSize: 22,
  },
  commentText: {
    marginVertical: 10,
  },
});
export default Comments;
