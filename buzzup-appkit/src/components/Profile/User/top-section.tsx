import React from "react";
import { YStack, XStack, Avatar, Text, Spacer, Button } from "tamagui";

const TopSection = () => {
  return (
    <>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        padding="$4"
        // backgroundColor="$background"
        borderRadius="$4"
        shadowColor="$shadowColor"
        shadowOffset={{ height: 2, width: 0 }}
        shadowOpacity={0.1}
        shadowRadius={4}
      >
        {/* Avatar Section */}
        <Avatar circular size="$6">
          <Avatar.Image
            src="https://via.placeholder.com/150" // Replace with user's avatar URL
            alt="User Avatar"
          />
          <Avatar.Fallback backgroundColor="$gray" />
        </Avatar>

        <Spacer />

        {/* Followers/Following Section */}
        <YStack flex={1}>
          {/* <XStack alignItems="center" justifyContent="space-between">
            <YStack space="$2" flex={1} alignItems="center">
              <Text fontSize="$4" fontWeight="bold" color="$color">
                Great
              </Text>
              <Text fontSize="$3" color="$gray">
                Grade
              </Text>
            </YStack>

            <Spacer />

            <YStack space="$2" flex={1} alignItems="center">
              <Text fontSize="$4" fontWeight="bold" color="$color">
                2%
              </Text>
              <Text fontSize="$3" color="$gray">
                Top rank
              </Text>
            </YStack>
          </XStack>
          <Spacer /> */}

          <XStack>
            <YStack space="$2" flex={1} alignItems="center">
              <Text fontSize="$4" fontWeight="bold" color="$color">
                120
              </Text>
              <Text fontSize="$3" color="$gray">
                Followers
              </Text>
            </YStack>

            <Spacer />

            <YStack space="$2" flex={1} alignItems="center">
              <Text fontSize="$4" fontWeight="bold" color="$color">
                200
              </Text>
              <Text fontSize="$3" color="$gray">
                Following
              </Text>
            </YStack>
          </XStack>
        </YStack>

        {/* Optional: Add a Follow/Message Button */}
        {/* <Button size="$3" backgroundColor="$primary" color="$colorInverted">
        Follow
      </Button> */}
      </XStack>
    </>
  );
};

export default TopSection;
