import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';


import Login from './components/Login';
//import Main from './components/Dashboard';

const Routes = createAppContainer(createStackNavigator({
    Login,
   // DashBoard,
}));


export default Routes;