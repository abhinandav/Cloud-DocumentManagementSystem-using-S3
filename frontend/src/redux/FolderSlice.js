import { createSlice } from '@reduxjs/toolkit';

export const folderSlice = createSlice({
    name: 'folder_details',
    initialState: {
        folderid: null,
        name: '',
        path: '',
    },
    reducers: {
        set_folder: (state, action) => {
            state.name = action.payload.name;
            state.folderid = action.payload.folderid;
            state.path = action.payload.path;
        },
    },
});

export const { set_folder } = folderSlice.actions;

export default folderSlice.reducer;
