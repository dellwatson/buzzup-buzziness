import React from "react";
import { Stack, Text, Image, Button, View } from "tamagui";

const TwitterCard = ({ tweet }) => {
  const { author, text, public_metrics, created_at } = tweet;

  return (
    <View
      borderWidth={1}
      borderColor="#E1E8ED"
      borderRadius="$4"
      padding="$4"
      space="$3"
      backgroundColor="white"
      width="100%"
      maxWidth={500}
    >
      {/* Header - Avatar and Username */}
      <Stack direction="row" space="$3" alignItems="center">
        <Image
          source={{ uri: author.profile_image_url }}
          width={50}
          height={50}
          borderRadius={25}
        />
        <Stack>
          <Text fontWeight="600" fontSize="$6">
            {author.name}
          </Text>
          <Text fontSize="$3" color="$gray10">
            @{author.username}
          </Text>
        </Stack>
      </Stack>

      {/* Tweet Content */}
      <Text fontSize="$4" lineHeight="$5" color="$black">
        {text}
      </Text>

      {/* Tweet Info - Like, Retweets, Date */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text fontSize="$3" color="$gray10">
          {new Date(created_at).toLocaleString()}
        </Text>

        <Stack direction="row" space="$2">
          <Button size="$2" variant="outline">
            <Text>❤️ {public_metrics.like_count} Likes</Text>
          </Button>
          <Button size="$2" variant="outline">
            <Text>🔁 {public_metrics.retweet_count} Retweets</Text>
          </Button>
        </Stack>
      </Stack>
    </View>
  );
};

export default TwitterCard;
