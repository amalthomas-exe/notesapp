import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import NoteCard from './NoteCard'
import Animated, { useAnimatedStyle, useSharedValue,withTiming,ZoomIn } from 'react-native-reanimated'
import { useRoute } from '@react-navigation/native'

const NoteCardContainer = ({ note, index }) => {
    const openContextMenu = () => {
    }

    const closeContextMenu = () => {
    }

    const containerStyle = useAnimatedStyle(() => ({
        backgroundColor: `white`,
        width: '90%',
        height: 200,
        zIndex: -1,
        position: 'absolute',
        borderRadius: 20,
    }));

    return (
        <Animated.View style={{
            position: 'relative',
            zIndex: 100,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
        }}
        sharedTransitionTag={`tag${note.id}`}
        entering={(useRoute().name=="OpenContextMenuModal")?null:ZoomIn.delay(index * 75)}
        >
            <NoteCard 
                note={note}
                index={index} 
                openContextMenu={openContextMenu} 
                closeContextMenu={closeContextMenu}
            />
        </Animated.View>
    )
}

export default NoteCardContainer