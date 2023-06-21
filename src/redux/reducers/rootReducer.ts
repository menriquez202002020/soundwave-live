import { combineReducers } from 'redux'
import templatesReducer from './templates'
import controlsReducer from './controls'
import customizerReducer from './customizer'
import listingReducer from './listing'
import selectedReducer from './selected'
import canvasReducer from './canvas'
import checkoutReducer from './checkout'

const rootReducer = combineReducers({
  templates: templatesReducer,
  controls: controlsReducer,
  customizer: customizerReducer,
  listing: listingReducer,
  selected: selectedReducer,
  canvas: canvasReducer,
  checkout: checkoutReducer
})

export default rootReducer
