import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import * as actions from '../actions';
import RecipeList from '../components/RecipeList';
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';
import { Button } from '@material-ui/core';

class Dashboard extends Component {
	render() {
		const { fetchUserRecipes } = this.props;
		return (
			<GridContainer>
				<GridItem sm={12} md={6}>
					<Typography variant="display3" style={{color:'white', textShadow: '2px 2px #000000'}}>Dashboard</Typography>
				</GridItem>
				<GridItem sm={6} md={3}>
					{this.props.token && <Button variant="raised" color="primary" component={Link} to="/recipe/new">
						New Recipe
					</Button>}
				</GridItem>
				<GridItem sm={6} md={3}>
					{/* <Button style={{float: 'right'}}variant="raised" color="secondary" component={Link} to="/favorites">
						View Favorites
					</Button> */}
				</GridItem>
				<GridItem>
					<RecipeList title="" recipesAction={fetchUserRecipes} />
				</GridItem>
			</GridContainer>
		);
	}
}
function mapStateToProps({ auth }) {
	return { 
		token: auth.token
	};
}
export default connect(mapStateToProps, actions)(Dashboard);
