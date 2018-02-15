import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Banner = ({ event, date, registration, onClick }) => (
  <section className="banner">
    <video className="banner__video" autoPlay>
      <source src="videos/banner.mp4" type="video/mp4"/>
      <img src="images/banner.png" alt=""/>
    </video>
    <div className="banner__inner">
      <h1 className="banner__inner__title">Club bières</h1>
      {
        date
        ?
          <div>
            <p className="banner__inner__text">
              Prochaine dégustation le {date}.
            </p>
            {
              registration == event._id
              ?
                <Button
                  classes={"btn-lg banner__inner__button"}
                  onClick={onClick}
                  content="Me désinscrire"
                  theme="danger" />
              :
                <Button
                  classes={"btn-lg banner__inner__button"}
                  onClick={onClick}
                  content={<span>J'en suis <i className="fa fa-beer"></i></span>}
                  theme="primary" />
            }
          </div>
        :
          <p>Aucun évènement prévu pour le moment.</p>
      }
    </div>
  </section>
)

Banner.propTypes = {
  event: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  date: PropTypes.string,
  registration: PropTypes.string,
  onClick: PropTypes.func.isRequired
}


export default Banner
