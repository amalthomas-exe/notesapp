import React, { useContext } from 'react'
import NoteState from './src/context/NoteState'
import AddNotePage from './src/pages/AddNotePage'
import HomePage from './src/pages/HomePage'
import Settings from './src/pages/Settings'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import OpenContextMenuModalScreen from './src/pages/OpenContextMenuModalScreen'
import OpenContextMenuFolder from './src/pages/OpenContextMenuFolder'
import AddFolder from './src/pages/AddFolder'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NoteState>
      <GestureHandlerRootView style={{
        flex: 1,

      }}>
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
            <Stack.Screen name="Settings" component={Settings} options={{
              headerShown: false,
              animation: 'slide_from_right',
            }} />
            <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
              <Stack.Screen name="OpenContextMenuModal" component={OpenContextMenuModalScreen} options={{
                headerShown: false,
                animation: 'default',
              }} />
              <Stack.Screen name="OpenContextMenuFolder" component={OpenContextMenuFolder} options={{
                headerShown: false,
                animation: 'default',
                animationDuration: 0,
              }} />
              <Stack.Screen name="AddFolder" component={AddFolder} options={{
                headerShown: false,
                animation: 'none',
              }} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </NoteState>
  )
}

export default App
