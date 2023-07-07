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

          <Text style={styles.heading}>Our Story</Text>
          {show1pressed ?
            <Text style={styles.description}>Born 2 Dance was founded in 2007 by Azin Mahoozi Shalan, a dance artist specializing in Middle Eastern Dance, with a passion for an endless variety of dance genres from around the world. Later that year, her then-boyfriend (now husband), Rami Shalan, joined her and the two embarked on a journey to bring their local communities an eclectic mix of dance styles all offered under one roof.

              In the decade and a half that followed, the studio has grown to become one of the largest providers of adult and youth dance programs in the DMV, with a main studio located in Vienna, along with a satellite location in Arlington.

              Since 2007, more than 25,000 dance enthusiasts have graced our classrooms, and stage, with their presence. Our reach may have grown over the years, but our mission remains the same as it was on day one: Make a difference in all the lives we touch! <Text onPress={() => setshow1pressed(!show1pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show Less</Text></Text>
            :
            <Text style={styles.description}>Born 2 Dance was founded in 2007 by Azin Mahoozi Shalan, a dance artist specializing in Middle Eastern Dance, with a passion for an endless variety of dance genres from around the world. Later that year, her then-boyfriend (now husband), Rami Shalan, joined her and the two embarked ... <Text onPress={() => setshow1pressed(!show1pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show More</Text></Text>

          }
          <Text style={styles.heading}>Our Studio</Text>


          {show2pressed ?
            <Text style={styles.description}>We provide group classes, workshops, private lessons, and summer camps in over a dozen dance styles. We also produce concept videos, semi-annual recitals, and specialty dance community events, such as the monthly Latin Dance social: Noche De Baile, the monthly DMV Shuffle Meetup, the quarterly Belly Dance Hafla, and a host of other events.

              The high caliber of our dance faculty is our strongest asset, and we’re proud to be home to more than 60 talented dance instructors with extensive dance experience. This superb quality of instruction is integral to our goal of providing the best dance education for both recreational and aspiring professional dancers of all ages.

              B2D is often referred to as a “comprehensive” dance studio, owing to the wide diversity of dance genres we offer, ranging from Ballet, Bachata and Barre to Belly Dance, Hip Hop and Salsa. Many disparate dance styles with different origin stories, but each of them is part of the same magical world of dance! <Text onPress={() => setshow2pressed(!show2pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show Less</Text></Text>
            :
            <Text style={styles.description}>We provide group classes, workshops, private lessons, and summer camps in over a dozen dance styles. We also produce concept videos, semi-annual recitals, and specialty dance community events, such as the monthly Latin Dance social: Noche De Baile, the monthly DMV Shuffle Meetup, the quarterly Belly Dance Hafla, and a host of other events ... <Text onPress={() => setshow2pressed(!show2pressed)} style={{ fontWeight: "800", color: "#2885E5" }}>Show More</Text></Text>
          }


          <Text style={styles.heading}>Our Founding Team</Text>

          <Image style={styles.image} source={require("../../assets/images/founder.png")}></Image>
          <Text style={[styles.description, { marginTop: hp(0.5) }]}>B2D Founder, co-owner, and Director of B2D Events (WishCity): Azin Mahoozi Shalan</Text>
          <Image style={styles.image} source={require("../../assets/images/cofounder.jpeg")}></Image>
          <Text style={[styles.description, { marginTop: hp(0.5), marginBottom: hp(2.5) }]}>B2D co-owner & Director: Rami Shalan</Text>

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
    borderRadius: 300,
    marginVertical: hp(2)
  }
})