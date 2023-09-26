import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Video, { Container } from 'clwy-react-native-video-player'
import { API_URL_IMAGE } from '../../services/api_url'
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from "react-native-videocustomplayer";
import MoVideoPlayer from 'react-native-mo-video-player';
import { wp } from '../../Constants';



const B2dmusicvideo = (props) => {
    const navigation = useNavigation()
    const isIos = ()=>Platform.OS == "ios"
    const [videolink,setVideolink]=useState("")
    const [videotitle, setVideotitle]=useState("")

    useEffect(()=>{
        setVideolink(props?.videolink)
        setVideotitle(props?.videotitle)
    },[props?.videolink,props?.videotitle])
    return (
        <View style={{ width: wp(95), height: 220, borderRadius: 10, overflow: "hidden",alignItems:"center",alignSelf:"center" }}>
            {/* <Container style={{ marginHorizontal: 10, borderRadius: 10, overflow: "hidden", marginBottom: 20}}>
                <Video
                    url={API_URL_IMAGE+"/"+"uploads/1686661557612_pexels-cottonbro-studio-6770042-3840x2160-25fps.mp4"}
                    placeholder={require("../../assets/images/logo.png")}
                    hideFullScreenControl
                    //onFullScreen={status => onFullScreen(status)}
                    resizeMode="cover"
                    logo={require("../../assets/images/logo.png")}
                    onMorePress={() => {
                        Alert.alert("Alert", "This Video belongs to B2D", [
                            {
                                text: 'Visit B2D',
                                onPress: () => Linking.openURL("https://born2dance.in/"),
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ])
                    }}
                />
            </Container> */}
            <MoVideoPlayer
            showFullScreenButton={false}
            style={{height:220,width:wp(95),alignSelf:"center"}}
                source={{
                    uri: isIos()?
                        `${API_URL_IMAGE}/${videolink}`.replace(/ /g, "%20")
                        :
                        `${API_URL_IMAGE}/${videolink}`

                    ,
                }}
                autoPlay={false}
                title={videotitle}
                showHeader={true}
                showCoverButton={false}

            />
        </View>
    )
}

export default B2dmusicvideo

const styles = StyleSheet.create({})