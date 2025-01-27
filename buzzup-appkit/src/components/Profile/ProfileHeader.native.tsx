import React from "react";
import { YStack, XStack, Avatar, Text, Spacer, Button } from "tamagui";

// native follow status
function FollowStatus() {
  // clickable to open a dialog follow
  return (
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
  );
}

function XStackWrapper({ children }) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      padding="$4"
      borderRadius="$4"
      shadowColor="$shadowColor"
      shadowOffset={{ height: 2, width: 0 }}
      shadowOpacity={0.1}
      shadowRadius={4}
    >
      {children}
    </XStack>
  );
}

export default function ProfileHeader({ user, isSelf }) {
  return (
    <>
      <XStackWrapper>
        {/* switch accounts */}
        <Avatar circular size="$6">
          <Avatar.Image
            src="https://via.placeholder.com/150" // Replace with user's avatar URL
            alt="User Avatar"
          />
          <Avatar.Fallback backgroundColor="$gray" />
        </Avatar>

        <YStack flex={1}>
          {!isSelf ? (
            <XStack alignItems="center" justifyContent="space-between">
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
          ) : (
            <FollowStatus />
          )}
        </YStack>
      </XStackWrapper>
      <XStackWrapper>
        <YStack space="$2">
          <Text fontSize="$5" fontWeight="bold" color="$color">
            {user?.name || "John Doe"}
          </Text>
          <Text fontSize="$3" color="$gray">
            @{user?.handler || "johndoe"}
          </Text>
          <Text fontSize="$4" color="$gray" numberOfLines={2}>
            {user?.bio ||
              "Frontend engineer passionate about design systems and UI/UX."}
          </Text>
          <Text fontSize="$3" color="$gray">
            {user?.joinedDate || "Joined January 2022"}
          </Text>
        </YStack>
        {/* Name -- switch */}
        {/* handler -- switch (accounts) */}
        {/* bio here -- switch (accounts) */}
        {/* joined time */}
      </XStackWrapper>
      {/* info: bio, name, handlers */}
      {/* link system? */}
      {/* reward system */}
    </>
  );
}

// todo: we need wrapper for each block
// block wrapper

// -- tabs for contents
