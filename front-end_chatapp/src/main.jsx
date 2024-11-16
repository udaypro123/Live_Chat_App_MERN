
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './components/store/store.js'
import { SocketProvider } from './components/context/Context.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </Provider>

)
