import AsyncStorage from '@react-native-community/async-storage';
import Reactotron, {trackGlobalErrors} from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({name: 'DevBarber'}) // controls connection & communication settings
  .useReactNative(trackGlobalErrors()) // add all built-in react native plugins
  .connect(); // let's connect!
