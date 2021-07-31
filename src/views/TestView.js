import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import { Typography } from '@material-ui/core';

class TestView extends Component {
	render() {
		
		return (
			<div style={{ textAlign: 'center', paddingBottom: 20 }}>
				<p>{JSON.stringify(this.props)}</p>
			</div>
		);
	}
}
function mapStateToProps({ auth, recipes }) {
	return { recipes, auth };
}
export default connect(mapStateToProps, actions)(withRouter(TestView));
