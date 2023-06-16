import './index.css'
import React from 'react'
import type { Template } from '../../common/types'

interface TemplateCardProps {
  template: Template
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="card-wrapper">
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
