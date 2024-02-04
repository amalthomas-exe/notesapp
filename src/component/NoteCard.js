import React, { memo, useContext, useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Pressable, TouchableNativeFeedback, Dimensions, Vibration } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getDBConnection, deleteNote, addLikedNote, deleteLikedNote } from '../services/db-service';
import noteContext from '../context/noteContext';
import Animated, { useSharedValue, withTiming, withSpring, Easing, ReduceMotion, SlideInRight, SharedTransition, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';

const NoteCard = ({
    note,
    index,
    openContextMenu,
    closeContextMenu,
}) => {
    const ScreenWidth = Dimensions.get("window").width;
    const { id, title, content, category, updated_at, isLiked,isLocked } = note;
    const { notes, setNotes, colors, currentTab, setRefreshing, masterNotes, setMasterNotes } = useContext(noteContext);
    const [liked, setLiked] = useState(isLiked == 1);
    const isMounted = useRef(false);
    const navigation = useNavigation();
    const route = useRoute();
    const biometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

    const handleBiometric = async () => {
        const { available, biometryType } = await biometrics.isSensorAvailable();
        console.log(available, biometryType);
        if(available){
            const { success, error } = await biometrics.simplePrompt({promptMessage: 'Confirm your identity'});
            if(success){
                navigation.navigate("AddNote", { note: note })
            }
            else{
                console.log(error);
            }
            
        }
    }
    
    


    useEffect(() => {
        if (isMounted.current) {
            console.log("Liked changed")
            handleLikedNote(id)
        }
        else {
            isMounted.current = true;
        }
    }, [liked])

    const handleDeleteNote = async (id) => {
        //const db = await getDBConnection();
        //const result = await deleteNote(db, "notes", id);
        //console.log(result);
        const newNotes = notes.filter((note) => note.id !== id);
        const masterNewNotes = masterNotes.filter((note) => note.id !== id);
        console.log(masterNewNotes);
        setNotes(newNotes);
        setMasterNotes(masterNewNotes);
    }

    const handleLikedNote = async (id) => {
        const db = await getDBConnection();
        if (!liked) {
            await deleteLikedNote(db, "notes", id);
            if (currentTab == 1) {
                const newNotes = notes.filter((note) => note.id !== id);
                const masterNewNotes = masterNotes.map((note) => {
                    if (note.id == id) {
                        note.isLiked = 0;
                    }
                    return note;
                });
                setNotes(newNotes);
                setMasterNotes(masterNewNotes);
                return;
            }
            else {
                const newNotes = notes.map((note) => {
                    if (note.id == id) {
                        note.isLiked = 0;
                    }
                    return note;
                });
                const masterNewNotes = masterNotes.map((note) => {
                    if (note.id == id) {
                        note.isLiked = 0;
                    }
                    return note;
                });
                setNotes(newNotes);
                setMasterNotes(masterNewNotes);
                return;
            }
        } else {
            await addLikedNote(db, "notes", id);
            const newNotes = notes.map((note) => {
                if (note.id == id) {
                    note.isLiked = 1;
                }
                return note;
            });
            const masterNewNotes = masterNotes.map((note) => {
                if (note.id == id) {
                    note.isLiked = 1;
                }
                return note;
            });
            setNotes(newNotes);
            setMasterNotes(masterNewNotes);
            return;
        }

    }

    //function to reduce a string to only 50 characters and trailing with ...
    const reduceString = (str) => {
        if (str.length > 50) {
            return str.slice(0, 50) + "...";
        }
        return str;
    }

    const convertDateTimeToUndertsandable = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = (d.getHours() > 12) ? d.getHours() - 12 : d.getHours();
        const minute = d.getMinutes();
        return `${day}/${month}/${year} at ${((hour < 10) ? "0" : "") + hour}:${((minute < 10) ? "0" : "") + minute} ${d.getHours() >= 12 ? "PM" : "AM"}`;
    }

    return (
        <TouchableNativeFeedback
            onPress={() => {
                if(isLocked==1){
                    handleBiometric();
                }
                else{
                    navigation.navigate("AddNote", { note: note })
                }
                
            }}
            onLongPress={() => {
                if (route.name === "Home") {
                    console.log("Long pressed")
                    navigation.navigate("OpenContextMenuModal", { note: note, index: index })

                    Vibration.vibrate(100);
                    openContextMenu();
                }
            }}

            delayLongPress={150}
        >
            <Animated.View style={{
                elevation: 2,
                position: 'relative',
                display: 'flex',
                minHeight: 200,
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 0,
                padding: 20,
                borderRadius: 15,
                backgroundColor: colors[id % colors.length]
            }}
            >
                <View style={{
                    flexDirection: 'column',
                    width: '75%',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            {
                                isLocked==1?<AntDesign name="lock" size={20} color="rgba(80, 80, 80, 1)" />:null
                            }
                            <Text style={{
                                fontSize: 18,
                                marginLeft: 5,
                                fontWeight: '800',
                                color: "rgba(80, 80, 80, 1)"
                            }}>
                                {category}
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 22,
                            marginTop: 5,
                            fontWeight: '800',
                            color: "rgba(40, 40, 40, 1)"
                        }}>
                            {title}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            marginTop: 5,
                            color: "rgba(60, 60, 60, 1)",
                        }}>
                            {reduceString(content) + " "}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: "#fff",
                        //padding:5,
                        borderRadius: 15,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginTop: 15
                    }}>
                        <AntDesign name="clockcircleo" size={13} color="black" />
                        <Text style={{
                            fontSize: 13,
                            marginLeft: 10,
                            color: "rgba(60, 60, 60, 1)",
                            fontWeight: '600'
                        }}>
                            {convertDateTimeToUndertsandable(updated_at)}
                        </Text>
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: "#fff",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            elevation: 10,
                            marginBottom: 8
                        }}
                            onPress={() => {
                                setLiked(!liked);
                            }}
                        >
                            {liked ? <AntDesign name="heart" size={20} color="red" /> : <AntDesign name="hearto" size={20} color="black" />}
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: "#fff",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 10,
                            borderRadius: 50,
                        }}
                            onPress={() => {
                                handleDeleteNote(id)
                            }}
                        >
                            <AntDesign name="delete" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: `rgba(40,40,40,0.2)`,
                        width: 50,
                        height: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [
                            { rotate: '45deg' }
                        ],
                        borderRadius: 50,
                        position: 'absolute',
                        bottom: 0
                    }}>
                        <AntDesign name="arrowup" size={40} color="#fff" />
                    </View>
                </View>
            </Animated.View>
        </TouchableNativeFeedback >
    )
}

export default memo(NoteCard)