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

class GitHubPopularRepos extends Component {
  state = {
    language: languageFiltersData[0].id,
    languagesList: '',
    isLoading: false,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {language} = this.state

    this.setState({isLoading: true})

    const url = `https://apis.ccbp.in/popular-repos?language=${language}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data.popular_repos)

      const upDateList = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({languagesList: upDateList, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="bg-container">
      <div className="details-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="ul-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem key={eachLanguage.id} details={eachLanguage} />
          ))}
        </ul>
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      </div>
    </div>
  )

  renderRepos = () => {
    const {languagesList} = this.state
    return (
      <div className="bg-container">
        <div className="details-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="ul-list">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                details={eachLanguage}
              />
            ))}
          </ul>
          <ul className="ul-languages-list">
            {languagesList.map(each => (
              <RepositoryItem key={each.id} repoDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, languagesList} = this.state
    console.log(isLoading)
    console.log(languagesList[0])
    return this.renderLoader()
  }
}

export default GitHubPopularRepos
