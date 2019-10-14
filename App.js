import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import ChatScreen from './src/ChatScreen';

const AppNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen }
},
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  }
);
const App = createAppContainer(AppNavigator);

export default App;