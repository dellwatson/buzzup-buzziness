import { Button, H4, Theme, XStack, YStack } from "tamagui";
// import { OverviewCard } from "@/ui";
import { ArrowRight } from "@tamagui/lucide-icons";

import { ScrollAdapt } from "./scroll-adapt";
import { OverviewCard } from "@/ui/components";

// claim -> open modal
export const OverviewSection = () => {
  return (
    <YStack>
      {/* <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 theme="light" fow="400">
          Overview
        </H4>
        <Theme name="light">
          <Button
            size="$2"
            chromeless
            // iconAfter={ArrowRight}
          >
            View All Stats
          </Button>
        </Theme>
      </XStack> */}

      <ScrollAdapt itemWidth={180} withSnap>
        <XStack
          fw="wrap"
          ai="flex-start"
          jc="flex-start"
          px="$4"
          gap="$8"
          mb="$4"
        >
          <OverviewCard
            title="$BUZZZ"
            value="$18,908"
            badgeText="+0.5%"
            badgeState="success"
          />

          <OverviewCard
            title="$UP"
            value="$204,010"
            badgeText="+40.5%"
            badgeState="success"
          />

          <OverviewCard
            title="Today's new users"
            value="4 Users"
            badgeText="+25%"
            badgeState="success"
          />

          <OverviewCard
            title="Weekly Post Views"
            value="30,104"
            badgeText="-2%"
            badgeState="failure"
          />
        </XStack>
      </ScrollAdapt>
    </YStack>
  );
};
