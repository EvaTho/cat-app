import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'
import { Cat } from '@/types/Cat'

// Type for our state
export interface CatState {
    catsList: Array<Cat>
}

// Initial state
const initialState: CatState = {
    catsList: [],
}

// Actual Slice
export const catSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        addToCatsList(state, action) {
            state.catsList.push(action.payload)
        },
        removeFromCatsList(state, action) {
            // find cat by ID, remove from list
        },
        updateCatInList(state, action) {
            // find cat in state, update with payload
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.cats,
            }
        },
    },
})

export const { addToCatsList, removeFromCatsList, updateCatInList } =
    catSlice.actions

export const selectCatsList = (state: AppState) => state.cats.catsList

export default catSlice.reducer
