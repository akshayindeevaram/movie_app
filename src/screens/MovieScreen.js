// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/Colors';
import CastCard from '../components/CastCard';
import {
  getMovieById,
  getPoster,
  getVideo,
  getLanguage,
} from '../services/MovieService';
import ItemSeparator from '../components/ItemSeperator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {APPEND_TO_RESPONSE as AR} from '../constants/Urls';
import MovieCard from '../components/MovieCard';
import {FlatList} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');
const setHeight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;

const MovieScreen = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState({});
  useEffect(() => {
    getMovieById(
      movieId,
      `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`,
    ).then(response => setMovie(response.data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar style="light"/> */}
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(217,217,217,0)']}
        // start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{uri: getPoster(movie.backdrop_path)}}
        />
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={35}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Share.share({message: `${movie?.title}\n\n${movie?.homepage}`});
          }}>
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.PlayButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}>
        <Ionicons name="play-circle-outline" size={70} color={COLORS.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="ios-heart" size={22} color={COLORS.HEART} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map(genre => genre?.name)?.join(', ')}| {movie?.runtime}
        Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubmenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}>
            <Text
              style={{
                ...styles.castSubmenuText,
                color: isCastSelected ? COLORS.BLACK : COLORS.LIGHT_GRAY,
              }}>
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}>
            <Text
              style={{
                ...styles.castSubmenuText,
                color: isCastSelected ? COLORS.LIGHT_GRAY : COLORS.BLACK,
              }}>
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginVertical: 5}}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={item => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({item}) => (
            <CastCard
              image={item?.profile_path}
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        style={{marginVertical: 5}}
        data={movie?.recommendations?.results}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate('movie', {movieId: item.id})}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        style={{marginVertical: 5}}
        data={movie?.similar?.results}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate('movie', {movieId: item.id})}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    height: setHeight(35),
    width: setWidth(145),
  },
  linearGradient: {
    height: setHeight(6),
    width: setWidth(100),
    position: 'absolute',
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: 'Ubuntu-Medium',
  },
  PlayButton: {
    position: 'absolute',
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: COLORS.BLACK,
    fontFamily: 'Ubuntu-Medium',
    fontSize: 18,
    width: setWidth(60),
  },
  row: {
    flexDirection: 'row',
    color: COLORS.BLACK,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 15,
    marginLeft: 5,
  },
  genreText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  overviewContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewText: {
    color: COLORS.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 13,
    textAlign: 'justify',
  },
  overviewTitle: {
    color: COLORS.BLACK,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 18,
  },
  castTitle: {
    fontSize: 18,
    marginLeft: 20,
    color: COLORS.BLACK,
    fontFamily: 'Ubuntu-Bold',
  },
  castSubmenuContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  castSubmenuText: {
    marginRight: 10,
    color: COLORS.BLACK,
    fontSize: 13,
    fontFamily: 'Ubuntu-Bold',
  },
  extraListTitle: {
    marginLeft: 20,
    color: COLORS.BLACK,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 18,
    marginVertical: 8,
  },
});
export default MovieScreen;
