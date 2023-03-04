import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()

    if (response.ok === true) {
      const fetchedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryProfile = () => {
    this.profileApiCall()
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, bio} = profileData
    return (
      <div className="profile-container">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{bio}</p>
      </div>
    )
  }

  renderPendingView = () => (
    <div className="failure-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.onRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPendingView()
      default:
        return null
    }
  }
}

export default Profile
