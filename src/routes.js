import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';


import Login from './components/Login';
import Dashboard from './components/Dashboard';

const Routes = createAppContainer(createStackNavigator({
    Login,
    Dashboard,
}));


export default Routes;