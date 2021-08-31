import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{uri: singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listtitle}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'gray',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 20,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#61627D',
    borderRadius: 5,
    flex: 1,
  },
  imagebox: {
    flex: 1,
  },
  textbox: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: '#A4A7D6',
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  listtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
