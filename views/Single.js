import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Image, Text} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {Video, Audio} from 'expo-av';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {params} = route;
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const {getUserInfo} = useUser();
  const videoRef = useRef(null);
  console.log(route);

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(params.user_id, token));
  };

  useEffect(() => {
    getOwnerInfo();
  }, []);

  return (
    <SafeAreaView>
      {params.media_type === 'image' && (
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <Image
            style={{width: 400, height: 400}}
            source={{uri: uploadsUrl + params.filename}}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      )}
      {params.media_type === 'video' && (
        <Video
          ref={videoRef}
          style={{width: 400, height: 400}}
          source={{uri: uploadsUrl + params.filename}}
          useNativeControls
          resizeMode="contain"
        />
      )}
      {params.media_type === 'audio' && (
        <>
          <Text>No audio support yet</Text>
          <Audio></Audio>
        </>
      )}
      <View style={{textAlign: 'left', paddingLeft: 50}}>
        <Text h3>{params.title}</Text>
        <Text>User: {params.user_id}</Text>
        <Text>Username: {ownerInfo.username}</Text>
        <Text>Filetype: {params.media_type}</Text>
        <Text>Filesize: {params.filesize}</Text>
        <Text>File id: {params.file_id}</Text>
        <Text style={styles.listdescription}>
          Description: {params.description}
        </Text>
        <Text>{format(new Date(params.time_added), 'EEEE dd.MM.yyyy')}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
