// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeperator";
// import FONTS from "../constants/Fonts";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from "../services/MovieService";

const Genres = [
  "All",
  "Comedy",
  "Thriller",
  "Action",
  "Sports",
  "Romance",
  "Horror",
];

export default function HomeScreen({navigation}) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [UpcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{ id: 10110, name: "All" }]);

  useEffect(() => {
    // console.log(getNowPlayingMovies(),"------getNowPlayingMovies");
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data) 
  )
    
    getUpcomingMovies().then((movieResponse) =>
      setUpcomingMovies(movieResponse.data)
    );
    getAllGenres().then((genreResponse) =>
      setGenres([...genres, ...genreResponse.data.genres])
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle = "default"/>
      {/* <StatusBar
        style="dark"
        // translucent={false}
        // backgroundColor={COLORS.BLACK}
      /> */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>It All Starts Here</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>

      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View>

      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={()=>navigation.navigate("movie", {movieId:item.id})}
            />
          )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon!</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>

      <View>
        <FlatList
          data={UpcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={()=>navigation.navigate("movie", {movieId:item.id})}

            />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
    paddingTop: 35,
  },
  genreListContainer: {
    fontFamily: 'Ubuntu-Bold',
    paddingVertical: 10,
  },
  headerContainer: {
    // fontFamily: FONTS.EXTRABOLD,
    // backgroundColor: COLORS.ACTIVE,
    fontSize: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    // color: COLORS.WHITE,
    color: COLORS.BLACK,
    fontSize: 20,
    fontFamily:'Ubuntu-Bold',
    // fontWeight: "bold",
  },
  headerSubTitle: {
    fontFamily: 'Ubuntu-BoldItalic',
    paddingTop: 10,
    fontSize: 14,
    // color: COLORS.WHITE,
    color: COLORS.BLACK,
  },
});
