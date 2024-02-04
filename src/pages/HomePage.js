import React, { useEffect, useCallback, useState, useContext, memo, useRef } from 'react'
import noteContext from "../context/noteContext";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StatusBar, KeyboardAvoidingView } from 'react-native'
import Animated, { ColorSpace, LinearTransition, useSharedValue, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getDBConnection, getNotes, createNotesTable, createFolderTable, getFolders } from '../services/db-service'
import NavBadge from '../component/NavBagde'
import NoteCardContainer from '../component/NoteCardContainer';
import FolderCard from '../component/FolderCard';


const HomePage = ({ navigation }) => {
    const { notes, setNotes, refreshing, setRefreshing, currentTab, masterNotes, setMasterNotes, theme, folders, addFolders } = useContext(noteContext);
    const [isAndButtonExpanded, setIsAndButtonExpanded] = useState(false);
    const topBarHeight = useSharedValue(40);
    const topBarOpacity = useSharedValue(1);

    const addButtonWidth = useSharedValue(50);
    const addButtonHeight = useSharedValue(50);

    console.log("Home built")
    const navItems = [
        {
            label: "All",
            onPress: () => {
                loadAllNotes();
            }
        },
        {
            label: "Favourite",
            onPress: () => {
                loadLikedNotes();
            }
        }, {
            label: "Folders",
            onPress: () => {}
        },
    ]
    const loaddDataCallBack = useCallback(async () => {
        if (currentTab == 0) {
            try {
                const db = await getDBConnection();
                await createNotesTable(db);
                await createFolderTable(db);
                const notesFromDB = await getNotes(db, "notes");
                const foldersFromDB = await getFolders(db, "folders");
                if (notesFromDB.length) {
                    setNotes(notesFromDB);
                    setMasterNotes(notesFromDB);
                }
                else {
                    console.log("no notes saved")
                }
                if (foldersFromDB.length) {
                    console.log("Folders", foldersFromDB)
                    addFolders(foldersFromDB);
                } else {
                    console.log("No folders")
                }
            } catch (e) {
                console.log("Error from useState", e);
            }
        }
    }, [])


    useEffect(() => {
        loaddDataCallBack();
        console.log("Home mounted")
    }, [loaddDataCallBack])

    useEffect(() => {
        if (refreshing) {
            console.log("Refreshing")
            setNotes(notes);
            setRefreshing(false)
        }
    }, [refreshing])

    const loadAllNotes = useCallback(async () => {
        try {
            console.log("Loadign all notes")
            setNotes(masterNotes)
        } catch (e) {
            console.log("Error from loadAllNotes", e)
        }
    }, [masterNotes])

    const loadLikedNotes = useCallback(async () => {
        try {
            const likedNotes = masterNotes.filter((note) => note.isLiked == 1);
            console.log("Liked notes", likedNotes.length, likedNotes)
            setNotes(likedNotes);
        } catch (e) {
            console.log("Error from loadLikedNotes", e)
        }
    }, [masterNotes])

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        if (scrollPosition > 150) {
            topBarHeight.value = withTiming(0, { duration: 100 });
            topBarOpacity.value = withTiming(0, { duration: 100 });
        } else {
            topBarHeight.value = withTiming(60, { duration: 100 });
            topBarOpacity.value = withTiming(1, { duration: 100 });
        }
    }
    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            backgroundColor: (theme === "light") ? 'rgba(230, 228, 228, 1)' : "rgba(30, 30, 30, 1)",
            paddingTop: 40,
        }}
        >
            <StatusBar translucent={true} backgroundColor={'rgba(255,255,255,0)'} barStyle={theme === "light" ? 'dark-content' : 'light-content'} />
            <View style={{

            }}>
                <Animated.Text style={{
                    fontSize: 30,
                    height: topBarHeight,
                    textAlign: 'center',
                    fontWeight: '500',
                    color: theme === "light" ? '#000' : '#fff',
                    opacity: topBarOpacity,
                }}>My notes</Animated.Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: theme === "light" ? '#000' : '#fff',
                    }}>Sort by</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: theme === "light" ? '#000' : '#fff',
                            marginRight: 10,
                        }}>Date</Text>
                        <AntDesign name="arrowdown" size={15} color={theme === "light" ? '#000' : '#fff'} />
                    </View>

                </View>
                <View style={{
                    width: "90%",
                    height: 1,
                    backgroundColor: theme === "light" ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
                    marginTop: 20,
                    alignSelf: 'center',
                }} />
                <View style={{
                    marginTop: 10
                }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEnabled={false}>
                        {
                            navItems.map((item, index) => {
                                return <NavBadge label={item.label} highlighted={(currentTab == (index))} onPress={item.onPress} key={index} index={index} />
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={{
                marginTop: 10,
                height: '100%',
            }}>{
                    (currentTab != 2) ? notes.length == 0 ? <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80%'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: theme === "light" ? 'rgba(60, 60, 60, 1)' : "#fff",
                        }}>No notes</Text>
                    </View> :
                        <FlatList
                            //itemLayoutAnimation={LinearTransition.duration(400)}
                            data={notes}
                            onScroll={handleScroll}
                            renderItem={({ item, index }) => <View>
                                <NoteCardContainer note={item} index={index} />
                                {(notes.indexOf(item) == notes.length - 1) ? <View style={{
                                    height: 200,
                                }} /> : null}
                            </View>}
                            showsVerticalScrollIndicator={false}
                        /> : folders.length == 0 ? <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '80%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '500',
                                color: theme === "light" ? 'rgba(60, 60, 60, 1)' : "#fff",
                            }}>No folders</Text>
                        </View> :
                        <FlatList
                            //itemLayoutAnimation={LinearTransition.duration(400)}
                            data={folders}
                            onScroll={handleScroll}
                            numColumns={2}
                            key={folders.length}
                            contentContainerStyle={{
                                paddingHorizontal: 20,
                                marginTop: 10,
                            }}
                            columnWrapperStyle={{
                                justifyContent: 'space-between',
                            }}
                            renderItem={({ item ,index}) => <View>
                                <FolderCard folder={item} color={item.color?item.color:"#FFCA28"} key={item.id} dimension={160} index={index}/>
                                {(folders.indexOf(item) == folders.length - 1) ? <View style={{
                                    height: 200,
                                }} /> : null}
                            </View>}
                            showsVerticalScrollIndicator={false}
                        />

                }
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View style={{
                    backgroundColor: 'rgba(78, 78, 78, 0.9)',
                    width: 'auto',
                    borderRadius: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 10
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
                    <TouchableOpacity
                        onPress={() => {
                            if (!isAndButtonExpanded) {
                                if(currentTab!=2){
                                    navigation.navigate('AddNote')
                                }
                                else{
                                    console.log("Add folder")
                                    navigation.navigate('AddFolder')
                                }
                            }
                            else {

                                addButtonWidth.value = withTiming(50, { duration: 200 });
                                setIsAndButtonExpanded(false);
                            }

                        }}

                        onLongPress={() => {
                            addButtonWidth.value = withTiming(150, { duration: 200 });
                            setIsAndButtonExpanded(true);
                        }}

                        delayLongPress={50}
                    >
                        <Animated.View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: addButtonWidth,
                            justifyContent: 'center',
                            padding: 10,
                            borderRadius: 50,
                            marginHorizontal: 10,
                            backgroundColor: "rgba(105, 173, 102, 1)",
                        }}
                        >
                            {(!isAndButtonExpanded) ? <AntDesign name={currentTab != 2 ? "plus" : "addfolder"} size={30} color="#fff" /> :
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    paddingHorizontal: 10,
                                    justifyContent: 'space-between',
                                }}>
                                    <TouchableOpacity style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderStyle: 'solid',
                                        width: 40,
                                        height: 40,
                                        borderWidth: 1,
                                        borderRadius: 50,
                                        borderColor: '#ffffff9E',
                                    }}

                                        onPress={() => {
                                            navigation.navigate('AddNote')
                                            addButtonWidth.value = withTiming(50, { duration: 200 });
                                            setIsAndButtonExpanded(false);
                                        }}
                                    >
                                        <AntDesign name="plus" size={25} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderStyle: 'solid',
                                        width: 40,
                                        height: 40,
                                        borderWidth: 1,
                                        borderRadius: 50,
                                        borderColor: '#ffffff9E',
                                    }}
                                        onPressOut={() => {
                                            console.log("Add folder")
                                            navigation.navigate('AddFolder')
                                        }}
                                    >
                                        <AntDesign name="addfolder" size={25} color="#fff" />
                                    </TouchableOpacity>

                                </View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                        borderRadius: 50,
                        backgroundColor: 'rgba(160, 160, 160, 1)'
                    }}
                        onPress={() => {
                            navigation.navigate('Settings')
                        }}
                    >
                        <AntDesign name="setting" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default (HomePage)