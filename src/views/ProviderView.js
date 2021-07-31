import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import { Typography } from '@material-ui/core';

class ProviderView extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let params = new URLSearchParams(window.location.toString().split('#')[1])
		const ruuid = sessionStorage.getItem("g-oauth-id");
		const validResponse = ruuid && !!params.get('state').match(ruuid);
		const token = params.get('access_token')

		this.setState({
			ruuid: ruuid,
			guid: params.get('state'),
			validResponse: validResponse,
			accessToken: token,
			scope: params.get('scope'),
			loading: validResponse
		})
		

		/*
			TODO: 
			0. Request finishes and redirects here
			1. Validate response then REDUX make request to api with access token
				1.5 Show Error if response is bad
			2. on request done then redirect to dashboard

			
			Get back user info: email, name, google_access_token, from the api as a response.
			Give back an error if provided access_token did not work on google
					"Unable to Login, please try again later."
		*/
		if (validResponse) {
			sessionStorage.setItem("g-tk", token);
			sessionStorage.setItem("g-oauth-id", null);
			this.props.fetchUser('google', token, this.props.history);
		}

	}

	render() {
		const { loading, validResponse } = this.props
		
		return (
			<div style={{ textAlign: 'center', paddingBottom: 20 }}>
				<h3>You are being redirected, please wait.</h3>
				{/* {!validResponse && <h3>Bad Response, please try again later</h3>} */}
				{/* {JSON.stringify(this.state)} */}
			</div>
		);
	}
}
// State is from reducer, auth is property on authReducer
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(withRouter(ProviderView));
