import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Controls } from '../../common/types'

export interface ControlsState {
  controls: Controls
}

const initialState: ControlsState = {
  controls: {
    // Side editor controls
    showTemplates: false,
    showTitleEditor: false,
    showSubtitleEditor: false,

    // General controls
    editBackground: false,
    showFilterDropdown: false,
    showImageSizeAlert: false,
    showFileSizeAlert: false,
    showRemoveAudioConfirmation: false,
    currentStep: 'audio',
    audioComplete: false,
    materialComplete: false,
    currentEditting: '',
    showTitleSaved: false,
    isContinueDisabled: true,
    showPreviewModal: false,
    currentActiveAccordion: '0',
    isPreviewLoading: false
  }
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    toggleShowTemplates: (state: ControlsState, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.controls.showTitleEditor = false
        state.controls.showSubtitleEditor = false
      }

      state.controls.showTemplates = action.payload
    },
    toggleTitleEditor: (state: ControlsState, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.controls.showTemplates = false
        state.controls.showSubtitleEditor = false
      }

      state.controls.showTitleEditor = action.payload
    },
    toggleSubtitleEditor: (state: ControlsState, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.controls.showTemplates = false
        state.controls.showTitleEditor = false
      }

      state.controls.showSubtitleEditor = action.payload
    },
    toggleEditBackground: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.editBackground = action.payload
      if (action.payload) {
        state.controls.showTemplates = false
        state.controls.showTitleEditor = false
        state.controls.showSubtitleEditor = false
      }
    },
    toggleShowFilterDropdown: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showFilterDropdown = action.payload
    },
    toggleShowImageSizeAlert: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showImageSizeAlert = action.payload
    },
    toggleShowFileSizeAlert: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showFileSizeAlert = action.payload
    },
    toggleShowAudioResetConfirmation: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showRemoveAudioConfirmation = action.payload
    },
    setCurrentStep: (state: ControlsState, action: PayloadAction<string>) => {
      state.controls.currentStep = action.payload
    },
    setAudioComplete: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.audioComplete = action.payload
    },
    setMaterialComplete: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.materialComplete = action.payload
    },
    setCurrentEditting: (state: ControlsState, action: PayloadAction<string>) => {
      state.controls.currentEditting = action.payload
    },
    setShowtitleSaved: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showTitleSaved = action.payload
    },
    setIsContinueDisabled: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.isContinueDisabled = action.payload
    },
    setShowPreviewModal: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.showPreviewModal = action.payload
    },
    setCurrentActiveAccordion: (state: ControlsState, action: PayloadAction<string>) => {
      state.controls.currentActiveAccordion = action.payload
    },
    setIsPreviewLoading: (state: ControlsState, action: PayloadAction<boolean>) => {
      state.controls.isPreviewLoading = action.payload
    }
  }
})

export const {
  toggleShowTemplates,
  toggleTitleEditor,
  toggleSubtitleEditor,
  toggleEditBackground,
  toggleShowFilterDropdown,
  toggleShowImageSizeAlert,
  toggleShowFileSizeAlert,
  toggleShowAudioResetConfirmation,
  setCurrentStep,
  setAudioComplete,
  setMaterialComplete,
  setCurrentEditting,
  setShowtitleSaved,
  setIsContinueDisabled,
  setShowPreviewModal,
  setCurrentActiveAccordion,
  setIsPreviewLoading
} = controlsSlice.actions

export default controlsSlice.reducer
