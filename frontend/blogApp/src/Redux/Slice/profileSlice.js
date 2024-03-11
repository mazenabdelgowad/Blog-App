import { createSlice } from "@reduxjs/toolkit";

const prfoileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

const profileReducer = prfoileSlice.reducer;
const profileActions = prfoileSlice.actions;
export { profileReducer, profileActions };
