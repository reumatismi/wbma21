import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Platform, ActivityIndicator} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appID} from '../utils/variables';

const Upload = ({navigation}) => {
  // eslint-disable-next-line no-undef
  const [image, setImage] = useState(require('../assets/icon.png'));
  const [type, setType] = useState('');
  const {inputs, handleInputChange} = useUploadForm();
  const {uploadMedia, loading} = useMedia();
  const {addTag} = useTag();

  const doUpload = async () => {
    const filename = image.uri.split('/').pop();
    const formData = new FormData();
    formData.append('file', {uri: image.uri, name: filename, type});
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    // console.log('doUpload', formData);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await uploadMedia(formData, userToken);
      console.log('doUpload', result);
      const tagResult = await addTag(result.file_id, appID, userToken);
      console.log('doUpload', tagResult);
      if (tagResult.message) {
        navigation.navigate('Home');
      }
    } catch (e) {
      console.log('doUpload ', e.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({uri: result.uri});
      setType(result.type);
    }
  };

  return (
    <View>
      <Image source={image} style={{width: '100%', height: 200}} />
      <Button loading={loading} title="Select media" onPress={pickImage} />
      <UploadForm
        title="Upload"
        handleSubmit={doUpload}
        handleInputChange={handleInputChange}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Upload;
