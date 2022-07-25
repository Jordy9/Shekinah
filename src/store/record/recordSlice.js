import { createSlice } from '@reduxjs/toolkit';

export const recordSlice = createSlice({
   name: 'record',
   initialState: {
      record: []
   },
   reducers: {
      getRecord: (state, action ) => {
         state.record = action.payload;
      },

      createRecord: (state, action ) => {
         state.record.push(action.payload);
      },

      updateRecord: (state, action ) => {
         state.record = state.record.map(
            e => (e._id === action.payload._id) ? action.payload : e
         )
      },

      deleteRecord: (state, action ) => {
         state.record = state.record.filter(
            e => (e._id !== action.payload)
         )
      },
   }
});


// Action creators are generated for each case reducer function
export const { getRecord, createRecord, updateRecord, deleteRecord } = recordSlice.actions;