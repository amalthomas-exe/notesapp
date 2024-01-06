import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const NavBagde = ({label,highlighted}) => {
    return (
        <View style={highlighted ? styles.highlightedBadgeStyle : styles.normalBadgeStyle}>
            <Text style={highlighted ? styles.highlightedBadgeText : styles.normalBadgeText}>
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    highlightedBadgeStyle:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(78, 78, 78, 1)',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:"rgba(78, 78, 78, 1)",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10
    },
    normalBadgeStyle:{
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


export default NavBagde