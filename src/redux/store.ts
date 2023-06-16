import { configureStore } from '@reduxjs/toolkit'
import templatesReducer from './reducers/templates'
import controlsReducer from './reducers/controls'

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    controls: controlsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
