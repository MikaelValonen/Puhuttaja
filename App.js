import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack';
import Puhe from './Components/Puhe'

const Tab = createNativeStackNavigator();


export default function App() {
  return (
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="Puhe" component={Puhe} />
  </Tab.Navigator>
</NavigationContainer>
  );
};
