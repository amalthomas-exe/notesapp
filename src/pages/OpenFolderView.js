import React, { useContext, useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import noteContext from '../context/noteContext'
import { getDBConnection, getNotesOfFolder } from '../services/db-service'
import NoteCardContainer from '../component/NoteCardContainer'
import FolderCard from '../component/FolderCard'

const OpenFolderView = ({ navigation, route }) => {

    const { folder } = route.params;
    const [folderNotes, setFolderNotes] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        if (!dataLoaded) {
            loadNotesFromFolder();
            setDataLoaded(true);
        }
    }
        , [dataLoaded])

    const loadNotesFromFolder = async () => {
        const db = await getDBConnection();
        const results = await getNotesOfFolder(db, folder.id);
        console.log(results)
        setFolderNotes(results)
    }


    const { theme } = useContext(noteContext)
    return (
        <View style={{
            flex: 1,
            backgroundColor: (theme === "light") ? 'rgba(230, 228, 228, 1)' : "rgba(30, 30, 30, 1)",
            paddingTop: 40,
        }}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                padding:10
            }}>
                <Text style={{
                    fontSize:30,
                    fontWeight:'bold',
                    color:(theme==="light")?"#000":"#fff"
                }}>
                    {folder.name}
                </Text>
            </View>
            <FlatList
                //itemLayoutAnimation={LinearTransition.duration(400)}
                data={folderNotes}
                renderItem={({ item, index }) => <View>
                    <NoteCardContainer note={item} index={index} />
                    {(folderNotes.indexOf(item) == folderNotes.length - 1) ? <View style={{
                        height: 200,
                    }} /> : null}
                </View>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default OpenFolderView