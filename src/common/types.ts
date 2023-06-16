export interface Template {
  id: number
  image: string
  title: {
    text: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    fontColor: string
  }
  subTitle: {
    text: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    fontColor: string
  }
  colors: any[]
}

export interface Controls {
  showTemplates: boolean
  editBackground: boolean
}

export interface Customizer {
  layout: string
  backgroundImage: string
}

export interface Size {
  inch: string
  cm: string
  title: string
}

export interface Frame {
  title: string
  value: string
  image: string
}

export interface Color {
  id: number
  key: string
  image: string
  view: string
}

export interface Listing {
  frames: Frame[]
  sizes: Size[]
  colors: Color[]
}

export interface Selected {
  frame: Frame
  size: Size
  color: Color
}

export interface CustomCanvas {
  target: {
    classList: any[]
  }
}

export interface Canvas {
  id: string
  orientation: string
  frameType: string
  size: string
  totalPrice: number
  content: {
    title: string
    subtitle: string
  }
  specifications: {
    audioBuffer: AudioBuffer | null
    waveHeight: number
    width: number
    height: number
  }
}
