import React, { useEffect, useCallback, useState, useContext } from 'react'
import noteContext from "../context/noteContext";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Animated,{LinearTransition} from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getDBConnection, getNotes, createTable } from '../services/db-service'
import NavBadge from '../component/NavBagde'
import NoteCard from '../component/NoteCard'
import { FlatList } from 'react-native-gesture-handler';


const HomePage = ({ navigation }) => {
    const { notes, setNotes,refreshing,setRefreshing } = useContext(noteContext);
    console.log("Home built")
    const loaddDataCallBack = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTable(db, "notes");
            const notes = await getNotes(db, "notes");
            if (notes.length) {
                setNotes(notes);
            }
            else {
                console.log("no notes saved")
            }
        } catch (e) {
            console.log("Error from useState", e);
        }
    }, [])

    useEffect(() => {
        loaddDataCallBack();
    }, [loaddDataCallBack])

    useEffect(()=>{
        if(refreshing){
            setNotes(notes);
            setRefreshing(false)
        }
    },[refreshing])

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 40,
        }}>
            <View style={{
                paddingHorizontal: 20,
            
            }}>
                <Text style={{
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#000',
                }}>My notes</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: '#000',
                    }}>Sort by</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#000',
                            marginRight: 10,
                        }}>Date</Text>
                        <AntDesign name="arrowdown" size={15} color="#000" />
                    </View>

                </View>
                <View style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    marginTop: 20,
                }} />
                <View style={{
                    marginTop: 10
                }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <NavBadge label="All" highlighted={true} />
                        <NavBadge label="Favourite" highlighted={false} />
                        <NavBadge label="To-do" highlighted={false} />
                        <NavBadge label="Ideas" highlighted={false} />
                        <NavBadge label="Others" highlighted={false} />
                    </ScrollView>
                </View>
            </View>
            <View style={{
                marginTop: 10,
                height: '100%',
                paddingLeft: 20,
            }}>{
                    notes.length == 0 ? <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80%'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: 'rgba(60, 60, 60, 1)',
                        }}>No notes</Text>
                    </View> :
                        <Animated.FlatList
                            //itemLayoutAnimation={LinearTransition.duration(400)}
                            estimatedItemSize={200}
                            itemLayoutAnimation={LinearTransition.duration(400)}
                            data={notes}
                            renderItem={({ item,index }) => <View>
                                <NoteCard note={item} index={index}/>
                                {(notes.indexOf(item) == notes.length - 1) ? <View style={{
                                    height: 200,
                                }} /> : null}
                            </View>}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />}
            </View>
            <View style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'row',
                bottom: 30,
                left: '30%',
                backgroundColor: 'rgba(78, 78, 78, 0.9)',
                borderRadius: 50,
                paddingHorizontal: 10,
                paddingVertical: 5
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 50,
                    backgroundColor: 'rgba(160, 160, 160, 1)'
                }}>
                    <AntDesign name="search1" size={30} color="#fff" />
                </View>
                <TouchableOpacity style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 50,
                    marginHorizontal: 10,
                    backgroundColor: "rgba(105, 173, 102, 1)",
                }}
                    onPress={() => {
                        navigation.navigate('AddNote')
                    }}
                >
                    <AntDesign name="plus" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 50,
                    backgroundColor: 'rgba(160, 160, 160, 1)'
                }}>
                    <AntDesign name="setting" size={30} color="#fff" />
                </View>
            </View>
        </View>
    )
}

export default HomePage