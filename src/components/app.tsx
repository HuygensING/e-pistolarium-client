import * as React from 'react';
import {Link, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import styled from "styled-components";
import Messages, { addMessage } from 'hire-messages';
import store from "../store";
import history from '../store/history';
import Home from './home';
import Document from './document';
import RootAnnotations from './root-annotations';

const wrapperStyle: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: '100vw',
	gridTemplateRows: '10vh 90vh',
};

const headerStyle: React.CSSProperties = {
	background: '#CCC',
	fontSize: '2em',
	fontWeight: 'bold',
	height: '8vh',
	lineHeight: '8vh',
	paddingLeft: '1vw',
};

export default () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div style={{wrapperStyle}}>
				<header style={headerStyle}>
					<Link to="/">ePistolarium</Link>
				</header>
				<Route
					component={Home}
					exact
					path="/"
				/>
				<Route
					component={Document}
					path="/documents/:id"
				/>
				<Route
					component={RootAnnotations}
					path="/root-annotations"
				/>
				{/*{Messages}*/}
			</div>
		</ConnectedRouter>
	</Provider>
);
