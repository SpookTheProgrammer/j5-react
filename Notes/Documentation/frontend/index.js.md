./portofolio/src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Arduino from './App';
import reportWebVitals from './reportWebVitals';  

ReactDOM.createRoot(document.getElementById('root')).render(<Arduino />);
reportWebVitals();
```

Imports React ['react'] and the ReactDOM [react-dom/client] for the jsx. Global [./style.css] file from ./src/. Now the main file that handles most of the information from the web-server to the arduino is the Arduino import [./App]. Everything else is setup for React. 