import { Accordion } from 'react-bootstrap'
import React, { useCallback, useEffect, useState } from 'react'
import DragAndDropInput from './../DragAndDropInput/DragAndDropInput'
import WaveCanvas from './../WaveCanvas/WaveCanvas'
import './AccordionInput.css'

export const AccordionInput: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [showFileSizeAlert, setShowFileSizeAlert] = useState<boolean>(false)
  const [audioFileName, setAudioFileName] = useState<string>('No Files Selected')

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
  const resetAudioFile = (): void => {
    setAudioFile(null)
    setAudioBuffer(null)
    console.log('reset')
  }

  useEffect(() => {
    console.log('Testing')
  }, [])

  return (
    <>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey='0'>
          <Accordion.Header><div className='upload-header'><div><img src='src/assets/icons/upload.png' alt='icon' /> Upload </div><p className='upload-desc'>Upload yuor media to continue:</p></div></Accordion.Header>
          <Accordion.Body>
            <div className='accordion-upload-container'>

              {(audioBuffer !== null) &&
                <div className='upload-wave-container'>
                  <WaveCanvas id='acc_sound_wave' />
                  <div className='filename'>
                    <img src='src/assets/icons/play-icon.png' alt='' />
                    <p className='audio-name'>{audioFileName}</p>
                    <img src='src/assets/icons/delete-icon.png' onClick={resetAudioFile} alt='' />
                  </div>
                </div>}
              {(audioBuffer === null) && <div className='upload-container'><DragAndDropInput onFileChange={handleAudioChange} /></div>}
            </div>
            {(showFileSizeAlert) &&
              <div className='alert-container'>
                <p><img src='src/assets/icons/Check_ring_light.png' alt='' />{'Media size should not exceed 10MB.'}</p>
              </div>
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header><img src='src/assets/icons/material-sizing.png' alt='icon' /> Material & Sizing</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header><img src='src/assets/icons/preview.png' alt='icon' /> Order Review</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
