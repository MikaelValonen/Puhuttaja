import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack';
import Ostoslista from './Components/Ostoslista'

const Tab = createNativeStackNavigator();


export default function App() {
  return (
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="Ostoslista" component={Ostoslista} />
  </Tab.Navigator>
</NavigationContainer>
  );
};
