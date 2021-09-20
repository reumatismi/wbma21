import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Alert} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import placeHolderImage from '../assets/icon.png';

const Modify = ({route}) => {
  const navigation = route.params.navigation;
  // const [image, setImage] = useState(require('../assets/icon.png'));
  const {
    inputs,
    setInputs,
    handleInputChange,
    handleReset,
    errors,
    handleOnEndEditing,
  } = useUploadForm();
  const {modifydMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const placeHolderUri = Image.resolveAssetSource(placeHolderImage).uri;

  useEffect(() => {
    (() => {
      setInputs({
        title: route.params.singleMedia.title,
        description: route.params.singleMedia.description,
      });
    })();
  }, []);

  const doUpload = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // console.log('doUpload', formData);
      const result = await modifyMedia(inputs, userToken);
      if (result.message) {
        Alert.alert(
          'Upload',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                handleReset();
                navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      console.log('doUpload error', e.message);
    }
  };

  return (
    <View>
      <UploadForm
        title="Upload"
        handleSubmit={doUpload}
        handleInputChange={handleInputChange}
        handleOnEndEditing={handleOnEndEditing}
        errors={errors}
        loading={loading}
        inputs={inputs}
      />
      {loading && <ActivityIndicator />}
      <Button
        title={'Reset'}
        onPress={() => {
          setImage({uri: placeHolderUri});
          handleReset();
        }}
      />
    </View>
  );
};

Modify.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Modify;
