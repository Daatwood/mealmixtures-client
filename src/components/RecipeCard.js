import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardActions, CardContent, Typography, Button } from '@material-ui/core';

import FavoriteButton from './FavoriteButton';
import ActionMenu from './ActionMenu';

const styles = (theme) => ({
	card: {
		width: 345
	},
	actions: {
		display: 'flex'
	},
	button: {
		margin: theme.spacing.unit
	}
});

class RecipeCard extends Component {
	handleFavorite = (value) => {
		const { id } = this.props;
		value ? this.props.addFavorite(id) : this.props.removeFavorite(id);
	};

	render() {
		const { classes, id, title, description, isOwner, onDelete, favorited } = this.props;
		return (
			<Card className={classes.card}>
				<CardHeader
					action={<FavoriteButton favorited={favorited} onFavorite={this.handleFavorite} />}
					title={
						<Typography variant="headline" color="primary" component={Link} to={`/recipes/${id}`}>
							{title}
						</Typography>
					}
					// subheader={new Date(dateUpdated).toLocaleDateString('en-US', {
					// 	month: 'long',
					// 	day: 'numeric',
					// 	year: 'numeric'
					// })}
				/>
				<CardContent>
					<Typography variant="body1">{description}</Typography>
				</CardContent>
				<CardActions disableActionSpacing className={classes.actions}>
					<ActionMenu recipeId={id} isOwner={isOwner} onDelete={onDelete} />
					<Button
						className={classes.button}
						variant="raised"
						color="secondary"
						component={Link}
						to={`/recipes/${id}`}
						aria-label="View"
						style={{ marginLeft: 'auto', color: 'white' }}>
						Open
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(RecipeCard);
