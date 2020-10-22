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
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';

const RenderComments = (props) => {
  const [visible, setVisible] = useState(false);
  const [allowChildrenDisplay, setallowChildrenDisplay] = useState([]);

  const allowingDisplayedChildren = (commentId) => {
    if (allowChildrenDisplay.includes(commentId)) {
      const allowedIds = allowChildrenDisplay.filter(
        (commmentid) => commmentid != commentId,
      );
      setallowChildrenDisplay(allowedIds);
      return;
    }

    return setallowChildrenDisplay((listOfAllowedIds) => [
      ...listOfAllowedIds,
      commentId,
    ]);
  };

  return (
    <View>
      {props.comments
        .filter((comment) => comment.text)
        .map((comment) => {
          return (
            <View key={comment.id} style={styles.commentSection}>
              <View style={styles.authorContainer}>
                <Text style={styles.authorText}>{comment.author}</Text>
                {comment.children.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      allowingDisplayedChildren(comment.id);
                    }}>
                    {allowChildrenDisplay.includes(comment.id) ? (
                      <Icon
                        style={styles.chevron}
                        name="chevron-up-outline"
                        size={15}
                      />
                    ) : (
                      <Icon
                        style={styles.chevron}
                        name="chevron-down-outline"
                        size={15}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <HTML html={comment.text} />
              {comment.children.length > 0 &&
              allowChildrenDisplay.includes(comment.id) ? (
                <RenderComments comments={comment.children} />
              ) : null}
            </View>
          );
        })}
    </View>
  );
};

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
            <RenderComments comments={comments} />
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
