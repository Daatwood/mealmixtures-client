import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import GridContainer from './GridContainer';
import GridItem from './GridItem';

import RecipeCard from './RecipeCard';
import Loading from './Loading';

import isOwner from '../utils/isOwner';
import isFavorite from '../utils/isFavorite';
import * as actions from '../actions';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: 140,
		width: 100
	},
	card: {
		maxWidth: 345
	},
	control: {
		padding: theme.spacing.unit * 2
	}
});

class RecipeList extends Component {
	componentDidMount() {
		this.props.recipesAction(this.props.user.token);
	}

	renderRecipes() {
		const { recipes, loading, error, user } = this.props;
		if (loading) {
			return (
				<GridItem>
					<Loading />
				</GridItem>
			);
		} else if (error) {
			return <h1>Error: {error}</h1>;
		} else if (recipes.length) {
			return recipes.map((recipe) => {
				return (
					<GridItem key={recipe.id}>
						<RecipeCard
							{...recipe}
							user={user}
							isOwner={isOwner(user, recipe)}
							favorited={isFavorite(user, recipe)}
							onDelete={() => this.props.deleteRecipe(recipe.id, this.props.history)}
							addFavorite={this.props.addFavorite}
							removeFavorite={this.props.removeFavorite}
						/>
					</GridItem>
				);
			});
		} else {
			return (
				<GridItem>
					<Typography variant="display1">No Recipes found.</Typography>
				</GridItem>
			);
		}
	}

	render() {
		const { classes, title } = this.props;
		return (
			<GridContainer className={classes.root} justify="space-around">
				{title && <GridItem xs={12}>
					<Typography variant="display1">{title}</Typography>
				</GridItem>}
				{this.renderRecipes()}
			</GridContainer>
		);
	}
}

function mapStateToProps({ auth, recipes }) {
	return {
		user: auth,
		recipes: recipes.list,
		loading: recipes.loading,
		error: recipes.error
	};
}

export default connect(mapStateToProps, actions)(withRouter(withStyles(styles)(RecipeList)));
