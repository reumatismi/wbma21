import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {
  ListItem as NBListItem,
  Button,
  Image,
  Text,
  Divider,
} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({singleMedia, navigation, showButtons}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

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
          {showButtons && (
            <>
              <Button
                title="Modify"
                onPress={() => {
                  navigation.navigate('Modify', {singleMedia, navigation});
                }}
              />
              <Button
                title="Delete"
                onPress={async () => {
                  try {
                    const token = await AsyncStorage.getItem('userToken');
                    const response = await deleteMedia(
                      singleMedia.file_id,
                      token
                    );
                    console.log('Delete', response);
                    if (response.message) {
                      setUpdate(update + 1);
                    }
                  } catch (e) {
                    console.log('ListItem, delete: ', e.message);
                  }
                }}
              />
            </>
          )}
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
  showButtons: PropTypes.bool.isRequired,
};

export default ListItem;
