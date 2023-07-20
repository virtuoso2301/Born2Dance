import React from 'react';
import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../../Constants';
import FastImage from 'react-native-fast-image';

const MusicDetails = ({ navigation, route }) => {

    const musicItem = route.params.musicItem
    console.log(musicItem)

    return (
        <View style={style.view}>
            <FastImage
                resizeMode={'cover'}
                source={require("../../assets/images/music.jpeg")}
                style={style.mainImage}
            />
            <View style={style.player}>
                <FastImage
                    resizeMode={'contain'}
                    source={require("../../assets/images/introVideo.png")}
                    style={{ height: hp(5), aspectRatio: 1, marginHorizontal: 10 }}
                />
                <View style={style.track}></View>
            </View>
            <View style={style.description}>
                <Text style={style.desc1}>Song: {musicItem.name}</Text>
                <Text style={style.desc1}>Artist: {musicItem.artist}</Text>
                <Text style={style.desc2}>© All rights reserved by Born2Dance</Text>
            </View>
            <TouchableOpacity
                style={style.buttonTakeClasses}
                onPress={() => navigation.navigate("song-purchase-form",{musicItem:musicItem})}>
                <LinearGradient
                    style={style.takeClassesGradient}
                    colors={['#2885E5', '#844AE9']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    <Text style={{ alignSelf: 'center', color: "#ffffff", fontWeight: "500" }}>
                        Purchase this song
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default MusicDetails

const style = StyleSheet.create({
    view: {
        backgroundColor: '#0E172A',
        flex: 1,
        alignItems:"center"
    },
    takeClassesGradient: {
        borderRadius: 5,
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    },
    buttonTakeClasses: {
        textAlign: 'center',
        borderRadius: 5,
        height: hp(5),
        width: wp(92),
        justifyContent: "center",
        alignSelf:"center",
        marginVertical:5
    },
    mainImage: {
        alignSelf: 'center',
        width: wp(92),
        height: hp(25),
        borderRadius: 10,
        borderWidth: 1.5,
        marginVertical: 10
    },
    player: {
        flexDirection: "row",
        padding: 10,
        height: hp(8),
        width: wp(92),
        backgroundColor: "#1E293B",
        alignSelf: "center",
        borderRadius: 10,
        alignItems: "center",
        marginVertical:5
    },
    track: {
        height: hp(0.75),
        borderRadius: 5,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        width: "75%"
    },
    description: {
        padding: 10,
        height: hp(12),
        width: wp(92),
        backgroundColor: "#1E293B",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 15,
        justifyContent:"center",
        paddingBottom:15
    },
    desc1: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 5,
        marginLeft: 10
    },
    desc2: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
        marginTop: 10,
        marginLeft: 10
    }
});
