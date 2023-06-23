import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import WaveCanvas from '../WaveCanvas/WaveCanvas'
import { updateOrientation } from '../../redux/reducers/canvas'
import { toggleTitleEditor, toggleSubtitleEditor, setCurrentEditting } from '../../redux/reducers/controls'
import ColorTemplate from '../../components/ColorTemplate/ColorTemplate'
import './Canvas.scss'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

const Canvas: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false)
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
    dispatch(setCurrentEditting('title'))
  }

  const editSubtitle = (): void => {
    dispatch(toggleSubtitleEditor(!controls.showSubtitleEditor))
    dispatch(setCurrentEditting('subtitle'))
  }

  const handleContextMenu = (e: any): void => {
    e.preventDefault()
  }

  const disableRefreshHotkey = (): void => {
    window.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault()
        setShowPrompt(true)
      }

      if (e.keyCode === 116) {
        e.preventDefault()
        setShowPrompt(true)
      }

      if (e.key === 'PrtSc') {
        e.preventDefault()
        alert('disabled print screen')
      }
    })
  }

  const reloadPage = (): void => {
    setShowPrompt(false)
    location.reload()
  }

  useEffect(() => {
    disableRefreshHotkey()
    const unloadHandler = (event: any): void => {
      event.preventDefault()
      event.returnValue = ''
      setShowPrompt(true)
    }
    window.addEventListener('beforeunload', unloadHandler)

    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

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
          <div onClick={editTitle} className={`canvas-text title ${controls.currentEditting === 'title' ? 'current' : ''}`}>
            <div style={{ fontFamily: title.family, fontWeight: title.weight, fontSize: `${title.size}px` }} className={`text ${controls.currentEditting === 'title' ? 'current' : ''}`}>{title.text}</div>
          </div>
          <div onClick={editSubtitle} className={`canvas-text subtitle ${controls.currentEditting === 'subtitle' ? 'current' : ''}`}>
            <div style={{ fontFamily: subtitle.family, fontWeight: subtitle.weight, fontSize: `${subtitle.size}px` }} className={`text ${controls.currentEditting === 'subtitle' ? 'current' : ''}`}>{subtitle.text}</div>
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
      <ConfirmationModal
        isOpen={showPrompt}
        message='Are you sure you want to close the window?'
        subMessage='Your changes and customization will not be saved.'
        onCancel={() => { setShowPrompt(false) }}
        onConfirm={reloadPage}
        cancelText='Cancel'
        confirmText='Yes, Close'/>
    </>
  )
}

export default Canvas
