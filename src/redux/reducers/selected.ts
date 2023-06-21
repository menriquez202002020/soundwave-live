import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Template, Selected, Frame, Size, Color } from '../../common/types'

export interface SelectedState {
  selected: Selected
}

const initialState: SelectedState = {
  selected: {
    frame: {
      value: 'frame',
      image: 'src/assets/img/frame.png',
      title: 'Frame'
    },
    size: {
      inch: '8x10 inch',
      cm: '20.32 x 25.4 cm',
      title: 'Small'
    },
    color: {
      id: 1,
      key: 'option_0',
      image: 'src/assets/img/first.png',
      view: 'desktop'
    },
    template: {
      id: 1,
      image: '/src/assets/img/frames/frame-1.png',
      selected: true,
      title: {
        text: 'Minimalist nature',
        fontSize: '24px',
        fontFamily: 'Arial',
        fontWeight: '800',
        fontColor: 'blue'
      },
      subTitle: {
        text: 'Testing Sub Title 1',
        fontSize: '18px',
        fontFamily: 'Arial',
        fontWeight: '400',
        fontColor: 'red'
      },
      colors: [
        {
          id: 1,
          color: '#F27121'
        },
        {
          id: 2,
          color: '#3D9984'
        },
        {
          id: 3,
          color: '#D6B0FF'
        }
      ],
      fonts: [
        {
          id: 1,
          name: 'Josefin sans'
        }
      ]
    }
  }
}

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setFrame: (state: SelectedState, action: PayloadAction<Frame>) => {
      state.selected.frame = action.payload
    },
    setSize: (state: SelectedState, action: PayloadAction<Size>) => {
      state.selected.size = action.payload
    },
    setColor: (state: SelectedState, action: PayloadAction<Color>) => {
      state.selected.color = action.payload
    },
    setTemplate: (state: SelectedState, action: PayloadAction<Template>) => {
      state.selected.template = action.payload
    }
  }
})

export const { setFrame, setSize, setColor, setTemplate } = selectedSlice.actions

export default selectedSlice.reducer
