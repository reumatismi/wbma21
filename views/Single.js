import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Image, Text} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';

const Single = ({route}) => {
  const {params} = route;
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', paddingBottom: 20}}>
        <Image
          style={{width: 400, height: 400}}
          source={{uri: uploadsUrl + params.filename}}
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={{textAlign: 'left', paddingLeft: 50}}>
        <Text h3>{params.title}</Text>
        <Text style={styles.listdescription}>{params.description}</Text>
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
