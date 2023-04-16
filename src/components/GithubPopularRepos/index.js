import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GitHubPopularRepos extends Component {
  state = {
    isLoading: apiStatusConstants.initial,
    repositoriesData: [],
    selectedLanguageFilter: 'ALL',
  }

  componentDidMount() {
    const {selectedLanguageFilter} = this.state

    this.getRepositories(selectedLanguageFilter)
  }

  setRepositories = (fetchedData, loadingStatus) => {
    this.setState({
      repositoriesData: fetchedData,
      isLoading: loadingStatus,
    })
  }

  setIsLoading = loadingStatus => {
    this.setState({isLoading: loadingStatus})
  }

  getRepositories = async selectedLanguageFilter => {
    this.setIsLoading(apiStatusConstants.inProgress)
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedLanguageFilter}`,
    )
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))

      this.setRepositories(updatedData, apiStatusConstants.success)
    } else if (response.status === 401) {
      this.setState({
        isLoading: apiStatusConstants.failure,
      })
    }
  }

  selectLanguage = id => {
    this.setState({selectedLanguageFilter: id})

    this.getRepositories(id)
  }

  renderRepo = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="ul-languages-list">
        {repositoriesData.map(each => (
          <RepositoryItem key={each.id} repoDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderAll = isLoading => {
    switch (isLoading) {
      case apiStatusConstants.success:
        return this.renderRepo()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {isLoading, selectedLanguageFilter} = this.state

    return (
      <div className="bg-container">
        <div className="details-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="ul-list">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                details={eachLanguage}
                selectLanguage={this.selectLanguage}
                isActive={eachLanguage.id === selectedLanguageFilter}
              />
            ))}
          </ul>
          {this.renderAll(isLoading)}
        </div>
      </div>
    )
  }
}

export default GitHubPopularRepos
