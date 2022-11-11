import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import COLORS from '../constants/Colors';
import IMAGES from '../constants/Images';
import {getPoster} from '../services/MovieService';

const CastCard = ({originalName, characterName, image}) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? {uri: getPoster(image)} : IMAGES.NO_IMAGE}
        resizeMode={image ? 'cover' : 'contain'}
        style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>
        {originalName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  originalName: {
    width: 80,
    color: COLORS.BLACK,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
  },
  characterName: {
    width: 80,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 10,
    color: COLORS.LIGHT_GRAY,
  },
});

export default CastCard;
