import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack';
import Kontakti from './Components/Kontakti'

const Tab = createNativeStackNavigator();


export default function App() {
  return (
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="Kontakti" component={Kontakti} />
  </Tab.Navigator>
</NavigationContainer>
  );
};
