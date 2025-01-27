import { XStack, YStack, Text, useTheme } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function CustomHeader() {
  const navigation = useNavigation();
  const theme = useTheme();
  const color = theme.color;

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#121212" }}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4"
        paddingVertical="$3"
        // backgroundColor={"red"}
        backgroundColor={theme.background}
        borderBottomWidth={1}
        borderBottomColor={color.border}
      >
        {/* Left: Profile icon */}
        {/* <IconButton
        icon={<Icon name="user" />}
        onPress={() => navigation.navigate("ProfileStack")}
        color={color.text}
      /> */}
        <EvilIcons name="user" size={30} color={"white"} />

        {/* Center: Logo */}
        <YStack>
          <Text fontSize="$4" fontWeight="bold" color={color.text}>
            buzzup
          </Text>
        </YStack>

        {/* Right: Drawer icon */}
        <EvilIcons name="navicon" size={30} color={"white"} />

        {/* <IconButton
        icon={<Icon name="menu" />}
        onPress={() => navigation.toggleDrawer()}
        color={color.text}
      /> */}
      </XStack>
    </SafeAreaView>
  );
}

export default CustomHeader;
