import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MyHomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Dashboard from '../screens/Dashboard';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UsersScreen from '../screens/UsersScreen';

const Router = createStackNavigator(
    {
        Homescreen: MyHomeScreen,
        Loginscreen: LoginScreen,
        Registerscreen: RegisterScreen,
        Dashboard: Dashboard,
        ForgotPasswordscreen: ForgotPasswordScreen,
        UsersScreen:UsersScreen
    },
    {
        headerMode: 'none',
    }
);

export default createAppContainer(Router);
