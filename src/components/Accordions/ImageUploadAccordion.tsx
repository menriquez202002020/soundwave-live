import React from 'react'
import { Accordion } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import DragAndDropImageInput from '../DragAndDropImageInput/DragAndDropImageInput'
import { changeBackgroundImage } from '../../redux/reducers/customizer'
import { toggleShowImageSizeAlert } from '../../redux/reducers/controls'

interface AccordionProps {
  eventKey: string
}

const ImageUploadAccordion: React.FC<AccordionProps> = ({ eventKey }) => {
  const { specifications } = useSelector((state: RootState) => state.canvas)
  const { showImageSizeAlert } = useSelector((state: RootState) => state.controls.controls)
  const { controls } = useSelector((state: RootState) => state.controls)
  const { appLayoutState } = useSelector((state: RootState) => state.customizer)
  const dispatch = useDispatch()

  const handleLayoutImageUpdate = (file: File): void => {
    if (typeof file !== 'undefined' || file !== null) {
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB <= 5) {
        const imageReader = new FileReader()
        imageReader.readAsDataURL(file)
        imageReader.onloadend = () => {
          dispatch(changeBackgroundImage(imageReader.result as string))
          dispatch(toggleShowImageSizeAlert(false))
        }
      } else {
        dispatch(toggleShowImageSizeAlert(true))
      }
    }
  }
  return (
    <Accordion.Item eventKey={eventKey}> {
      (appLayoutState === 'Desktop' && controls.editBackground) &&
        <Accordion.Header className={`upload-header ${specifications.audioBuffer !== null ? 'file-uploaded' : ''}`}>
          <div className='upload-header'>
            <div>
              <div>
                <svg className='accordion-icon' width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L11 10M11 10L15 14M11 10V19M19 14.7428C20.2215 13.734 21 12.2079 21 10.5C21 7.46243 18.5376 5 15.5 5C15.2815 5 15.0771 4.886 14.9661 4.69774C13.6621 2.48484 11.2544 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 10.5661 1.83545 12.4371 3.18695 13.7935" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> Upload</div>
              <p className='upload-desc'>Upload your media to continue:</p>
            </div>
          </div>
        </Accordion.Header>
      }
      <Accordion.Body>
        <div className='accordion-upload-container image-container'>
          {
            (appLayoutState !== 'Desktop' && controls.editBackground) && <p className='mobile-bg-text'>Background image</p>
          }
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
  )
}

export default ImageUploadAccordion
