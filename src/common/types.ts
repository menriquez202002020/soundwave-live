export interface Template {
  id: number
  image: string
  selected: boolean
  previewImage: string
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
  fonts: any[]
  selectedThumbnail: {
    id: number
    image: string
    imagePosition: {
      height: string
      width: string
      top: string
      left: string
    }
  }
  thumbnails: any[]
}

export interface Controls {
  showTemplates: boolean
  showTitleEditor: boolean
  showSubtitleEditor: boolean
  editBackground: boolean
  showFilterDropdown: boolean
  showImageSizeAlert: boolean
  showFileSizeAlert: boolean
  showRemoveAudioConfirmation: boolean
  currentStep: string
  audioComplete: boolean
  materialComplete: boolean
  currentEditting: string
  showTitleSaved: boolean
  isContinueDisabled: boolean
  showPreviewModal: boolean
  currentActiveAccordion: string
  isPreviewLoading: boolean
}

export interface Customizer {
  layout: string
  backgroundImage: string
}

export interface Size {
  key: string
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

export interface FilterOption {
  id: number
  checked: boolean
  text: string
}

export interface Filter {
  id: number
  title: string
  options: FilterOption[]
}

export interface Listing {
  frames: Frame[]
  sizes: Size[]
  colors: Color[]
  filters: Filter[]
  selectedFilters: FilterOption[]
}

export interface Selected {
  product: any
  frame: Frame
  size: Size
  color: Color
  template: Template
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
    title: CanvasTitle
    subtitle: CanvasTitle
  }
  specifications: {
    audioBuffer: any
    waveHeight: number
    width: number
    height: number
  }
  audioFile: File | null
  audioFileName: string
}

export interface CanvasTitle {
  text: string
  family: string
  weight: number
  size: number
}

export interface Audio {
  name: string
  file: File | null
}
