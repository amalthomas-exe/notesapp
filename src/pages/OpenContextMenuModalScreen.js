import React, { useContext } from 'react'
import { View, Text, Button, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import NoteCardContainer from '../component/NoteCardContainer'
import noteContext from '../context/noteContext'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { getDBConnection,lockNote } from '../services/db-service';

const OpenContextMenuModalScreen = ({ navigation, route }) => {
  const { theme, folders, notes,setNotes,masterNotes,setMasterNotes,setFolders } = useContext(noteContext);
  const { note, index } = route.params;

  const handleToggleLock =  async () => {
    let db = await getDBConnection();
    let newNotes = notes.map((item)=>{
      if(item.id==note.id){
        item.isLocked = 1;
      }
      return item;
    })

    let newMasterNotes = masterNotes.map((item)=>{
      if(item.id==note.id){
        item.isLocked = 1;
      }
      return item;
    })
    await lockNote(db,note.id);
    setMasterNotes(newMasterNotes);
    setNotes(newNotes);
  }
  return (
      <View style={{
        flex: 1,
        backgroundColor: theme === "light" ? 'rgba(255,255,255,0.9)' : "#000000DF",
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
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            //backgroundColor: 'rgba(0,0,0,0.3)',
            paddingHorizontal: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
          
          onPress={()=>{
            navigation.navigate('AddMoveToFolder', {note:note})
          }}
          >
            <FontAwesome6 name="folder-plus" size={20} color={theme === "light" ? '#000' : '#fff'} />
            <Text style={{
              fontSize: 18,
              color: theme === "light" ? '#000' : '#fff',
              marginLeft: 15,
            }}>Add to folder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            //backgroundColor: 'rgba(0,0,0,0.3)',
            paddingHorizontal: 10,
            marginTop: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}
          
          onPress={()=>{
            handleToggleLock();
          }}
          >
            <FontAwesome6 name="lock" size={20} color={theme === "light" ? '#000' : '#fff'} />
            <Text style={{
              fontSize: 18,
              color: theme === "light" ? '#000' : '#fff',
              marginLeft: 15,
            }}>Lock note</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default OpenContextMenuModalScreen