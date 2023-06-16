export const initialState = {
  defaultLayoutBackgroundImage: 'src/assets/img/layout-background.jpeg',
  customizerLayout: 'portrait',
  waveHeight: 20,
  canvasWidth: 350,
  canvasHeight: 170,
  mainTitlePosition: {
    x: 0,
    y: 0
  },
  frameOptions: [
    { value: 'frame', image: 'src/assets/img/frame.png', title: 'Frame' },
    { value: 'canvas', image: 'src/assets/img/canvas.png', title: 'Canvas' },
    { value: 'raw-art-work', image: 'src/assets/img/raw-art-work.png', title: 'Raw at work' }
  ],
  sizingOptions: [
    { size_inc: '8x10 inch', size_cm: '20.32 x 25.4 cm', title: 'Small' },
    { size_inc: '12x16 inch', size_cm: '30.48 x 40.64 cm', title: 'Medium' },
    { size_inc: '16x20 inch', size_cm: '40.64 x 50.8 cm', title: 'Large' },
    { size_inc: '24x36 inch', size_cm: '60.96 x 91.44 cm', title: 'Extra Large' }
  ],
  colorOptions: [
    { key: 'option_0', image: 'src/assets/img/first.png', view: 'desktop' },
    { key: 'option_1', image: 'src/assets/img/second.png', view: 'desktop' },
    { key: 'option_2', image: 'src/assets/img/third.png', view: 'desktop' },
    { key: 'option_3', image: 'src/assets/img/forth.png', view: 'desktop' }
  ],
  colorOptionsMobile: [
    { key: 'option_1', image: '/src/assets/icons/first_mobile.png', view: 'mobile' },
    { key: 'option_2', image: '/src/assets/icons/second_mobile.png', view: 'mobile' },
    { key: 'option_3', image: '/src/assets/icons/third_mobile.png', view: 'mobile' }
  ]
}
