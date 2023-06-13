import React from 'react'
import { Image, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { moderateVerticalScale, scale } from 'react-native-size-matters'
import crossIcon from '../../assets/images/crossBtn.png'
import feedback from '../../assets/images/feedback.png'

export function Thankyou({ navigation }) {

  return (
    <View style={{ flex: 1, backgroundColor:'#0F172B' }}>
        {/* <View style={{ padding:20, display:'flex', justifyContent:'space-between', flexDirection: 'row', backgroundColor:'#1D283A' }}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image source={crossIcon} style={{ width: scale(15), height: scale(15), marginTop:moderateVerticalScale(6) }} />
            </TouchableOpacity>
        </View> */}

        <View style={style.profileStyle}></View>
        <View style={style.profileList}>
            <View style={{ display:'flex', width:'100%',marginTop:moderateVerticalScale(100), padding:moderateVerticalScale(11) }}>
                <Image source={feedback} style={{ width: scale(100), height: scale(100), marginTop:moderateVerticalScale(6), alignSelf:'center' }} />
                <Text style={{color:'#FFFF', textAlign:'center', width:'100%', fontWeight:'600', fontSize:20, marginTop:moderateVerticalScale(15)}}>Payment success</Text>
                <Text style={{color:'#FFFF', textAlign:'center', width:'100%', fontWeight:'400', fontSize:13, paddingTop:moderateVerticalScale(15), marginLeft:moderateVerticalScale(10)}}>Thankyou for payment successfully</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{marginTop:moderateVerticalScale(15)}}>
            <LinearGradient
                colors={['#2885E5', '#9968EE']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{borderWidth: 1, borderStyle: 'solid', borderRadius: 5}}>
                <Text style={{ padding: '2%', alignSelf: 'center', fontStyle: 'normal', fontWeight: '500',fontSize: 16, lineHeight: 24, color: '#FFFFFF'}}>
                Back to Home
                </Text>
            </LinearGradient>
          </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const style = {
    TextButton: {
        fontSize: scale(15), 
        fontWeight: 'Inter', 
        color: '#000000', 
        backgroundColor: '#FFFFFF',
        width: '35%',
        padding: '1.5%',
        borderRadius: scale(5),
        textAlign: 'center',
    },
    profileStyle: {
        flex: 1, 
        backgroundColor:'#0F172B'
    },
    profileImage: {
        width: scale(90), 
        height: scale(90), 
        marginTop:moderateVerticalScale(6)
    },
    profileList: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        // marginTop:moderateVerticalScale(6), 
        backgroundColor:'#1E293B', 
        width:'100%', 
        height:'87%',
        borderTopLeftRadius:scale(30),
        borderTopRightRadius:scale(30),
        paddingTop:moderateVerticalScale(10),
        
    }
}
