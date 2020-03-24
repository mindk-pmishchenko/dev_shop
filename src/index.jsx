import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import Layout from "./containers/Layout/Layout";

function App() {
  return <Layout />;
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
