import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
// import { Link } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";

export type User = {
  id: string;
  name: string;
  username: string;
  image?: string;
};

export type TweetType = {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  image?: string;
  numberOfComments?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
  impressions?: number;
};

type IconButtonProps = {
  icon: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

const IconButton = ({ icon, text }: IconButtonProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <EvilIcons name={icon} size={22} color="gray" />
      <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
    </View>
  );
};

type TweetProps = {
  tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <View href={`/feed/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image src={tweet.user.image} style={styles.userImage} />

        <View style={styles.mainContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>{tweet.user.username} · 2h</Text>
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="gray"
              style={{ marginLeft: "auto" }}
            />
          </View>

          <Text style={styles.content}>{tweet.content}</Text>

          {tweet.image && <Image src={tweet.image} style={styles.image} />}

          <View style={styles.footer}>
            <IconButton icon="comment" text={tweet.numberOfComments} />
            <IconButton icon="retweet" text={tweet.numberOfRetweets} />
            <IconButton icon="heart" text={tweet.numberOfLikes} />
            <IconButton icon="chart" text={tweet.impressions || 0} />
            <IconButton icon="share-apple" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "600",
  },
  username: {
    color: "gray",
    marginLeft: 5,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },

  // footer
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});

export default Tweet;
