import React,{useState,useContext, useEffect} from 'react'
import { View, Text, Dimensions } from 'react-native'
import NoteCard from './NoteCard'
import Animated, { SlideInRight, SlideOutRight, useAnimatedStyle, useSharedValue,withTiming,ZoomIn } from 'react-native-reanimated'
import { useRoute } from '@react-navigation/native'
import noteContext from '../context/noteContext'

const NoteCardContainer = ({ note, index }) => {

    const openContextMenu = () => {
    }

    const closeContextMenu = () => {
    }

    return (
        <Animated.View style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
        }}
        sharedTransitionTag={`tag${note.id}`}
        entering={(useRoute().name=="OpenContextMenuModal")?null:ZoomIn.delay(index * 50)}
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