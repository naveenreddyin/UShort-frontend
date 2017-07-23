import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import createStore from './Redux'

const store = createStore()

class Root extends React.Component {

  render () {

    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
