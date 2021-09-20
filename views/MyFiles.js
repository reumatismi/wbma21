import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import ListItem from '../components/ListItem';
import {useMedia} from '../hooks/ApiHooks';

const MyFiles = ({navigation}) => {
  const {mediaArray} = useMedia(true);
  // console.log('List.js - List: mediaArray', mediaArray);
  return (
    <FlatList
      data={mediaArray.reverse()}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          showButtons={true}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyFiles;
