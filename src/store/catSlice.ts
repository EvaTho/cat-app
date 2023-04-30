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

            localStorage.setItem('cats', JSON.stringify(state.catsList))
        },
        removeFromCatsList(state, action) {
            const filteredCatsList = state.catsList.filter(
                (cat) => cat.id !== action.payload
            )

            localStorage.setItem('cats', JSON.stringify(filteredCatsList))

            return {
                ...state,
                catsList: filteredCatsList,
            }
        },
        updateCatInList(state, action) {
            const newCat = action.payload
            const newList = state.catsList.map((cat) =>
                cat.id === newCat.id ? { ...newCat } : cat
            )

            localStorage.setItem('cats', JSON.stringify(newList))

            return {
                ...state,
                catsList: newList,
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
        setListFromLocalStorage(state, action) {
            return {
                ...state,
                catsList: action.payload,
            }
        },
        sortListByName(state, action) {
            const direction = action.payload
            const sortedList = state.catsList.slice().sort((a, b) => {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA > nameB) {
                    return direction === 'ascending' ? 1 : -1
                }
                if (nameA < nameB) {
                    return direction === 'ascending' ? -1 : 1
                }

                return 0
            })
            return {
                ...state,
                catsList: sortedList,
            }
        },
    },
})

export const {
    addToCatsList,
    removeFromCatsList,
    updateCatInList,
    searchCatList,
    setListFromLocalStorage,
    sortListByName,
} = catSlice.actions

export const selectCatsList = (state: AppState) => state.cats.catsList
export const selectSearchResults = (state: AppState) => state.cats.searchResults
export const selectCatById = (action: AnyAction) => (state: AppState) =>
    state.cats.catsList.filter((cat) => cat.id === action.payload)
export default catSlice.reducer
