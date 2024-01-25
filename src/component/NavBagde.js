import React,{useContext,memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import noteContext from '../context/noteContext';

const NavBagde = ({ label, highlighted,onPress,index }) => {
    const {setCurrentTab,theme} = useContext(noteContext);
    const styles = StyleSheet.create({
        highlightedBadgeStyle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme==="light"?'rgba(78, 78, 78, 1)':"#000",
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: theme==="light"?"rgba(78, 78, 78, 1)":'rgba(255, 255, 255, 1)',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginLeft: 10,
        },
        normalBadgeStyle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme==="light"?'rgba(204, 204, 204, 1)':"#000",
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: theme==="dark"?null:"rgba(78, 78, 78, 1)",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginLeft: 10,
        },
        normalBadgeText: {
            fontSize: 15,
            color: theme==="dark"?"rgba(184, 184, 184, 1)":"rgba(78, 78, 78, 1)"
        },
    
        highlightedBadgeText: {
            fontSize: 15,
            color: "#fff"
        }
    })
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


export default memo(NavBagde)