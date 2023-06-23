import React from 'react'
import { Accordion } from 'react-bootstrap'
import FrameOptions from '../FrameOptions'
import LayoutSizing from '../LayoutSizing/LayoutSizing'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../redux/store'
import { setCurrentActiveAccordion, setCurrentStep } from '../../redux/reducers/controls'
import './index.scss'

interface AccordionProps {
  eventKey: string
}

const MaterialAccordion: React.FC<AccordionProps> = ({ eventKey }) => {
  const { selected } = useSelector((state: RootState) => state.selected)
  const { specifications } = useSelector((state: RootState) => state.canvas)
  const { frame, size } = useSelector((state: RootState) => state.checkout.material)
  const dispatch = useDispatch()

  const updateCurrentSte = (): void => {
    dispatch(setCurrentStep('material'))
    dispatch(setCurrentActiveAccordion('1'))
  }

  return (
    <Accordion.Item onClick={updateCurrentSte} eventKey={eventKey}>
      <Accordion.Header className={`material-and-sizing-header ${(selected.frame.value !== '' && selected.size.title !== '' && specifications.audioBuffer !== null) ? 'material-sizing-selected' : ''}`} >
        <div className='upload-header'>
          <div>
            <div className={`${(frame.value !== '' && size.title !== '') ? 'complete' : ''}`}>
              <svg className='accordion-icon' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H13.8C14.9201 5 15.4802 5 15.908 5.21799C16.2843 5.40973 16.5903 5.71569 16.782 6.09202C17 6.51984 17 7.07989 17 8.2V13M1 5H5M17 17V21M21 17L8.2 17C7.07989 17 6.51984 17 6.09202 16.782C5.71569 16.5903 5.40973 16.2843 5.21799 15.908C5 15.4802 5 14.9201 5 13.8V1" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Material & Sizing
            </div>
            <p className='upload-desc'>Upload your media to continue:</p>
          </div>
          { (frame.value !== '' && size.title !== '') &&
            <div className="icon-wrapper">
              <img src="/src/assets/icons/accordion-check.png" alt="" className="icon" />
            </div>
          }
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="material-and-sizing-container">
          <p>Frame Type</p>
            <FrameOptions />
          <p>Size</p>
          <LayoutSizing />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default MaterialAccordion
