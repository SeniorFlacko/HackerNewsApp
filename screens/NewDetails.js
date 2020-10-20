import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
const NewDetails = (props) => {
  return (
    <View>
      <Text>Object Id</Text>
      <Text>{props.route.params.objectID}</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default NewDetails;
