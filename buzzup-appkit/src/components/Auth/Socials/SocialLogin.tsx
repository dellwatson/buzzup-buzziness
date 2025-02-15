import { Separator, SizableText, YStack, isWeb } from "tamagui";

import { AppleSignIn } from "./AppleSignIn";
import { GoogleSignIn } from "./GoogleSignIn";

export function SocialLogin() {
  return (
    <YStack gap="$5">
      <OrSeparator />
      <YStack gap="$3">
        <AppleSignIn />
        <GoogleSignIn />
      </YStack>
    </YStack>
  );
}

function OrSeparator() {
  if (!isWeb) {
    return null;
  }
  return (
    <YStack>
      <YStack pos="absolute" fullscreen ai="center" jc="center">
        <Separator f={1} w="100%" />
      </YStack>
      <YStack ai="center" jc="center">
        <YStack bc="$color1" px="$3">
          <SizableText theme="light" size="$2" tt="uppercase" ta="center">
            Or
          </SizableText>
        </YStack>
      </YStack>
    </YStack>
  );
}
