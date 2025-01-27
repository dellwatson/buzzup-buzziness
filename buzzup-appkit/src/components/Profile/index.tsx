import { ScrollView, XStack, YStack } from "tamagui";
import ScrollToTopTabBarContainer from "@/utils/NativeScreenContainer";
import ProfileHeader from "./ProfileHeader.native";
import { OverviewSection } from "./User/overview-section";
import ProfileContent from "./ProfileContent";
import TabViewExample from "./TabViewExample";
// import TopSection from "./top-section";

// todo: change screen with banner scroll (after we configure the scroll playout)
export function ProfileNative() {
  return (
    <XStack
      //   backgroundColor="$background"
      maw={1480}
      als="center"
      f={1}
    >
      <ScrollView f={4} fb={0}>
        <ScrollToTopTabBarContainer>
          {/* BANNER */}
          {/* profile header */}
          {/* <TopSection /> */}

          <ProfileHeader />
          <OverviewSection />
          <ProfileContent />
          {/* <TabViewExample />. */}
          {/* profile contents */}
        </ScrollToTopTabBarContainer>
      </ScrollView>
    </XStack>
  );
}
