import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HackNewOverView = (props) => {
  return (
    <View style={styles.newsContainer}>
      <TouchableOpacity
        onPress={() => {
          const newDetail = {
            objectID: props.objectID,
            url: props.url,
            title: props.title,
            author: props.author,
            points: props.points,
            numerOfComments: props.numerOfComments,
          };
          props.navigation.navigate('NewDetails', newDetail);
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title ? props.title : '--'}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <View style={styles.icon}>
          <Icon style={styles.iconf} name="heart-outline" size={20} />
          <Text style={styles.iconText}>{props.points}</Text>
        </View>
        <View style={styles.icon}>
          <Icon style={styles.iconf} name="person-outline" size={20} />
          <Text style={styles.iconText}>{props.author}</Text>
        </View>
        <View style={styles.icon}>
          <Icon
            style={styles.iconf}
            name="chatbubble-ellipses-outline"
            size={20}
          />
          <Text style={styles.iconText}>{props.numerOfComments}</Text>
        </View>
      </View>
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
    fontSize: 19,
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
  },
});

export default HackNewOverView;
