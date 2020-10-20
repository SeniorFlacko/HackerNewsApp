import React, {useCallback} from 'react';
import {
  Alert,
  Button,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <TouchableOpacity style={styles.urlButton} onPress={handlePress}>
      <Icon style={styles.icon} name="open-outline" size={30} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
  urlButton: {
    marginHorizontal: 15,
  },
});
export default OpenURLButton;
