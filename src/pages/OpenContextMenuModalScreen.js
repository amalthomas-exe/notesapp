import React from 'react'
import { View, Text, Button, Touchable, TouchableWithoutFeedback } from 'react-native'
import NoteCardContainer from '../component/NoteCardContainer'
import Animated from 'react-native-reanimated'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const OpenContextMenuModalScreen = ({ navigation, route }) => {
  const { note, index } = route.params;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 100,
      }}>
        <NoteCardContainer note={note} index={index} />
        <View style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 10
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            //backgroundColor: 'rgba(0,0,0,0.3)',
            paddingHorizontal: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <FontAwesome6 name="folder-plus" size={20} color="#000" />
            <Text style={{
              fontSize: 18,
              color: '#000',
              marginLeft: 15,
            }}>Add to folder</Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            //backgroundColor: 'rgba(0,0,0,0.3)',
            paddingHorizontal: 10,
            marginTop:15,
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <FontAwesome6 name="eye-slash" size={20} color="#000" />
            <Text style={{
              fontSize: 18,
              color: '#000',
              marginLeft: 15,
            }}>Hide</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default OpenContextMenuModalScreen