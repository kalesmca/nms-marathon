import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerListComponent from './container/player-list/playerListComponent';
import PlayerRegistration from './container/registration/playerRegistration';
import PlayerDashboard from './container/player-dashboard/playerDashboard';
import LayoutContainer from './container/layout/layoutContainer';
import LoginComponent from './container/login/loginComponent';
import NotFoundComponent from './container/notFound/notFoundComponent';
import SourceDataComponent from './container/sourceData/sourceDataComponent';
import { PopupContext } from './config/context';
import LoginLayout from './container/login/loginLayout';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginBodyComponent from './container/login/loginBodyComponent';
function App() {
  const [msgPopupFlag, setMsgPopupFlag] = useState(false);
  const [navigationPath, setNavigationPath] = useState('');
  const [popupObj, setPopupObj] = useState({});
  return (
    <div data-testid="appTest">
      <Provider store={store}>
        <BrowserRouter>
          <PopupContext.Provider
            value={{
              msgPopupFlag,
              setMsgPopupFlag,
              navigationPath,
              setNavigationPath,
              popupObj,
              setPopupObj,
            }}
          >
            {/* <Routes>
          <Route path="/" element={<LayoutContainer />}>
                <Route index element={<LoginComponent />} />
                <Route path="player-list" element={<PlayerListComponent />} />
                <Route path="registration" element={<PlayerRegistration />} />
                <Route path="dashboard" element={<PlayerDashboard />} />
                <Route path="*" element={<NotFoundComponent />} />
                
          </Route>

        </Routes> */}
            <Routes>
              <Route element={<LoginLayout />}>
                <Route path="/" element={<LoginBodyComponent />} />
                <Route path="/login" element={<LoginBodyComponent />} />

                {/* <Route path="/login" element={<LoginComponent />} /> */}
                <Route path="*" element={<NotFoundComponent />} />
              </Route>

              <Route path="/authed" element={<LayoutContainer />}>
                <Route path="player-list" element={<PlayerListComponent />} />
                <Route path="registration" element={<PlayerRegistration />} />
                <Route path="dashboard" element={<PlayerDashboard />} />
                <Route path="source" element={<SourceDataComponent />} />
                {/* <Route path="*" element={<LayoutContainer />} /> */}
              </Route>
            </Routes>
          </PopupContext.Provider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
