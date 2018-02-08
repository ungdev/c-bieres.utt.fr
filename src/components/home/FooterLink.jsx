import React from 'react'
import PropTypes from 'prop-types'

const FooterLink = ({ href, iconName }) => (
  <li className="footer__list__item">
    <a className="footer__list__item__link"
      href={href}>
      <i className={`fa fa-${iconName}`}></i>
    </a>
  </li>
)

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
}

export default FooterLink
