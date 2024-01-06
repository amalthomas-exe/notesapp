import React, { memo, useContext } from 'react'
import { View, Text, TouchableOpacity, Pressable, TouchableNativeFeedback, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getDBConnection, deleteNote } from '../services/db-service';
import noteContext from '../context/noteContext';
import Animated, { useSharedValue, withTiming, withSpring, Easing, ReduceMotion, SlideInRight, Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';




const NoteCard = ({ note, index }) => {
    const ScreenWidth = Dimensions.get("window").width;
    const { id, title, content, category, updated_at } = note;
    const { notes, setNotes,colors } = useContext(noteContext);
    const navigation = useNavigation();
    console.log(note)

    const handleDeleteNote = async (id) => {
        //  const db = await getDBConnection();
        //  const result = await deleteNote(db, "notes", id);
        //  console.log(result);
        const newNotes = notes.filter((note) => note.id !== id);
        // marginLeft.value = withTiming(marginLeft.value + ScreenWidth, {
        //     duration: 200,
        //     easing: Easing.inOut(Easing.quad),
        //     reduceMotion: ReduceMotion.System,
        //   },()=>{
        //         runOnJS(setNotes)(newNotes);
        //   })
        setNotes(newNotes);
    }

    const convertDateTimeToUndertsandable = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = (d.getHours() > 12) ? d.getHours() - 12 : d.getHours();
        const minute = d.getMinutes();
        return `${day}/${month}/${year} at ${hour}:${minute} ${d.getHours() > 12 ? "PM" : "AM"}`;
    }

    return (
        <TouchableNativeFeedback
            onPress={() => {
                navigation.navigate("AddNote", { note: note })
            }}
            onLongPress={() => {
                console.log("Long pressed")
            }}
            background={TouchableNativeFeedback.Ripple(
                `rgba(${colors[index % colors.length].red}, ${colors[index % colors.length].green}, ${colors[index % colors.length].blue}, 0.2)`,
                false
            )
            
            }
        >
            <Animated.View style={{
                marginTop: 15,
                display: 'flex',
                minHeight: 200,
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 0,
                padding: 20,
                borderRadius: 20,
                backgroundColor: `rgba(${colors[index % colors.length].red}, ${colors[index % colors.length].green}, ${colors[index % colors.length].blue}, 0.4)`,
            }}
                entering={ZoomIn.delay(index * 75)}
                exiting={ZoomOut.duration(200)}
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
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '800',
                            color: "rgba(80, 80, 80, 1)"
                        }}>
                            {category + index}
                        </Text>
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
                            {content}
                            {colors[index % colors.length].red+" "}
                            {colors[index % colors.length].green+" "}
                            {colors[index % colors.length].blue+" "}
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
                        <View style={{
                            padding: 10,
                            backgroundColor: "#fff",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            elevation: 10,
                            marginBottom: 8
                        }}>
                            <AntDesign name="hearto" size={20} color="black" />
                        </View>
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
                        backgroundColor: `rgba(${colors[index % colors.length].red}, ${colors[index % colors.length].green}, ${colors[index % colors.length].blue}, 1)`,
                        width: 50,
                        elevation: 10,
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
        </TouchableNativeFeedback>
    )
}

export default memo(NoteCard)