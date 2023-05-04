import {SafeAreaView, StatusBar} from 'react-native';
import Home from './views/Home';
import ImageDetectorView from './views/ImageDetectorView';
import Login from './views/Login';
import SignUp from './views/Register';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';


const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
      {/* < ImageDetectorView /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="image-detect" component={ImageDetectorView} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
