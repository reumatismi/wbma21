import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import React, {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const [isFetching, setIsFetching] = useState(false);
  // console.log('List.js - List: mediaArray', mediaArray);
  const refreshList = () => {
    setIsFetching(true);
    setUpdate(update + 1);
  };
  useEffect(() => {
    setIsFetching(false);
  }, [mediaArray]);
  console.log('List: mediaArray', mediaArray);
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          showButtons={false}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      onRefresh={refreshList}
      refreshing={isFetching}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default List;
