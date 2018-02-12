import React from 'react'
import Toast from './Toast'

const Toasts = ({ toasts, onClick }) => (
  <div className="toasts">
    {toasts.map(toast => <Toast onClick={onClick} {...toast} />)}
  </div>
)

export default Toasts
