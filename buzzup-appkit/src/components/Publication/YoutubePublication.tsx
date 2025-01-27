import React from "react";
import { Stack, Text, Image, YStack, XStack } from "tamagui";
import { EvilIcons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { formatViewCount } from "../../utils/format";

type YouTubeProps = {
  buzzup_id: string;
  kind: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { high: { url: string } };
    resourceId: { videoId: string };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  channelDetails: {
    snippet: {
      title: string;
      customUrl: string;
      thumbnails: { high: { url: string } };
    };
  };
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

const YouTubePublication = ({ data }: { data: YouTubeProps }) => {
  const {
    id,
    snippet: { title, channelTitle, thumbnails, resourceId },
    statistics: { viewCount, likeCount, commentCount },
    channelDetails: {
      snippet: { title: channelName, customUrl, thumbnails: channelThumb },
    },
  } = data;

  return (
    <Stack
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      //   borderRadius="$4"
      backgroundColor="$background"
    >
      {/* Header with avatar, name, and username */}
      <XStack space="$3">
        <Image
          src={channelThumb.high.url}
          width={50}
          height={50}
          borderRadius={50}
          alt={`${channelName}'s profile image`}
        />
        <YStack flex={1}>
          <XStack justifyContent="space-between">
            <Text fontWeight="bold">{channelName}</Text>
            <EvilIcons name="dots-three-horizontal" size={20} color="gray" />
          </XStack>
          <Text color="gray">@{customUrl}</Text>
        </YStack>
      </XStack>

      {/* Video title */}
      <Text paddingTop="$3" fontWeight="bold">
        {title}
      </Text>

      {/* YouTube Video Player */}
      <YoutubePlayer
        height={200}
        play={false}
        videoId={id}
        webViewStyle={{ borderRadius: 8, marginTop: 10 }}
      />

      {/* Metrics footer */}
      <XStack justifyContent="space-between" marginTop="$4">
        <IconButton icon="comment" text={formatViewCount(commentCount)} />
        <IconButton icon="heart" text={formatViewCount(likeCount)} />
        <IconButton icon="chart" text={formatViewCount(viewCount)} />
        <IconButton icon="share-apple" />
      </XStack>
    </Stack>
  );
};

export default YouTubePublication;
