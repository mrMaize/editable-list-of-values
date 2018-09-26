import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import manageData, {initialState} from "./redux/reducers/reducers";
//import {updateData} from "./redux/reducers/actions/actions";
import { createLogger } from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Main from "./components/Main";



const middleWare = [];
middleWare.push(thunk);
middleWare.push(createLogger());

const store = createStore(
    manageData,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);


class App extends React.Component {

    render() {
        return(
            <Provider store={store}>
                <Main/>
            </Provider>

        );
    }
}

render(<App/>, window.document.getElementById("app"));