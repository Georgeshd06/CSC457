import { createSlice } from '@reduxjs/toolkit'

function loadTheme() {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sportFilter: 'ALL',
    search: '',
    activeOnly: false,
    theme: loadTheme(),
  },
  reducers: {
    setSportFilter(state, action) {
      state.sportFilter = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setActiveOnly(state, action) {
      state.activeOnly = action.payload
    },
    resetFilters(state) {
      state.sportFilter = 'ALL'
      state.search = ''
      state.activeOnly = false
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})

export const {
  setSportFilter,
  setSearch,
  setActiveOnly,
  resetFilters,
  toggleTheme,
} = uiSlice.actions
export default uiSlice.reducer