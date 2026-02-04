import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    registerData:[],
    error: ''
};
// Define an async thunk for handling the signup API
export const registerUserData = createAsyncThunk(
    'user/signup', 
    async (userData, { rejectWithValue }) => {
      try {
        console.log("userData", userData)
        const response = await fetch('http://localhost:9001/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response && !response.ok) {
          const errorData = await response.json();
          throw new Error( errorData.message  || 'Failed to rigister user!!');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error.message === 'Network Error') {
          return rejectWithValue('Network error, please check your server connection.');
        }else if(error.message === 'Failed to fetch'){
          return rejectWithValue('Server error, please check your server connection.');
        }
        return rejectWithValue(error.message);
      }
    }
  );

const registrationSlice = createSlice({
  name: "Register-user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null; // Reset error state
    },
  },
    extraReducers: (builder) => {
      builder
      .addCase(registerUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUserData.fulfilled, (state, action) => {
        state.loading = false
        state.registerData = action.payload.result
        state.error = ''
      })
      .addCase(registerUserData.rejected, (state, action) => {
        state.loading = false
        state.registerData = initialState.registerData
        state.error = action.payload
      })
    },
});

export const { resetError } = registrationSlice.actions;
export default registrationSlice.reducer;
