import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'
import { Cat } from '@/types/Cat'
import { AnyAction } from 'redux'

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
            return {
                catsList: state.catsList.filter(
                    (cat) => cat.id !== action.payload
                ),
            }
        },
        updateCatInList(state, action) {
            const newCat = action.payload
            return {
                catsList: state.catsList.map((cat) =>
                    cat.id === newCat.id ? { ...newCat } : cat
                ),
            }
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
export const selectCatById = (action: AnyAction) => (state: AppState) =>
    state.cats.catsList.filter((cat) => cat.id === action.payload)
export default catSlice.reducer
