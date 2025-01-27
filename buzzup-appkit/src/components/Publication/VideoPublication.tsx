import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { PixelRatio, StyleSheet, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

const videoSource =
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  //   "https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/3c42abe3d80f4cec9093dc43cf1b93e3/?a=1988&bti=ODszNWYuMDE6&ch=0&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C&cv=1&br=4082&bt=2041&cs=0&ds=6&ft=-Csk_mc3PD12NSu-~E-UxBN2aY6e3wv25xcAp&mime_type=video_mp4&qs=0&rc=ZWRoaGY8OjRoM2YzZWllO0BpM2lyeTxndXE5NjMzNzczM0AuXy00Xl41XjMxNDJeYjIvYSMwMzFrNHMzXy1gLS1kMTZzcw%3D%3D&btag=e00088000&expire=1729821982&l=20241024200523839046986441332803FE&ply_type=2&policy=2&signature=e05c83d9a3e7659a6a812638ae134214&tk=tt_chain_token";
  //   "https://rr1---sn-4pgnuhxqp5-jb3e6.googlevideo.com/videoplayback?expire=1729821756&ei=3KcaZ4z4JsTd3LUPl8Kh0AI&ip=118.136.55.63&id=o-AGmcEe5cLX_s1yRf9SCSw2VIvxKfECy-UOzy9v7T7Pn-&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1729800156%2C&mh=uL&mm=31%2C26&mn=sn-4pgnuhxqp5-jb3e6%2Csn-30a7yney&ms=au%2Conr&mv=m&mvi=1&pcm2cms=yes&pl=19&rms=au%2Cau&initcwndbps=943750&siu=1&spc=54MbxcdpuuBNIfOAt7kQ301TirelF73IlDikqOmXmBA_URAMpzTefGB7z5NeMpjkYWsSea3vfQ&svpuc=1&ns=A8abTUt72VG7rDWB0EsJyhAQ&sabr=1&rqh=1&mt=1729799600&fvip=5&keepalive=yes&fexp=51307727%2C51312688%2C51326931&c=WEB&n=LKjG_Emb9Q5-LA&sparams=expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cspc%2Csvpuc%2Cns%2Csabr%2Crqh&sig=AJfQdSswRQIgBjg2_JQ8E9ObXqJu997yp0DctCvbzcOFQqMmad-ZYyoCIQC357wVfWS1AVmroPJLZ3Oio6HZ4fvyKDUkIiTERPn2Lw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Crms%2Cinitcwndbps&lsig=ACJ0pHgwRAIgN2YT5vJAHe3hpOWSSd2nAEV0UF3t_vwQ__2J7nOW6VMCIDQZUEabmXgn9s_ELyqkmWSpybnplKYo40uCkEtHdiuO&cpn=JRb5-gk4NtLFzRzN&cver=2.20241024.01.00&rn=2";
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  "https://www.youtube.com/watch?v=8ZgSt3VJ5Mc";
//   "https://buzzup.social";

function VideoWebView() {
  return (
    <WebView
      style={{
        width: 350,
        height: 500,
      }}
      source={{ uri: videoSource }}
    />
  );
}

//   check youtube / link  / tiktok
export default function VideoPublication() {
  const ref = useRef(null);
  //   const [isPlaying, setIsPlaying] = useState(true);
  //   const player = useVideoPlayer(videoSource, (player) => {
  //     player.loop = true;
  //     player.play();
  //   });

  //   useEffect(() => {
  //     const subscription = player.addListener("playingChange", (isPlaying) => {
  //       setIsPlaying(isPlaying);
  //     });

  //     return () => {
  //       subscription.remove();
  //     };
  //   }, [player]);

  return (
    <View style={styles.contentContainer}>
      {/* expo video */}
      {/* <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      /> */}
      {/* need to reconstruct the video reidrect control */}
      {/* webview */}
      <VideoWebView />

      {/* iframe */}
      {/* <YoutubePlayer
        initialPlayerParams={{
          preventFullScreen: true,
        }}
        height={300}
        width={300}
        videoId={"8ZgSt3VJ5Mc"}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "red",
  },
  video: {
    width: 350,
    height: 275,
    // borderWidth: 1,
  },
  controlsContainer: {
    padding: 10,
  },
  container: {
    width: 350,
    height: 500,
    borderWidth: 1,
    flex: 1,

    // width: 350,
    // height: 275,
    // marginTop: Constants.statusBarHeight,
  },
});
