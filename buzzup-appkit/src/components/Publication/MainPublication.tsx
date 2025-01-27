import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import TweetPublication from "./TweetPublication";
import YoutubePublication from "./YoutubePublication";

//

export default function MainPublication({ data = {}, test = {} }) {
  const { item, ...rest } = test;
  console.log(rest, "test");
  if (!data?.buzzup_id) return null; // Return null if there's no buzzup_id

  const buzzupId = data.buzzup_id;

  switch (true) {
    case buzzupId.startsWith("TWITTER_"):
    case buzzupId.startsWith("TWEET_"):
      return <TweetPublication buzzupId={buzzupId} data={data} />;

    case buzzupId.startsWith("YOUTUBE_"):
      return <YoutubePublication buzzupId={buzzupId} data={data} />;

    case buzzupId.startsWith("TIKTOK_"):
      return <View buzzupId={buzzupId} />;

    default:
      return <View buzzupId={buzzupId} />;
  }
}
