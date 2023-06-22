import React, { useCallback } from 'react'
import { Accordion } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import { toggleShowFileSizeAlert, toggleShowAudioResetConfirmation, setCurrentStep, setIsContinueDisabled } from '../../redux/reducers/controls'
import { setAudioFileName, setAudioFile, updateSpecifications } from '../../redux/reducers/canvas'
import WaveCanvas from '../WaveCanvas/WaveCanvas'
import DragAndDropInput from '../DragAndDropInput/DragAndDropInput'
import './index.scss'

interface AccordionProps {
  eventKey: string
}

const AudioUploadAccordion: React.FC<AccordionProps> = ({ eventKey }) => {
  const { specifications, audioFileName, audioFile } = useSelector((state: RootState) => state.canvas)
  const { showFileSizeAlert } = useSelector((state: RootState) => state.controls.controls)
  const { audio } = useSelector((state: RootState) => state.checkout)
  const dispatch = useDispatch()

  const handleAudioChange = (file: File): void => {
    if (typeof file !== 'undefined' || file !== null) {
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB <= 10 && file.type.startsWith('audio/')) {
        dispatch(setAudioFile(file))
        convertToAudioBuffer(file)
        dispatch(setAudioFileName(file.name))
        dispatch(toggleShowFileSizeAlert(false))
        dispatch(setIsContinueDisabled(false))
      } else {
        dispatch(toggleShowFileSizeAlert(true))
        dispatch(setAudioFile(null))
        dispatch(setIsContinueDisabled(true))
      }
    }
  }

  const convertToAudioBuffer = useCallback(
    (file: File): void => {
      if (typeof file === 'undefined') {
        return
      }
      const audioContext = new AudioContext()
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = async () => {
        const arrayBuffer = await file.arrayBuffer()
        const audioBufferData = await audioContext.decodeAudioData(arrayBuffer)
        dispatch(updateSpecifications({ audio: audioBufferData }))
      }
    },
    [audioFile]
  )

  const resetAudioFile = (): void => {
    dispatch(toggleShowAudioResetConfirmation(true))
  }

  return (
    <Accordion.Item eventKey={ eventKey }>
      <Accordion.Header onClick={ () => { dispatch(setCurrentStep('audio')) } } className={`upload-header ${specifications.audioBuffer !== null ? 'file-uploaded' : ''}`}>
        <div className='upload-header'>
          <div>
            <div className={`${audio.file !== null ? 'complete' : ''}`}>
              <svg className='accordion-icon' width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14L11 10M11 10L15 14M11 10V19M19 14.7428C20.2215 13.734 21 12.2079 21 10.5C21 7.46243 18.5376 5 15.5 5C15.2815 5 15.0771 4.886 14.9661 4.69774C13.6621 2.48484 11.2544 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 10.5661 1.83545 12.4371 3.18695 13.7935" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload
            </div>
            <p className='upload-desc'>Upload your audio to continue:</p>
          </div>
          { audio.file !== null &&
            <div className="icon-wrapper">
              <img src="/src/assets/icons/accordion-check.png" alt="" className="icon" />
            </div>
          }
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className='accordion-upload-container'>
          {
            (specifications.audioBuffer !== null) &&
            <div className='upload-wave-container'>
              <div className="wave-wrapper">
                <WaveCanvas id='acc-canvas' />
              </div>
              <div className='filename'>
                <img src='src/assets/icons/play-icon.png' alt='' />
                <p className='audio-name'>{audioFileName}</p>
                <button className='btn-circle btn-custom-delete' onClick={resetAudioFile}>
                  <img src='src/assets/icons/svg/delete.svg' alt='' />
                </button>
              </div>
            </div>
          }
          {(specifications.audioBuffer === null) && <div className='upload-container'><DragAndDropInput onFileChange={handleAudioChange} /></div>}
        </div>
        { (showFileSizeAlert) &&
          <div className='alert-container'>
            <p><img src='src/assets/icons/Check_ring_light.png' alt='' />{'Media size should not exceed 10MB.'}</p>
          </div>
        }
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default AudioUploadAccordion
