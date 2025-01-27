import { Button } from "tamagui";
// import { useSupabase } from 'app/utils/supabase/useSupabase'
// import { useRouter } from 'solito/router'

// import { IconGoogle } from "./IconGoogle";
import { AntDesign } from "@expo/vector-icons";

export function GoogleSignIn() {
  // const router = useRouter()
  // const supabase = useSupabase()
  // const handleOAuthSignIn = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       // your options
  //       redirectTo: process.env.NEXT_PUBLIC_URL,
  //     },
  //   })
  //   if (error) {
  //     // handle error
  //   }
  //   router.replace('/')
  // }

  return (
    <Button
      br="$10"
      // shad
      onPress={() => {}}
      icon={
        <AntDesign
          name={"google"}
          // size={size}
          // color={color}
        />
      }
    >
      Sign in with Google
    </Button>
  );
}
