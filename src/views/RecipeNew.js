import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { Typography } from '@material-ui/core';

import RecipeForm from '../components/RecipeForm';

class RecipeNew extends Component {
	handleSubmit = (values) => {
		this.props.submitRecipe(this.props.token, values, this.props.history);
	};
	render() {
		return (
			<div>
				<Typography variant="display3" style={{color: 'white', textShadow: '2px 2px #000000'}}>New Recipe</Typography>
				<RecipeForm onSubmit={this.handleSubmit} />
			</div>
		);
	}
}
function mapStateToProps({ auth }) {
	return { 
		token: auth.token
	};
}
export default connect(mapStateToProps, actions)(withRouter(RecipeNew));
