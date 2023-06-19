import './index.css'
import React from 'react'
import type { Template } from '../../common/types'
import { useDispatch } from 'react-redux'
import { setSelectedTemplate } from '../../redux/reducers/templates'
import { setTemplate } from '../../redux/reducers/selected'

interface TemplateCardProps {
  template: Template
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const dispatch = useDispatch()

  const selectTemplate = (template: Template): void => {
    dispatch(setSelectedTemplate(template))
    dispatch(setTemplate(template))
  }

  return (
    <div onClick={() => { selectTemplate(template) }} className={`card-wrapper ${template.selected ? 'selected' : ''}`}>
      <div className="image-container">
        <img src={ template.image } alt="" className="image" />
      </div>
      <div className="title-container">
        <div className="title">{ template.title.text }</div>
      </div>
      <div className="color-scheme-container">
        {
          template.colors.map(color => (
            <div className="color" style={{ backgroundColor: color.color }} key={ color.id }></div>
          ))
        }
      </div>
    </div>
  )
}
export default TemplateCard
