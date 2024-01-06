import React from 'react'
import NoteState from './src/context/NoteState'
import AddNotePage from './src/pages/AddNotePage'
import HomePage from './src/pages/HomePage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NoteState>
      <GestureHandlerRootView style={{
        flex: 1,
      
      }}>
        <StatusBar translucent={true} backgroundColor={'rgba(255,255,255,0)'} barStyle={'dark-content'}/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomePage} options={{
              headerShown: false,
              animation: 'slide_from_left',
            }} />
            <Stack.Screen name="AddNote" component={AddNotePage} options={{
              headerShown: false,
              animation: 'slide_from_right',
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </NoteState>

  )
}

export default App