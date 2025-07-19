import './global.css';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tasks from 'components/Tasks';
import { useState } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {

  //State to hold tasks
  const [tasks, setTasks] = useState([])
  

  //Not needed, but using a navigator here to open up to more functionality later

  return (
    <NavigationContainer>
      <Stack.Navigator>
       
      <Stack.Screen 
          name="Tasks"
          children={(props) => <Tasks {...props} tasks={tasks} setTasks={setTasks} />}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
