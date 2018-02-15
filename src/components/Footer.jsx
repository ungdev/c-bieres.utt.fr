import React from 'react'
import PropTypes from 'prop-types'
import FooterLink from './FooterLink'
import Button from './Button'

const Footer = ({ onAdminClick }) => (
  <footer className="footer">
    <ul>
      <FooterLink href="mailto:club-bieres@utt.fr" iconName="envelope" />
      <FooterLink href="https://www.facebook.com/groups/806374509420087/?fref=ts" iconName="facebook" />
      <li className="footer__list__item footer__list__item--right">
        <Button content="Admin" onClick={onAdminClick} theme="link" classes="footer__list__item--right__button"/>
      </li>
    </ul>
  </footer>
)

Footer.propTypes = {
  onAdminClick: PropTypes.func.isRequired,
}

export default Footer
