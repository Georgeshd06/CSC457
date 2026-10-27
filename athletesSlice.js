import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../config'

const API_URL = `${BASE_URL}/athletes`

export const fetchAthletes = createAsyncThunk('athletes/fetchAthletes', async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch athletes')
  }
  return response.json()
})

export const fetchAthleteById = createAsyncThunk('athletes/fetchAthleteById', async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error('Athlete not found')
  }
  return response.json()
})

export const addAthlete = createAsyncThunk('athletes/addAthlete', async (athlete) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(athlete),
  })
  if (!response.ok) {
    throw new Error('Failed to add athlete')
  }
  return response.json()
})

export const updateAthlete = createAsyncThunk('athletes/updateAthlete', async (athlete) => {
  const response = await fetch(`${API_URL}/${athlete.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(athlete),
  })
  if (!response.ok) {
    throw new Error('Failed to update athlete')
  }
  return response.json()
})

export const deleteAthlete = createAsyncThunk('athletes/deleteAthlete', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error('Failed to delete athlete')
  }
  return id
})

const athletesSlice = createSlice({
  name: 'athletes',
  initialState: {
    athletes: [],
    selectedAthlete: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAthletes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAthletes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.athletes = action.payload
      })
      .addCase(fetchAthletes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchAthleteById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAthleteById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedAthlete = action.payload
      })
      .addCase(fetchAthleteById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAthlete.fulfilled, (state, action) => {
        state.athletes.push(action.payload)
      })
      .addCase(updateAthlete.fulfilled, (state, action) => {
        state.athletes = state.athletes.map((a) =>
          a.id === action.payload.id ? action.payload : a
        )
        state.selectedAthlete = action.payload
      })
            .addCase(deleteAthlete.fulfilled, (state, action) => {
        state.athletes = state.athletes.filter((a) => a.id !== action.payload)
        state.selectedAthlete = null
      })
  },
})

export default athletesSlice.reducer