import RecipeNew from '../views/RecipeNew';
import RecipeView from '../views/RecipeView';
import RecipeEdit from '../views/RecipeEdit';
import Dashboard from '../views/Dashboard';
import Landing from '../views/Landing';
import Login from '../views/Login';
import Favorites from '../views/Favorites';
import ProviderView from '../views/ProviderView';
import TestView from '../views/TestView';

// Paths for testing components
import Loading from '../components/Loading';

const routes = [
	{ path: '/', name: 'Home', component: Landing, fuzzy: false },
	{ path: '/recipe/new', name: 'New Recipe', component: RecipeNew },
	{ path: '/dashboard', name: 'Your Recipes', component: Dashboard },
	{ path: '/favorites', name: 'Favorites', component: Favorites },
	{ path: '/recipes', name: 'Recipes', component: Dashboard },
	{ path: '/recipes/:id', name: 'View Recipe', component: RecipeView },
	{ path: '/recipes/:id/edit', name: 'Edit Recipe', component: RecipeEdit },
	{ path: '/loading', name: 'Loading', component: Loading },
	{ path: '/login', name: 'Login', component: Login },
	{ path: '/auth/:provider/code', name: 'Provider', component: ProviderView, fuzzy: true },
	{ path: '/test', name: 'TEST', component: TestView },
];

export default routes;
