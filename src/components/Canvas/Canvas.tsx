import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import WaveCanvas from '../WaveCanvas/WaveCanvas'
import { updateOrientation } from '../../redux/reducers/canvas'
import { toggleTitleEditor, toggleSubtitleEditor } from '../../redux/reducers/controls'
import ColorTemplate from '../../components/ColorTemplate/ColorTemplate'
import './Canvas.scss'

const Canvas: React.FC = () => {
  const [audioFile] = useState<File | null>(null)
  const [showConfirmation] = useState(false)
  const { orientation, specifications, content } = useSelector((state: RootState) => state.canvas)
  const { title, subtitle } = content
  const { customizer } = useSelector((state: RootState) => state.customizer)
  const { selected } = useSelector((state: RootState) => state.selected)
  const { controls } = useSelector((state: RootState) => state.controls)
  const dispatch = useDispatch()

  const setCanvasOrientation = (): void => {
    const canvasOrientation = orientation === 'landscape' ? 'portrait' : 'landscape'
    dispatch(updateOrientation(canvasOrientation))
  }

  const editTitle = (): void => {
    dispatch(toggleTitleEditor(!controls.showTitleEditor))
  }

  const editSubtitle = (): void => {
    dispatch(toggleSubtitleEditor(!controls.showSubtitleEditor))
  }

  useEffect(
    () => {},
    [audioFile, showConfirmation]
  )
  return (
    <>
      <div className='canvas-component'>
        <div className='canvas-header'>
          <p className='text-capitalize'>{orientation} Image Background Template</p>
          <button className='btn-circle' onClick={setCanvasOrientation}>
            <img className={`orientation-icon ${orientation + '-orientation'}`} src='src/assets/icons/svg/orientation-icon.svg' alt='' />
          </button>
        </div>
        <div className={'canvas-content'} style={{ background: `url('${customizer.backgroundImage}'` }}>
          <div className={`overlay ${selected.color.view} ${selected.color.key}`}></div>
          <div onClick={editTitle} className="canvas-text title">
            <div style={{ fontFamily: title.family, fontWeight: title.weight, fontSize: `${title.size}px` }} className="text">{title.text}</div>
          </div>
          <div onClick={editSubtitle} className="canvas-text subtitle">
            <div style={{ fontFamily: subtitle.family, fontWeight: subtitle.weight, fontSize: `${subtitle.size}px` }} className="text">{subtitle.text}</div>
          </div>
          <div className="canvas-soundwave">
            {(specifications.audioBuffer !== null)
              ? <WaveCanvas id='main-canvas' />
              : <div className="temp-canvas-image"><img src="src/assets/img/soundwave.png" alt="" /></div>
            }
          </div>
        </div>
        <div className='canvas-footer desktop'>
          <ColorTemplate view="desktop" />
        </div>
        <div className='canvas-footer mobile'>
          <ColorTemplate view="mobile" />
        </div>
      </div>
    </>
  )
}

export default Canvas
