import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'


// const store = createStore(notificationReducer)

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)


// ReactDOM.render(<App />, document.getElementById('root'))



// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )
