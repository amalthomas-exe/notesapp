import React, { useContext } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import noteContext from '../context/noteContext'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FolderCard from '../component/FolderCard';
import { getDBConnection,deleteFolders } from '../services/db-service';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OpenContextMenuFolder = ({ navigation, route }) => {
    const { theme,folders,addFolders } = useContext(noteContext);
    const { folder } = route.params;

    const handleDeleteFolder = async () => {
        console.log('this');
        const db = await getDBConnection();
        await deleteFolders(db,"folders",folder.id);
        const newFolders = folders.filter(f=>f.id!==folder.id);
        addFolders(newFolders);
        navigation.goBack();
    }
    return (
            <View style={{
                flex: 1,
                backgroundColor: theme === "light" ? 'rgba(255,255,255,0.9)' : "#000000DF",
                paddingVertical: 100,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <FolderCard folder={folder} color={folder.color} dimension={160}/>
                </View>
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
                        handleDeleteFolder();
                    }}
                    >
                        <AntDesign name="delete" size={20} color={theme === "light" ? '#000' : '#fff'} />
                        <Text style={{
                            fontSize: 18,
                            color: theme === "light" ? '#000' : '#fff',
                            marginLeft: 15,
                        }}>Delete folder</Text>
                    </TouchableOpacity>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        //backgroundColor: 'rgba(0,0,0,0.3)',
                        paddingHorizontal: 10,
                        marginTop: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <FontAwesome6 name="eye-slash" size={20} color={theme === "light" ? '#000' : '#fff'} />
                        <Text style={{
                            fontSize: 18,
                            color: theme === "light" ? '#000' : '#fff',
                            marginLeft: 15,
                        }}>Hide folder</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        //backgroundColor: 'rgba(0,0,0,0.3)',
                        paddingHorizontal: 10,
                        marginTop: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <FontAwesome6 name="lock" size={20} color={theme === "light" ? '#000' : '#fff'} />
                        <Text style={{
                            fontSize: 18,
                            color: theme === "light" ? '#000' : '#fff',
                            marginLeft: 15,
                        }}>Lock with password</Text>
                    </View>
                </View>
            </View>
    )
}

export default OpenContextMenuFolder