import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import Video, { Container } from 'clwy-react-native-video-player'
import { API_URL_IMAGE } from '../../services/api_url'
import { wp } from '../../Constants'
import FastImage from 'react-native-fast-image'

const AllVideoSongs = ({ navigation, route }) => {
    const musicVideoDetails = route.params.musicVideoDetails
    const [isFullScreenSet, setIsFullScreenSet] = useState(false)
    const [activeVideoDetails, setActiveVideoDetails] = useState(musicVideoDetails[0])
    const [showCredits, setShowCredits] = useState(false)

    useState(() => {
        setActiveVideoDetails(musicVideoDetails[0])
    }, [musicVideoDetails])

    const renderDesignations = ({ item }) => {

        return (
            <View>
                <View style={styles.designationItem}>
                    <FastImage
                        source={{ uri: `${API_URL_IMAGE}/${item?.image}` }}
                        style={styles.designationImage}
                    />
                    <View style={styles.designationDetailsContainer}>
                        <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>{item.name}</Text>
                        <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500", marginTop: 2.5 }}>{item?.designation}</Text>
                    </View>
                </View>
            </View>
        )

    }

    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setActiveVideoDetails(item)
                setShowCredits(false)
                }}>
                <ImageBackground source={{ uri: `${API_URL_IMAGE}/${item.image}` }} imageStyle={{ borderRadius: 10 }} style={{ marginHorizontal: 12, marginVertical: 12, height: 200, justifyContent: "flex-end" }}>
                    <Text style={{alignSelf:"center",marginBottom:40,color:"#80808070",fontSize:45}}>▶</Text>
                    <View style={{ backgroundColor: "#00000035", padding: 12, height: 40, width: "100%", flexDirection: "row" }}>
                        <Text style={{ color: "#fff", fontWeight: "500", fontSize: 15, width: "80%" }}>{item.songName}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainView}>
            {activeVideoDetails &&
                <Container>
                    <Video
                        url={Platform.OS == "ios" ? `${API_URL_IMAGE}/${activeVideoDetails?.videolink}`.replace(/ /g, "%20") : `${API_URL_IMAGE}/${activeVideoDetails?.videolink}`}
                        autoPlay
                        //placeholder={require("../../assets/images/logo.png")}
                        hideFullScreenControl={false}
                        //onFullScreen={status => onFullScreen(status)}
                        rotateToFullScreen
                        resizeMode="cover"
                        onFullScreen={(value) => {
                            if (value) {
                                navigation.setOptions({ headerShown: false });
                                setIsFullScreenSet(true)
                            }
                            else {
                                navigation.setOptions({ headerShown: true });
                                setIsFullScreenSet(false)
                            }
                        }}
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
                </Container>
            }
            <View style={{ backgroundColor: "#ffffff20", padding: 12, flexDirection: "row", borderBottomLeftRadius: showCredits ? 0 : 8, borderBottomRightRadius: showCredits ? 0 : 8 }}>
                <Text style={{ color: "white", fontSize: 15, fontWeight: '500', width: "74%" }}>{activeVideoDetails?.songName}</Text>
                <TouchableOpacity onPress={() => {
                    setShowCredits(!showCredits)
                }}>
                    <Text style={{ color: "#2885E5", fontSize: 15, fontWeight: '500' }}>{showCredits ? "Hide Credits" : "Show Credits"}</Text>
                </TouchableOpacity>
            </View>
            {showCredits ?
                <View>
                    <FlatList
                        data={activeVideoDetails?.designationDetails}
                        renderItem={renderDesignations}
                        style={styles.designationsContainer}
                    />
                </View>
                : null
            }
            {isFullScreenSet ?

                null
                :

                <FlatList
                    data={musicVideoDetails?.filter((item) => item != activeVideoDetails)}
                    renderItem={renderItems}
                />



            }
        </View>
    )
}

export default AllVideoSongs

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#0E172A",
        flex: 1,
        paddingBottom: 24
    },
    designationItem: {
        marginVertical: 10,
        flexDirection: "row",
    },
    designationsContainer: {
        paddingLeft: 10,
        backgroundColor: "#ffffff20",
        paddingBottom: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8

    },
    designationImage: {
        width: wp(12),
        height: wp(12),
        borderRadius: 7
    },
    designationDetailsContainer: {
        marginLeft: 15,
        marginTop: 5,
    }

})