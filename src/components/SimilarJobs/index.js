import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'

import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem
  return (
    <li className="similar-product-item-container">
      <div className="img-container">
        <img
          className="similar-img"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="job-name-container">
          <h1 className="job-role-text">{title}</h1>
          <div className="job-role-star-container">
            <AiFillStar className="star-icon" />
            <p className="job-role-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description">Discription</h1>
      <p className="job-role-description">{jobDescription}</p>
      <div className="job-location-job-type-container">
        <div className="job-location-container">
          <MdLocationOn className="location-icon" />
          <p className="job-location-text">{location}</p>
        </div>
        <div className="job-location-container">
          <CgToolbox className="location-icon" />
          <p className="job-location-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
