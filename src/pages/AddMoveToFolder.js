import React, { useContext } from 'react'
import { View, Text, Button, Touchable, TouchableWithoutFeedback } from 'react-native'
import noteContext from '../context/noteContext';
import FolderCard from '../component/FolderCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDBConnection,addNoteToFolder } from '../services/db-service';

const AddMoveToFolder = ({navigation,route}) => {
    const { theme, folders,addFolders,notes,setNotes,masterNotes,setMasterNotes } = useContext(noteContext);
    const { note } = route.params;

    const handleAddNoteToFolder = async (folder_id)=>{
        console.log('note',note)
        const db = await getDBConnection();
        const results = await addNoteToFolder(db,note.id,folder_id);
        console.log('results',results);
        const newNotes = notes.map((note)=>{
            if(note.id===note.id){
                return {
                    ...note,
                    folder_id:folder_id
                }
            }
            return note;
        });
        setNotes(newNotes);
        const newMasterNotes = masterNotes.map((note)=>{
            if(note.id===note.id){
                return {
                    ...note,
                    folder_id:folder_id
                }
            }
            return note;
        });
        setMasterNotes(newMasterNotes);

        const newFolders = folders.map((folder)=>{
            if(folder.id===folder_id){
                return {
                    ...folder,
                    noteCount:folder.noteCount+1
                }
            }
            return folder;
        });
        addFolders(newFolders);

    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: theme === "light" ? 'rgba(255,255,255,0.9)' : "#000000DF",
            paddingVertical: 100,
            paddingHorizontal: 20,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>

                <FontAwesome6 name="folder-plus" size={20} color={theme === "light" ? '#000' : '#fff'} />
                <Text style={{
                    color: theme === "light" ? '#000' : '#fff',
                    fontSize: 20,
                    marginLeft: 15,
                }}>Create new folder</Text>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
            }}>
                <View style={{
                    width: "42%",
                    height: 1,
                    backgroundColor: theme === "light" ? '#0000009E' : '#ffffff9E',
                }} />
                <Text style={{
                    color: theme === "light" ? '#0000009E' : '#ffffff9E',
                    fontSize: 20,
                }}>or</Text>
                <View style={{
                    width: "42%",
                    height: 1,
                    backgroundColor: theme === "light" ? '#0000009E' : '#ffffff9E',
                }} />
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
            }}>
                <FontAwesome6 name="folder" size={20} color={theme === "light" ? '#000' : '#fff'} />
                <Text style={{
                    color: theme === "light" ? '#000' : '#fff',
                    fontSize: 20,
                    marginLeft: 15,
                }}>Move to folder</Text>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 20,
            }}>
                {
                    folders.map((folder, index) => {
                        return (
                            <TouchableOpacity

                                onPress={() => {
                                    handleAddNoteToFolder(folder.id)
                                }}
                                style={{
                                    marginLeft: index % 2 === 0 ? 0 : 20,
                                }}

                                key={index}
                            >

                                <FolderCard folder={folder} index={index} dimension={100} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default AddMoveToFolder