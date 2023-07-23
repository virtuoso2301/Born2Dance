const googleLogin = async () => {
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      console.log("GOOOGGLEE USERR INFOO: ", userInfo);
      // Start User
      const user = {
        fullname: userInfo.user.name,
        email: userInfo.user.email,
        profileImage: userInfo.user.photo,
        loginType: "google",
        password: "NA",
        refercode: "",
        //phone: userInfo.phone,
      };


      console.log("USERRR MADE: ", user)
      //dispatch(usersSignInAdd(user));
      //dispatch(tokenAdd(userInfo.idToken));
      //await AsyncStorage.setItem('user', JSON.stringify(user));
      //await AsyncStorage.setItem('token', userInfo.idToken);

      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const responseJson = await response.json();

      if (responseJson.success === true) {


        // dispatch(usersSignInAdd(user));
        // await AsyncStorage.setItem('user', JSON.stringify(user));
        // dispatch(tokenAdd(userInfo.idToken));
        // await AsyncStorage.setItem('token', userInfo.idToken);

        const userValue = {
          email: user.email,
          password: user.password
        };
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userValue),
        });
        const responseJson = await response.json();
        console.log("Login GOOGLE DATA: ", responseJson)
        if (responseJson.success === true) {
          dispatch(usersSignInAdd(responseJson.user));
          dispatch(tokenAdd(responseJson.token));
          await AsyncStorage.setItem('token', responseJson.token);
          await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
          // navigation.navigate('home');
        } else if (responseJson.success === false) {
          //setError({ ...error, serverError: responseJson.message });
          console.log("ERROR L184: ", responseJson.message)
        }




      } else if (responseJson.success === false) {
        //setError({ ...error, serverError: responseJson.message });
        if (responseJson.message == "email already exists") {

          const userValue = {
            email: user.email,
            password: user.password,
          };
          const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userValue),
          });
          const responseJson = await response.json();
          // console.log(responseJson);
          if (responseJson.success === true) {
            dispatch(usersSignInAdd(responseJson.user));
            dispatch(tokenAdd(responseJson.token));
            await AsyncStorage.setItem('token', responseJson.token);
            await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
            // navigation.navigate('home');
          } else if (responseJson.success === false) {
            //setError({ ...error, serverError: responseJson.message });
            console.log("EMAIL EXIST ERROR: ", responseJson.message)
          }

        }
      }

      // navigation.navigate('home');
    }
    //   // End User
    //   const googleCredential = await auth.GoogleAuthProvider.credential(
    //     userInfo.idToken,
    //   );
    //   await auth().signInWithCredential(googleCredential);
    // 
  };