import React from 'react'
import ReactDOM from 'react-dom/client'
import { Shekinah } from './Shekinah'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Shekinah />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
