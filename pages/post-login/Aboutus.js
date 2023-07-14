import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { height, hp, wp } from '../../Constants'
import { useState } from 'react'

const Aboutus = () => {

  const [show1pressed, setshow1pressed] = useState(false)
  const [show2pressed, setshow2pressed] = useState(false)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2885E5" }}>
      <View style={{ backgroundColor: '#1D283A', height: "90%", width: "90%", borderRadius: 15 }}>
        <ScrollView style={{ paddingHorizontal: wp(4) }} contentContainerStyle={{ alignItems: "center" }}>


          <Text style={styles.heading}>Our Founder</Text>

          <Image style={styles.image} source={require("../../assets/images/b2d-owner.jpg")}></Image>
          <Text style={{ marginBottom: hp(0.5),fontWeight:"800",fontSize:14,color:"#fff" }}>Babloo Pardeshi</Text>
          <Text style={{fontWeight: "600",
    color: "#fff",
    fontSize: 12.2,
    textAlign: "center",marginBottom:hp(3)}}>B2D Founder & Owner</Text>

<Text style={styles.heading}>Our Story</Text>
          {show1pressed ?
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam. Sit amet commodo nulla facilisi nullam. Consequat nisl vel pretium lectus quam id leo. Quisque egestas diam in arcu cursus euismod. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Volutpat odio facilisis mauris sit amet massa vitae tortor. Massa eget egestas purus viverra accumsan in nisl nisi. <Text onPress={() => setshow1pressed(!show1pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show Less</Text></Text>
            :
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Consequat id porta nibh venenatis cras sed felis eget velit. Nulla facilisi cras fermentum odio eu feugiat pretium Nulla facilisi cras fermentum odio eu feugiat pretium ... <Text onPress={() => setshow1pressed(!show1pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show More</Text></Text>

          }
          <Text style={styles.heading}>Our Studio</Text>


          {show2pressed ?
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius quam quisque id diam. Sit amet commodo nulla facilisi nullam. Consequat nisl vel pretium lectus quam id leo. Quisque egestas diam in arcu cursus euismod. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Volutpat odio facilisis mauris sit amet massa vitae tortor. Massa eget egestas purus viverra accumsan in nisl nisi. <Text onPress={() => setshow2pressed(!show2pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show Less</Text></Text>
            :
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Consequat id porta nibh venenatis cras sed felis eget velit. Nulla facilisi cras fermentum odio eu feugiat pretium Nulla facilisi cras fermentum odio eu feugiat pretium ... <Text onPress={() => setshow2pressed(!show2pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show More</Text></Text>
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default Aboutus

const styles = StyleSheet.create({
  heading: {
    fontWeight: "600",
    color: "#fff",
    marginVertical: hp(2),
    fontSize: 18
  },
  description: {
    fontWeight: "600",
    color: "#fff",
    marginVertical: hp(2),
    fontSize: 12.2,
    textAlign: "center"
  },
  image: {
    borderRadius: hp(23)/2,
    marginVertical: hp(2),
    height:hp(23),
    aspectRatio:1,

  }
})