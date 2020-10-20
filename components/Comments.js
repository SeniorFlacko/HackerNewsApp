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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Text style={styles.commentsTitle}>Comments</Text>
          {comments
            .filter((comment) => comment.text)
            .map((comment) => {
              return (
                <View key={comment.id}>
                  <View style={styles.authorContainer}>
                    <Text style={styles.authorText}>{comment.author}</Text>
                    <Icon
                      style={styles.chevron}
                      name="chevron-down-outline"
                      size={15}
                    />
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
