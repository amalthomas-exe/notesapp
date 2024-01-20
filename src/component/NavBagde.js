import React,{useContext,memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import noteContext from '../context/noteContext';

const NavBagde = ({ label, highlighted,onPress,index }) => {
    const {setCurrentTab} = useContext(noteContext);
    return (
            <TouchableOpacity 
                style={highlighted ? styles.highlightedBadgeStyle : styles.normalBadgeStyle}
                onPress={()=>{
                    onPress()
                    setCurrentTab(index);
                }}
            >
                <Text style={highlighted ? styles.highlightedBadgeText : styles.normalBadgeText}>
                    {label}
                </Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    highlightedBadgeStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(78, 78, 78, 1)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "rgba(78, 78, 78, 1)",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10
    },
    normalBadgeStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(204, 204, 204, 1)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10
    },
    normalBadgeText: {
        fontSize: 15,
        color: "rgba(104, 104, 104, 1)"
    },

    highlightedBadgeText: {
        fontSize: 15,
        color: "#fff"
    }
})


export default memo(NavBagde)