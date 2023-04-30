import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { Cat } from '@/types/Cat'
import { AnyAction } from 'redux'

// Type for our state
export interface CatState {
    catsList: Array<Cat>
    searchResults: Array<Cat>
}

// Initial state
const initialState: CatState = {
    catsList: [],
    searchResults: [],
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
                ...state,
                catsList: state.catsList.filter(
                    (cat) => cat.id !== action.payload
                ),
            }
        },
        updateCatInList(state, action) {
            const newCat = action.payload
            return {
                ...state,
                catsList: state.catsList.map((cat) =>
                    cat.id === newCat.id ? { ...newCat } : cat
                ),
            }
        },
        searchCatList(state, action) {
            const query = action.payload
            return {
                ...state,
                searchResults: state.catsList.filter((cat) => {
                    return cat.name.toLowerCase().includes(query.toLowerCase())
                }),
            }
        },
    },
})

export const {
    addToCatsList,
    removeFromCatsList,
    updateCatInList,
    searchCatList,
} = catSlice.actions

export const selectCatsList = (state: AppState) => state.cats.catsList
export const selectSearchResults = (state: AppState) => state.cats.searchResults
export const selectCatById = (action: AnyAction) => (state: AppState) =>
    state.cats.catsList.filter((cat) => cat.id === action.payload)
export default catSlice.reducer
