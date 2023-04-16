// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {details} = props
  const {id, language} = details

  return (
    <li key={id} className="list-item">
      <button type="button" className="custom-language-button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
