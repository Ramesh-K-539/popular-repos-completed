// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {imageUrl, starsCount, forksCount, issuesCount, id, name} = repoDetails
  return (
    <li className="repos-list-item" key={id}>
      <img src={imageUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="counts-text">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt=" forks"
          className="icon"
        />
        <p className="counts-text">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="counts-text">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
