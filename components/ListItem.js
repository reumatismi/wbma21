import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {
  ListItem as NBListItem,
  Button,
  Image,
  Text,
  Divider,
  Icon,
} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';

const ListItem = ({singleMedia, navigation}) => {
  /*
  if (singleMedia.thumbnails === undefined) {
    singleMedia.thumbnails = {w160: 'jokuoosote'};
  }
  */
  return (
    <View>
      <NBListItem>
        <View>
          <Image
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
            source={{
              uri: uploadsUrl + singleMedia.thumbnails?.w160,
            }}
          />
        </View>
        <View style={styles.textbox}>
          <Text h4>{singleMedia.title}</Text>
          <Text h5>{singleMedia.description}</Text>
        </View>
        <Button
          title="View"
          onPress={() => {
            navigation.navigate('Single', singleMedia);
          }}
        />
      </NBListItem>
      <Divider></Divider>
    </View>
  );
};
const styles = StyleSheet.create({
  textbox: {
    flex: 2,
  },
  image: {
    flex: 1,
    borderRadius: 3,
    width: 100,
    height: 100,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
