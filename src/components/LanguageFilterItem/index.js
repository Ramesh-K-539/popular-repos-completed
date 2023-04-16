// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {details, selectLanguage, isActive} = props
  const {id, language} = details

  const onClickLanguage = () => {
    selectLanguage(id)
  }

  const btnClassName = isActive
    ? 'custom-language-button active-button'
    : 'custom-language-button'

  return (
    <li key={id} className="list-item">
      <button type="button" className={btnClassName} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
