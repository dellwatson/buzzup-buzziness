import * as React from "react";
import { View, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListContent from "@/components/Home/List";
import useStore from "@/store/list-query";
import useFetchData from "@/hooks/useFetchData";
import VideoPublication from "@/components/Publication/VideoPublication";
import TwitterCard from "@/components/Publication/TwitterCard";
import Tweet from "@/components/Publication/SampleTweet";
import TweetPublication from "@/components/Publication/TweetPublication";
import MainPublication from "@/components/Publication/MainPublication";
import { FlashList } from "@shopify/flash-list";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useScrollStore } from "@/store/scroll-animation";

export default function HomeScreen() {
  // load data
  // get data from
  useFetchData();
  const { data, setQuery } = useStore();

  const setOpacity = useScrollStore((state) => state.setOpacity);

  const onScroll = useAnimatedScrollHandler((event) => {
    // scrollY.value = event.contentOffset.y;
    const offsetY = event.contentOffset.y;
    setOpacity(offsetY > 50 ? 0 : 1); // Set opacity based on scroll position
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        // follow theme background
      }}
    >
      {/* <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16} // Smoothens the scroll experience
        contentContainerStyle={{ paddingTop: 100 }} // Space for the header
      > */}
      {/* <VideoPublication /> */}
      {!!data?.length && (
        <FlashList
          data={data}
          renderItem={(item) => (
            <MainPublication
              key={item?.id}
              {...{ data: item?.item, test: item }}
            />
          )}
          estimatedItemSize={200}
        />
      )}
      {/* </Animated.ScrollView> */}
    </View>
  );
}

const tweetData = {
  buzzup_id: "TWITTER_1849574359784096234",
  author_id: "1816467634340364289",
  public_metrics: {
    retweet_count: 0,
    reply_count: 0,
    like_count: 1,
    quote_count: 0,
    bookmark_count: 0,
    impression_count: 0,
  },
  id: "1849574359784096234",
  text: "@ist_null お酒飲めないのもお辛い!",
  created_at: "2024-10-24T22:11:05.000Z",
  author: {
    verified: false,
    id: "1816467634340364289",
    username: "2fuwafuwas",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1816469504442114048/kzduKK5-_normal.jpg",
    name: "shiro",
  },
};

const mockTweet = {
  id: "tweet_123456",
  content: "Just attended a fantastic blockchain conference! 🚀 #crypto #web3",
  user: {
    id: "user_98765",
    name: "John Doe",
    username: "@johndoe",
    image: "https://randomuser.me/api/portraits/men/75.jpg", // Random placeholder image
  },
  createdAt: "2024-10-24T14:48:00.000Z",
  image: "https://via.placeholder.com/500", // Random placeholder image for tweet content
  numberOfComments: 12,
  numberOfRetweets: 34,
  numberOfLikes: 256,
  impressions: 1024,
};
