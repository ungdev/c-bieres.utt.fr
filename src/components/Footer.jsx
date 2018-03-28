import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ onAdminClick, onMailListClick }) => (
  <footer>
    <div class="social">
      <a href="mailto:club-bieres@utt.fr" class="support">
        <i className="fa fa-envelope"></i>
      </a>
      <a href="https://www.facebook.com/groups/806374509420087/?fref=ts" class="facebook">
        <i className="fa fa-facebook"></i>
      </a>
      <a onClick={onMailListClick} class="maillist">Mail List</a>
      <a onClick={onAdminClick} class="admin">Admin</a>
    </div>
  </footer>
)

Footer.propTypes = {
  onAdminClick: PropTypes.func.isRequired,
  onMailListClick: PropTypes.func.isRequired,
}

export default Footer
