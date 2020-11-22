import React from 'react'
import { render } from 'react-dom'
import App from 'app'
import 'constants/styles/theme.scss'
import 'constants/styles/size.scss'
import 'constants/styles/common.scss'
import 'constants/styles/grid.scss'
import 'constants/styles/custom.scss'

render(
  <App />
  , document.getElementById('root'))
