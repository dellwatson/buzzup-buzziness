import React from "react";
import { Stack, Text, Image, YStack, XStack } from "tamagui";
import { EvilIcons } from "@expo/vector-icons"; // Assuming you're using expo, adjust if not
import { formatViewCount } from "../../utils/format";

type Author = {
  verified: boolean;
  protected: boolean;
  username: string;
  profile_image_url: string;
  name: string;
  id: string;
};

type Media = {
  media_key: string;
  type: string;
  url: string;
};

type TweetProps = {
  buzzup_id: string;
  text: string;
  author: Author;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    impression_count: number;
  };
  media?: Media[];
  referenced_tweets?: { type: string; id: string }[];
};

type IconButtonProps = {
  icon: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

const IconButton = ({ icon, text }: IconButtonProps) => (
  <XStack alignItems="center" space="$1">
    <EvilIcons name={icon} size={22} color="gray" />
    <Text size="$1" color="gray">
      {text}
    </Text>
  </XStack>
);

const TweetPublication = ({ data }: { data: TweetProps }) => {
  const {
    text,
    author,
    public_metrics: {
      retweet_count,
      reply_count,
      like_count,
      impression_count,
    },
    media,
    referenced_tweets,
  } = data;

  return (
    <Stack
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      // borderRadius="$4"
      backgroundColor="$background"
    >
      {/* Header with avatar, name, and username */}
      <XStack space="$3">
        <Image
          src={author.profile_image_url}
          width={50}
          height={50}
          borderRadius={50}
          alt={`${author.name}'s profile image`}
        />
        <YStack flex={1}>
          <XStack justifyContent="space-between">
            <Text fontWeight="bold">{author.name}</Text>
            <EvilIcons name="dots-three-horizontal" size={20} color="gray" />
          </XStack>
          <Text color="gray">@{author.username}</Text>
        </YStack>
      </XStack>

      {/* Tweet text */}
      <Text paddingTop="$3">{text}</Text>

      {/* Conditional for media */}
      {media && media.length > 0 && (
        <Image
          src={media[0].url}
          width="100%"
          height={200}
          borderRadius="$3"
          resizeMode="cover"
          marginTop="$4"
        />
      )}

      {/* Metrics footer */}
      <XStack justifyContent="space-between" marginTop="$4">
        <IconButton icon="comment" text={formatViewCount(reply_count)} />
        {/* <IconButton icon="retweet" text={retweet_count} /> */}
        <IconButton icon="heart" text={formatViewCount(like_count)} />
        <IconButton icon="chart" text={formatViewCount(impression_count)} />
        <IconButton icon="share-apple" />
      </XStack>

      {/* Conditional for referenced tweet (retweet or reply) */}
      {/* {referenced_tweets && referenced_tweets.length > 0 && (
        <Text paddingTop="$2" color="gray" size="$1">
          {`This tweet is a ${referenced_tweets[0].type} to tweet ID: ${referenced_tweets[0].id}`}
        </Text>
      )} */}
    </Stack>
  );
};

export default TweetPublication;
