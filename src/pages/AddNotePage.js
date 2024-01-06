import React, { useState, useRef, useMemo, memo, useCallback, useContext, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StatusBar, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { getDBConnection, addNote, editNote } from '../services/db-service'
import noteContext from "../context/noteContext";
import { ScrollView } from 'react-native-gesture-handler'

const AddNotePage = ({ navigation, route }) => {
  const { notes, setNotes, setRefreshing, colors } = useContext(noteContext);
  const [CurrentNote, setCurrentNote] = useState({
    title: '',
    content: '',
    category: 'General',
  })
  console.log("AddNotePage")
  useEffect(() => {
    if (route.params?.note) {
      setCurrentNote(route.params.note)
    }
  }, [route.params?.note])

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
  const [pageColor, setPageColor] = useState('rgba(255, 255, 255, 0)')
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['55%'], []);

  const handleAddEditnote = async () => {
    try {
      const dateTime = new Date().toISOString();
      const db = await getDBConnection();
      if (route.params?.note) {
        const result = await editNote(db, "notes", {
          ...CurrentNote,
          updated_at: dateTime,
        });
        const editNotes = notes;
        const index = editNotes.findIndex((note) => note.id === CurrentNote.id);
        editNotes[index] = { ...CurrentNote, updated_at: dateTime };
        setNotes(editNotes);
        setRefreshing(true);
        return
      }
      const result = await addNote(db, "notes", {
        ...CurrentNote,
        created_at: dateTime,
        updated_at: dateTime,
      });
      const id = result[0].insertId;
      setNotes([...notes, { id, ...CurrentNote, created_at: dateTime, updated_at: dateTime }]);

    }
    catch (e) {
      console.log(e);
    }
  }

  const renderBackdrop = useCallback(
    props => (<BottomSheetBackdrop
      {...props}
      onPress={() => {
        setBottomSheetVisible(false)
        bottomSheetRef.current.close()
      }
      }
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
      enableTouchThrough={false}
    />
    ),
    []
  );
  return (
    <View style={{
      flex: 1,
      backgroundColor: pageColor,
      paddingHorizontal: 20,
      paddingTop: 40,
      display: 'flex',
      flexDirection: 'column',
    }}>


      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        index={-1}
        backgroundStyle={{
          backgroundColor: 'rgba(40, 40, 40, 1)',
          borderRadius: 25,
        }}

        handleIndicatorStyle={{
          backgroundColor: 'rgba(200, 200, 200, 0.7)',
          width: 50,
          height: 5,
          borderRadius: 10,
        }}

      >
        {<View style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Text style={{
            fontSize: 15,
            color: 'rgba(180, 180, 180, 1)',
          }}>Background Color</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 10,
            }}
          >
            {
              colors.map((color, index) => {
                return (
                  <TouchableOpacity style={{
                    width: 35,
                    height: 35,
                    borderRadius: 10,
                    backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue}, 1)`,
                    marginRight: 20,
                  }}
                    onPress={() => {
                      setPageColor(`rgba(${color.red}, ${color.green}, ${color.blue}, 0.3)`)
                    }}
                    key={index}
                  />
                )
              })
            }
          </ScrollView>
          <Text style={{
            fontSize: 15,
            color: 'rgba(180, 180, 180, 1)',
            marginTop: 20,
            marginBottom: 10,
          }}>Other options</Text>
          <BottomDrawerActionButton title="Note Type" currentValue="General" iconName="edit" />
          <BottomDrawerActionButton title="Set password" currentValue="Not Set" iconName="edit" />
          <BottomDrawerActionButton title="Set reminder" currentValue="Not set" iconName="edit" />
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48%',
              backgroundColor: 'rgba(63, 133, 255, 0.8)',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 15,
            }}>
              <Feather name="info" size={20} color='#fff' />
              <Text style={{
                fontSize: 18,
                color: '#fff',
                marginLeft: 10,
              }}>More details</Text>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              width: '48%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(254, 54, 54, 0.6)',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 15,
            }}>
              <Feather name="trash" size={20} color='#fff' />
              <Text style={{
                fontSize: 18,
                color: '#fff',
                marginLeft: 10,
              }}>Delete Note</Text>
            </View>
          </View>
        </View>}
      </BottomSheet>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(60, 60, 60, 1)',
          padding: 10,
          borderRadius: 50,
        }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <AntDesign name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(60, 60, 60, 1)',
            padding: 10,
            borderRadius: 50,
          }}
            onPress={handleAddEditnote}
          >
            <Ionicons name="bookmark-outline" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(60, 60, 60, 1)',
            padding: 10,
            borderRadius: 50,
            marginLeft: 10
          }}
            onPress={() => {
              setBottomSheetVisible(true)
              bottomSheetRef.current.expand()
            }}
          >
            <Feather name="more-vertical" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15,
        color: "rgba(60, 60, 60, 1)",
      }}
        placeholder='Title'
        placeholderTextColor={'rgba(60, 60, 60, 0.6)'}
        cursorColor={'rgba(60, 60, 60, 1)'}
        value={CurrentNote.title}
        onChangeText={(value) => {
          setCurrentNote({ ...CurrentNote, title: value })
        }}
      />
      <View style={{
        width: "100%",
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }} />
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
        <AntDesign name="pluscircle" size={20} color={"rgba(60, 60, 60, 0.7)"} />
        <Text style={{
          fontSize: 20,
          color: "rgba(60, 60, 60, 0.7)",
          marginLeft: 10,
        }}>Add Category</Text>
      </View>
      <View style={{
        width: "100%",
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }} />
      <TextInput style={{
        fontSize: 18,
        marginTop: 15,
        color: "rgba(60, 60, 60, 1)",
      }}
        placeholder='Start typing...'
        placeholderTextColor={'rgba(60, 60, 60, 0.6)'}
        cursorColor={'rgba(60, 60, 60, 1)'}
        multiline={true}
        value={CurrentNote.content}
        onChangeText={(value) => {
          setCurrentNote({ ...CurrentNote, content: value })
          console.log(CurrentNote);
        }}
      />
    </View>
  )
}

const BottomDrawerActionButton = memo(({ title, currentValue, iconName }) => {
  console.log("BottomDrawerActionButton")
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(60, 60, 60, 1)',
      borderRadius: 15,
      marginBottom: 15
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Feather name={iconName} size={20} color='rgba(200, 200, 200, 1)' />
        <Text style={{
          fontSize: 18,
          color: 'rgba(200, 200, 200, 1)',
          marginLeft: 10,
        }}>{title}</Text>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: 14,
          color: 'rgba(200, 200, 200, 0.7)',
          marginRight: 5,
        }}>{currentValue}</Text>
        <MaterialIcons name="arrow-forward-ios" size={12} color='rgba(200, 200, 200, 0.7)' />

      </View>

    </View>
  )
})



export default memo(AddNotePage)