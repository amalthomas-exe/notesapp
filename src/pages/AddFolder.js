import React, { useState, useContext } from 'react'
import noteContext from '../context/noteContext';
import { View, Text,TextInput, TouchableWithoutFeedback } from 'react-native'
import { addFolder } from '../services/db-service';

const AddFolder = () => {
    const { theme } = useContext(noteContext);

    const [folder, setFolder] = useState({
        name: "",
        color: "#87CCA6",
    })
    return (

        <TouchableWithoutFeedback
            onPress={() => {
                navigation.goBack();
            }}
        >
            <View style={{
                flex: 1,
                backgroundColor: theme === "light" ? 'rgba(255,255,255,0.9)' : "#000000DF",
                paddingVertical: 100,
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Text style={{
                    fontSize: 18,
                    color: theme === "light" ? '#000' : '#fff',
                    marginLeft: 15,
                }}>Name</Text>
                <TextInput
                    style={{
                        fontSize: 18,
                        color: theme === "light" ? '#000' : '#fff',
                        marginLeft: 15,
                    }}
                    placeholder="Folder name"
                    placeholderTextColor={theme === "light" ? '#000' : '#fff'}
                    onChangeText={(text) => {
                        setFolder({
                            ...folder,
                            name: text
                        })
                    }
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddFolder