import React, { useCallback, useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import DragAndDropImageInput from '../../components/DragAndDropImageInput/DragAndDropImageInput'
import DragAndDropInput from '../../components/DragAndDropInput/DragAndDropInput'
import WaveCanvas from '../../components/WaveCanvas/WaveCanvas'
import { initialState } from '../../components/InitialState/InitialState'
import RadioButtonToggle from '../../components/RadioButtonToggle/RadioButtonToggle'
import LayoutSizing from '../../components/LayoutSizing/LayoutSizing'
import ColorTemplate from '../../components/ColorTemplate/ColorTemplate'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'
import Templates from '../../components/Templates'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { toggleShowTemplates } from '../../redux/reducers/controls'
import '~/pages/customizer/customizer.scss'

export const Customizer: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [showFileSizeAlert, setShowFileSizeAlert] = useState<boolean>(false)
  const [showImageSizeAlert, setShowImageSizeAlert] = useState<boolean>(false)
  const [audioFileName, setAudioFileName] = useState<string>('No Files Selected')
  const [selectedFrame, setSelectedFrame] = useState<string>('')
  const [selectedSizing, setSelectedSizing] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [canvasTitle, setCanvasTitle] = useState<string>('Enter your title')
  const [canvasSubtitle, setCanvasSubtitle] = useState<string>('Enter your subtitle here')
  const [editLayoutBackground, setEditLayoutBackground] = useState<boolean>(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [layoutBackgroundImage, setLayoutBackgroundImage] = useState(initialState.defaultLayoutBackgroundImage)
  const [customizerLayout, setCustomizerLayout] = useState<string>(initialState.customizerLayout)

  // Redux state controls
  const { controls } = useSelector((state: RootState) => state.controls)
  const dispatch = useDispatch()

  const handleAudioChange = (file: File): void => {
    if (typeof file !== 'undefined' || file !== null) {
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB <= 10 && file.type.startsWith('audio/')) {
        setAudioFile(file)
        convertToAudioBuffer(file)
        setAudioFileName(file.name)
        setShowFileSizeAlert(false)
      } else {
        setShowFileSizeAlert(true)
        setAudioFile(null)
      }
    }
  }
  const handleLayoutImageUpdate = (file: File): void => {
    if (typeof file !== 'undefined' || file !== null) {
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB <= 5) {
        const imageReader = new FileReader()
        imageReader.readAsDataURL(file)
        imageReader.onloadend = () => {
          setLayoutBackgroundImage(imageReader.result as string)
          setShowImageSizeAlert(false)
        }
      } else {
        setShowImageSizeAlert(true)
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
        setAudioBuffer(audioBufferData)
      }
      console.log(audioBuffer)
    },
    [audioFile]
  )
  const onImageClick = (event: Event): void => {
    setEditLayoutBackground(true)
    console.log(event)
  }
  const resetAudioFile = (): void => {
    setShowConfirmation(true)
    console.log(showConfirmation)
  }
  const handleFrameSelection = (value: string): void => {
    setSelectedFrame(value)
    console.log(value)
  }
  const handleSizingSelection = (value: string): void => {
    setSelectedSizing(value)
    console.log(value)
  }
  // @ts-expect-error: will be used soon for out box closing
  // const handleCloseEditLayoutBackground = (): void => {
  //   setEditLayoutBackground(false)
  // }
  const handleColorSelection = (value: string): void => {
    if (selectedColor !== '') {
      setEditLayoutBackground(true)
    }
    setSelectedColor(value)
    console.log(value)
  }
  const handleConfirmDelete = (): void => {
    setAudioFile(null)
    setAudioBuffer(null)
    setShowConfirmation(false)
    console.log('reset')
  }

  const handleCancelDelete = (): void => {
    setShowConfirmation(false)
  }

  useEffect(
    () => {
      setCanvasTitle('Enter your title')
      setCanvasSubtitle('Enter your subtitle here')
      setCustomizerLayout(customizerLayout)
      console.log(canvasTitle)
    },
    [audioFile, selectedFrame, selectedSizing, showConfirmation]
  )
  return (
    <>
      <div className='template-container'>
        <div className="template-action-container">
          <button onClick={() => dispatch(toggleShowTemplates(true))} className="add-template-button">Template gallery</button>
          <button onClick={() => dispatch(toggleShowTemplates(false))} className="close-template-button"><img src="/src/assets/icons/close.png" alt="" className="icon" /></button>
        </div>
        <div className='col-12 customizer-container'>
          { controls.showTemplates
            ? <div className="col-5 input-container">
                <Templates />
              </div>
            : <div className='col-5 input-container'>
            { editLayoutBackground
              ? (<Accordion defaultActiveKey={['0']} className='main-accordion-layout'>
                  <Accordion.Item eventKey='0'>
                  <Accordion.Header className={`upload-header ${audioBuffer !== null ? 'file-uploaded' : ''}`}>
                    <div className='upload-header'>
                      <div>
                        <svg className='accordion-icon' width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 14L11 10M11 10L15 14M11 10V19M19 14.7428C20.2215 13.734 21 12.2079 21 10.5C21 7.46243 18.5376 5 15.5 5C15.2815 5 15.0771 4.886 14.9661 4.69774C13.6621 2.48484 11.2544 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 10.5661 1.83545 12.4371 3.18695 13.7935" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> Upload</div>
                      <p className='upload-desc'>Upload your media to continue:</p>
                    </div>
                  </Accordion.Header>
                    <Accordion.Body>
                      <div className='accordion-upload-container image-container'>
                        <div className='upload-container image-container'>
                          <DragAndDropImageInput onImageChange={handleLayoutImageUpdate} />
                        </div>
                      </div>
                      { showImageSizeAlert
                        ? <div className='alert-container'>
                            <p><img src='src/assets/icons/Check_ring_light.png' alt='' />{'Background size should not exceed 5MB.'}</p>
                          </div>
                        : null
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>)
              : (<Accordion defaultActiveKey={['0']} className='main-accordion-layout'>

                <Accordion.Item eventKey='0'>
                  <Accordion.Header className={`upload-header ${audioBuffer !== null ? 'file-uploaded' : ''}`}>
                    <div className='upload-header'>
                      <div>
                        <svg className='accordion-icon' width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 14L11 10M11 10L15 14M11 10V19M19 14.7428C20.2215 13.734 21 12.2079 21 10.5C21 7.46243 18.5376 5 15.5 5C15.2815 5 15.0771 4.886 14.9661 4.69774C13.6621 2.48484 11.2544 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 10.5661 1.83545 12.4371 3.18695 13.7935" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> Upload</div>
                      <p className='upload-desc'>Upload your media to continue:</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className='accordion-upload-container'>
                      { (audioBuffer !== null) &&
                        <div className='upload-wave-container'>
                          <WaveCanvas id='acc_sound_wave' waveHeight={initialState.waveHeight} audioBuffer={audioBuffer} width={initialState.canvasWidth} height={initialState.canvasHeight} />
                          <div className='filename'>
                            <img src='src/assets/icons/play-icon.png' alt='' />
                            <p className='audio-name'>{audioFileName}</p>
                            <button className='btn-circle btn-custom-delete' onClick={resetAudioFile}>
                              <img src='src/assets/icons/svg/delete.svg' alt='' />
                            </button>
                          </div>
                        </div>}
                      {(audioBuffer === null) && <div className='upload-container'><DragAndDropInput onFileChange={handleAudioChange} /></div>}
                    </div>
                    { (showFileSizeAlert) &&
                      <div className='alert-container'>
                        <p><img src='src/assets/icons/Check_ring_light.png' alt='' />{'Media size should not exceed 10MB.'}</p>
                      </div>
                    }
                  </Accordion.Body>
                </Accordion.Item>
                {/* Material Accordion */}
                <Accordion.Item eventKey='1'>
                  <Accordion.Header className={`material-and-sizing-header ${(selectedFrame !== '' && selectedSizing !== '' && audioBuffer !== null) ? 'material-sizing-selected' : ''}`} >
                    <div className='upload-header'>
                      <div>
                        <svg className='accordion-icon' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5H13.8C14.9201 5 15.4802 5 15.908 5.21799C16.2843 5.40973 16.5903 5.71569 16.782 6.09202C17 6.51984 17 7.07989 17 8.2V13M1 5H5M17 17V21M21 17L8.2 17C7.07989 17 6.51984 17 6.09202 16.782C5.71569 16.5903 5.40973 16.2843 5.21799 15.908C5 15.4802 5 14.9201 5 13.8V1" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Material & Sizing
                      </div>
                      <p className='upload-desc'>Upload your media to continue:</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="material-and-sizing-container">
                      <p>Frame Type</p>
                      <RadioButtonToggle options={initialState.frameOptions} handleFrameSelection={handleFrameSelection} />
                      <p>Size</p>
                      <LayoutSizing options={initialState.sizingOptions} handleSizingSelection={handleSizingSelection} />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {/* Order Review Accordion */}
                <Accordion.Item eventKey='2'>
                  <Accordion.Header>
                    <div className='upload-header'>
                      <div>
                        <svg className='accordion-icon' width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 10H5M7 14H5M13 6H5M17 5.8V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H12.2C13.8802 1 14.7202 1 15.362 1.32698C15.9265 1.6146 16.3854 2.07354 16.673 2.63803C17 3.27976 17 4.11984 17 5.8Z" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Order Review
                      </div>
                      <p className='upload-desc'>Here is your order details:</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="order-preview-container">
                      <li className="order-item">
                        ORIENTATION<strong>{'Landscapre'}</strong>
                      </li>
                      <li className="order-item">
                        FRAME TYPE<strong>{selectedFrame}</strong>
                      </li>
                      <li className="order-item">
                        SIZE<strong>{selectedSizing}</strong>
                      </li>
                      <li className="order-item">
                        TOTAL PRICE<strong>{'€50.00'}</strong>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                {!editLayoutBackground && !controls.showTemplates &&
                  <div className='input-btns col-12'>
                    <button className='btn-transparent col-6'>
                      Preview
                    </button>
                    <button className='btn btn-primary col-6'>
                      Continue
                    </button>
                  </div>
                }
              </Accordion>)
            }
            {showConfirmation
              ? <ConfirmationModal
                isOpen={showConfirmation}
                message="Are you sure you want to remove the audio you uploaded?"
                subMessage="You will not be able to undo this action."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
              : null
            }
          </div>
          }
          <div className={`col-7 canvas-container ${customizerLayout}`}>
            <div className='canvas-component'>
              <div className='canvas-header'>
                <p>Landscape Image Background Template</p><img src='src/assets/icons/header-icon.png' alt='' />
              </div>
              <div className={'canvas-content'} style={{ background: `url('${layoutBackgroundImage}'` }}>
                <div className={`overlay ${selectedColor}`}></div>
                <div className="canvas-text title">
                  {/* <h1>{canvasTitle}</h1> */}
                </div>
                <div className="canvas-text subtitle">
                  <h1>{canvasSubtitle}</h1>
                </div>
                <div className="canvas-soundwave">
                  {(audioBuffer !== null)
                    ? <WaveCanvas id='canvas-canvas' waveHeight={initialState.waveHeight} audioBuffer={audioBuffer} width={initialState.canvasWidth} height={initialState.canvasHeight} />
                    : <div className="temp-canvas-image"><img src="src/assets/img/soundwave.png" alt="" /></div>
                  }
                </div>
              </div>
              <div className='canvas-footer desktop'>
                <ColorTemplate options={initialState.colorOptions} onImageClick={onImageClick} handleColorSelection={handleColorSelection} />
              </div>
              <div className='canvas-footer mobile'>
                <ColorTemplate options={initialState.colorOptionsMobile} onImageClick={onImageClick} handleColorSelection={handleColorSelection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
