import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerMuted: true,
  usersSignUp: null,
  usersSignIn: null,
  token: null,
  loader: false,
  danceCategory: null,
  cityList: null,
  bannerList: null,
  classesList: null,
  unlimitedList: null,
  hireusList: null,
  pricesList: null,
  paymentSuccessStatus: null,
};

export const appData = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    usersSignUpAdd: (state, action) => {
      state.usersSignUp = action.payload;
    },
    usersSignInAdd: (state, action) => {
      state.usersSignIn = action.payload;
    },
    danceCategoryAdd: (state, action) => {
      state.danceCategory = action.payload;
    },
    cityListAdd: (state, action) => {
      state.cityList = action.payload;
    },
    bannerListAdd: (state, action) => {
      state.bannerList = action.payload;
    },
    loaderAdd: (state, action) => {
      state.loader = action.payload;
    },
    tokenAdd: (state, action) => {
      state.token = action.payload;
    },
    classesAdd: (state, action) => {
      state.classesList = action.payload;
    },
    unlimitedAdd: (state, action) => {
      state.unlimitedList = action.payload;
    },
    hireusAdd: (state, action) => {
      state.hireusList = action.payload;
    },
    pricesAdd: (state, action) => {
      state.pricesList = action.payload;
    },
    paymentSuccessStatusAdd: (state, action) => {
      state.paymentSuccessStatus = action.payload;
    },
    setBannerMuted: (state, action) => {
      state.bannerMuted = action.payload
    }
  },
});

export const {
  tokenAdd,
  usersSignUpAdd,
  usersSignInAdd,
  danceCategoryAdd,
  cityListAdd,
  bannerListAdd,
  loaderAdd,
  classesAdd,
  unlimitedAdd,
  hireusAdd,
  pricesAdd,
  paymentSuccessStatusAdd,
  setBannerMuted
} = appData.actions;

export default appData.reducer;
