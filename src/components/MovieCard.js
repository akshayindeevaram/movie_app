import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
} from "react-native";
import COLORS from "../constants/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FONTS from "../constants/Fonts";
// import { Ionicons } from "@expo/vector-icons";
import IMAGES from "../constants/Images";
import { getPoster, getLanguage } from "../services/MovieService";

const MovieCard = ({
  title,
  language,
  voteAverage,
  voteCount,
  poster,
  size,
  heartLess,
  onPress
}) => {
  const [liked, setLiked] = useState(false);
  const [voteCountValue, setVoteCountvalue] = useState(voteCount);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{ ...styles.container, width: 230 * size, height: 340 * size }}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            source={IMAGES.IMDB}
            resizemode="cover"
            style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }}
          />
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 18  * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountvalue(
                liked ? voteCountValue - 1 : (voteCountValue + 1)
              );
            }}
          >
            <Ionicons
              name={liked ? "ios-heart" : "ios-heart-outline"}
              size={25 * size}
              color={liked ? COLORS.HEART : COLORS.WHITE}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            />
          </TouchableNativeFeedback>
        ) : null}
      </ImageBackground>

      <View>
        <Text
          style={{ ...styles.movieTitle, width: 230 * size }}
          numberOfLines={2}
        >
          {title}
        </Text>
        <View style={styles.movieSubTitleContainer}>
          <Text style={styles.movieSubTitle}>
            {getLanguage(language).english_name}
          </Text>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="ios-heart"
              size={19 * size}
              color={COLORS.HEART}
              style={{ marginRight: 10 }}
            />
            <Text>{voteCountValue}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: COLORS.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imdbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: COLORS.HEART,
    fontFamily: 'Ubuntu-Medium',
    fontSize: 50,
  },
  movieTitle: {
    width: 230,
    paddingVertical: 2,
    marginTop: 5,
    fontFamily: 'Ubuntu-Regular',
  },
  movieSubTitle: {
    fontFamily: 'Ubuntu-Regular',
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

MovieCard.defaultProps = {
  size: 1,
  heartLess: true,
};
export default MovieCard;
