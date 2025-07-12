
import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice({
  // ISME DO CHEEZEN DENI HOTI H => NAME AND INITIAL STATE
  name:"auth",
  initialState:{
        loading:false,
        user:null
  },
  reducers:{
    // actions
    setLoading:(state,action) => {
        state.loading=action.payload;
    },
    setUser:(state,action) => {
      state.user=action.payload;
    }
  }
});
export const {setLoading,setUser}= authSlice.actions;
export default authSlice.reducer;
// ab is authslice ko store.js wale me daalenge