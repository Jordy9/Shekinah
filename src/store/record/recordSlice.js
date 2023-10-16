import { createSlice } from '@reduxjs/toolkit';

export const recordSlice = createSlice({
   name: 'record',
   initialState: {
      record: null
   },
   reducers: {
      getRecord: (state, action ) => {
         state.record = action.payload;
      },

      deleteRecord: (state ) => {
         state.record = null
      },
   }
});


// Action creators are generated for each case reducer function
export const { getRecord, deleteRecord } = recordSlice.actions;