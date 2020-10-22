import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Comments from '../components/Comments';

const NewDetails = (props) => {
  const {title, author, points, numerOfComments, objectID} = props.route.params;
  console.log(objectID);
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title ? title : '--'}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <View style={styles.icon}>
          <Icon style={styles.iconf} name="heart-outline" size={20} />
          <Text style={styles.iconText}>{points ? points : '0'}</Text>
        </View>
        <View style={styles.icon}>
          <Icon style={styles.iconf} name="person-outline" size={20} />
          <Text style={styles.iconText}>{author ? author : '--'}</Text>
        </View>
        <View style={styles.icon}>
          <Icon
            style={styles.iconf}
            name="chatbubble-ellipses-outline"
            size={20}
          />
          <Text style={styles.iconText}>
            {numerOfComments ? numerOfComments : '0'}
          </Text>
        </View>
      </View>
      <Comments objectID={objectID} />
    </View>
  );
};
const styles = StyleSheet.create({
  newsContainer: {
    margin: 10,
    backgroundColor: 'white',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 5,
  },
  iconf: {
    color: 'grey',
  },
  iconText: {
    color: 'grey',
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 15,
  },
  titleContainer: {
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 30,
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
  },
});
export default NewDetails;
