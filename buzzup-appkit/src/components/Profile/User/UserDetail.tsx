import { ScrollView, XStack, YStack } from "tamagui";
import ScrollToTopTabBarContainer from "@/utils/NativeScreenContainer";
import { OverviewSection } from "./overview-section";
import TopSection from "./top-section";
//   import useEventsQuery from 'app/utils/react-query/useEventQuery'
//   import { AchievementsSection } from './components/achievements-section'
//   import { Greetings } from './components/greetings'
//   import { OverviewSection } from './components/overview-section'
//   import { PostsSection } from './components/posts-section'

export function UserDetail() {
  return (
    <XStack
      //   backgroundColor="$background"
      maw={1480}
      als="center"
      f={1}
    >
      <ScrollView f={4} fb={0}>
        <ScrollToTopTabBarContainer>
          <TopSection />
          <YStack gap="$2" pb="$10">
            <OverviewSection />
          </YStack>
        </ScrollToTopTabBarContainer>
      </ScrollView>
    </XStack>
  );
}

const eventDummyData = [
  {
    id: 1,
    name: "Event 1",
    description: "Lorem ipsum dolor sit, amet.",
    start_time: new Date("2023-05-01T00:00:00.000Z"),
    end_time: new Date("2023-05-01T00:00:00.000Z"),
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Event 2",
    description: "Lorem ipsum dolor sit, amet.",
    start_time: new Date("2023-05-01T00:00:00.000Z"),
    end_time: new Date("2023-05-01T00:00:00.000Z"),
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Event 3",
    description: "Lorem ipsum dolor sit, amet.",
    start_time: new Date("2023-05-01T00:00:00.000Z"),
    end_time: new Date("2023-05-01T00:00:00.000Z"),
    status: "Upcoming",
  },
];
