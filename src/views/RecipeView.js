import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import recipeViewStyle from '../styles/recipeViewStyle';

import IngredientList from '../components/IngredientList';
import DirectionList from '../components/DirectionList';
import Loading from '../components/Loading';
import FavoriteButton from '../components/FavoriteButton';
import ActionMenu from '../components/ActionMenu';
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';

import isOwner from '../utils/isOwner';
import isFavorite from '../utils/isFavorite';
import * as actions from '../actions';

class RecipeView extends Component {
	state = {
		checked: [ 0 ],
		rating: 3
	};

	componentWillMount() {
		this.props.fetchRecipe(this.props.match.params.id);
	}

	handleToggle = (value) => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked
		});
	};

	handleRating = (value) => {
		this.setState({ rating: value });
	};

	handleFavorite = (value) => {
		const { id } = this.props.recipe;
		const { token } = this.props.user;
		value ? this.props.addFavorite(id, token) : this.props.removeFavorite(id, token);
	};

	handleDelete = () => {
		const { token } = this.props.user;
		this.props.deleteRecipe(token, this.props.recipe.id, this.props.history);
	};

	renderContent() {
		const { user, recipe, classes } = this.props;
		if (recipe) {
			return (
				<GridContainer>
					<GridItem xs={12} style={{ textAlign: 'center' }}>
						<Typography  variant="display3" style={{color: 'white', textShadow: '2px 2px #000000'}}>
							{this.props.recipe.title}
						</Typography>
					</GridItem>
					<GridItem xs={6}>
						{user.token && <FavoriteButton style={{margin: '0 5%'}} favorited={isFavorite(user, recipe)} onFavorite={this.handleFavorite} />}
					</GridItem>
					<GridItem xs={6} style={{ textAlign: 'right' }}>
						<ActionMenu
							recipeId={recipe.id}
							isOwner={isOwner(user, recipe)}
							onDelete={this.handleDelete}
						/>
					</GridItem>
					<GridItem xs={12} sm={6}>
						<Paper className={classes.paper} style={{ marginBottom: 16 }}>
							<Typography variant="title" color="inherit">
								Description
							</Typography>
							<Typography variant="headline">{recipe.description}</Typography>
						</Paper>
						<IngredientList ingredients={recipe.ingredients} />
					</GridItem>
					<GridItem xs={12} sm={6}>
						<DirectionList directions={recipe.directions} />
					</GridItem>
					<GridItem xs={6} style={{ textAlign: 'right' }}>
						{/* <Typography variant="subheading">{recipe.views} Views</Typography> */}
					</GridItem>
				</GridContainer>
			);
		}
		else if (recipe === null) 
			return <Loading />;
		else
			return	<div>Not found</div>
	}

	render() {
		const { classes } = this.props;
		return <div className={classes.root}>{this.renderContent()}</div>;
	}
}

function mapStateToProps({ auth, recipes }) {
	return {
		recipe: recipes.active,
		user: auth
	};
}

export default connect(mapStateToProps, actions)(withRouter(withStyles(recipeViewStyle)(RecipeView)));
