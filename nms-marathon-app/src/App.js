import './App.scss';
import LayoutContainer from './layout/layoutContainer';
import { Provider } from "react-redux";
import store from './redux/store';
function App() {
  return (
    <div className="App-container">
      
        <Provider store={store}>
          <LayoutContainer />
        </Provider>
     
      
    </div>
  );
}

export default App;
