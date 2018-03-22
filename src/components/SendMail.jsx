import React from 'react'
import Button from './Button'

const SendMail = ({ sendEventMail }) => (
  <div>
    <Button
      theme={"secondary"}
      onClick={sendEventMail}
      content={"Envoyer par mail"}
      classes={"btn-lg btn-block"} />
  </div>
)

export default SendMail
