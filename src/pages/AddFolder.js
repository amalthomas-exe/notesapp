import React, { useState, useContext } from 'react'
import noteContext from '../context/noteContext';
import { View, Text, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { addFolderToDB,getDBConnection } from '../services/db-service';
import FolderCard from '../component/FolderCard';

const AddFolder = ({ navigation }) => {
    const { theme, colors,folders,addFolders } = useContext(noteContext);

    const [folder, setFolder] = useState({
        name: "",
        color: "#FFCA28",
        created_at: "",
        updated_at: "",
    })


    const handleAddEditFolder =async  () => {
        const db = await getDBConnection();
        if(folder.name==""){
            alert("Please enter folder name")
            return;
        }
        const date = new Date().toISOString();
        const folderData = {
            ...folder,
            created_at: date,
            updated_at: date,
        }
        console.log(folderData)
        const result = await addFolderToDB(db, "folders", folderData);
        console.log(result[0].insertId);
        const newFolder = {
            ...folderData,
            id:result[0].insertId,
            noteCount:0,
            isHidden:0,
            isLocked:0,
            isRecycled:0,
            password:null,
        }
        addFolders([...folders,newFolder]);   
        navigation.goBack();
    }
    return (

        <KeyboardAvoidingView style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
                backgroundColor: theme === "light" ? 'rgba(255,255,255,0.95)' : "#000000EF",
                paddingTop: 100,
                paddingBottom: 20,
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <FolderCard folder={folder} dimension={160} />
                    </View>
                    <TextInput
                        style={{
                            fontSize: 18,
                            color: theme === "light" ? '#000' : '#fff',
                            borderRadius: 7,
                            backgroundColor: theme === "light" ? '#0000001D' : '#ffffff1D',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            marginTop: 20,
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: theme === "light" ? '#0000001D' : '#ffffff1D',

                        }}
                        placeholder="Folder name"
                        placeholderTextColor={theme === "light" ? '#000000AE' : '#ffffffAE'}
                        onChangeText={(text) => {
                            setFolder({
                                ...folder,
                                name: text
                            })
                        }
                        }
                    />
                    <Text style={{
                        marginTop: 20,
                        fontSize: 16,
                        color: theme == "dark" ? 'rgba(180, 180, 180, 1)' : 'rgba(0, 0, 0, 0.5)',
                    }}>Folder Color</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity style={{
                            width: 35,
                            height: 35,
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderColor: ("#FFCA28" == folder.color) ? "green" : "#FFCA28",
                            borderRadius: 10,
                            backgroundColor: "#FFCA28",
                            marginRight: 20,
                        }}
                            onPress={() => {
                                setFolder({
                                    ...folder,
                                    color: "#FFCA28"
                                })
                            }}
                        />
                        {
                            colors.map((color, index) => {
                                return (
                                    <TouchableOpacity style={{
                                        width: 35,
                                        height: 35,
                                        borderStyle: 'solid',
                                        borderWidth: 2,
                                        borderColor: (color == folder.color) ? "green" : color,
                                        borderRadius: 10,
                                        backgroundColor: color,
                                        marginRight: 20,
                                    }}
                                        onPress={() => {
                                            setFolder({
                                                ...folder,
                                                color: color
                                            })
                                        }}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor:theme==="light"?"#0000002D":"#ffffff2D",
                            paddingVertical: 10,
                            borderRadius: 7,
                        }}
                        onPress={() => {
                            handleAddEditFolder();
                        }}
                    >
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: theme === "light" ? '#000' : '#fff',
                        }}>Create Folder</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default AddFolder