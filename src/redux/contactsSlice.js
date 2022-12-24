import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    contacts: [],
    filter: '',
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
    addContact(state, action) {
        state.contacts = [action.payload, ...state.contacts];
    },
    removeContact(state, action) {
        state.contacts = [...action.payload];
    },
    changeFilter(state, action) {
        state.filter = action.payload;
    }
    }
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts']
}

export const { addContact, removeContact, changeFilter } = contactsSlice.actions;
export const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);