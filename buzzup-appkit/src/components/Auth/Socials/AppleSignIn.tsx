import { Button } from "tamagui";
// import { useSupabase } from 'app/utils/supabase/useSupabase'
// import { useRouter } from 'solito/router'

// import { IconApple } from "./IconApple";
import { AntDesign } from "@expo/vector-icons";

export function AppleSignIn() {
  // const router = useRouter()
  // const supabase = useSupabase()
  const handleOAuthSignIn = async () => {
    // const { error } = await supabase.auth.signInWithOAuth({
    //   provider: 'apple',
    //   options: {
    //     // your options
    //   },
    // })
    // if (error) {
    //   // handle error
    //   return
    // }
    // router.replace('/')
  };

  return (
    <Button
      br="$10"
      onPress={() => handleOAuthSignIn()}
      icon={<AntDesign name="apple1" />}
    >
      Sign in with Apple
    </Button>
  );
}
