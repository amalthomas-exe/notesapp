import React, { useContext ,useState} from 'react'
import { View, Text, ImageBackground, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import noteContext from '../context/noteContext'
import folder_9DC6E9 from '../../assets/folder-9DC6E9.png'
import folder_87CCA6 from '../../assets/folder-87CCA6.png'
import folder_BBE78E from '../../assets/folder-BBE78E.png'
import folder_C19BFF from '../../assets/folder-C19BFF.png'
import folder_DA9672 from '../../assets/folder-DA9672.png'
import folder_DAEEA2 from '../../assets/folder-DAEEA2.png'
import folder_F7C59F from '../../assets/folder-F7C59F.png'
import folder_F8BABC from '../../assets/folder-F8BABC.png'
import folder_FFCA28 from '../../assets/folder-FFCA28.png'
import Animated from 'react-native-reanimated'


const FolderCard = (props) => {
    const { folder } = props
    const { theme, colors } = useContext(noteContext)
    const [isElevated, setisElevated] = useState(false)

    const navigation = useNavigation()

    return (
        <Animated.View
            sharedTransitionTag={`tag${folder.id}`}
        >
            <TouchableNativeFeedback
                onPress={() => {
                    console.log('folder', folder)
                }}

                onLongPress={() => {
                    navigation.navigate('OpenContextMenuFolder', {folder:folder})
                }}

                delayLongPress={50}

            >
                <ImageBackground
                    source={
                        colors[folder.id % colors.length] === "#87CCA6" ? folder_87CCA6 :
                            colors[folder.id % colors.length] === "#F7C59F" ? folder_F7C59F :
                                colors[folder.id % colors.length] === "#F8BABC" ? folder_F8BABC :
                                    colors[folder.id % colors.length] === "#DAEEA2" ? folder_DAEEA2 :
                                        colors[folder.id % colors.length] === "#9DC6E9" ? folder_9DC6E9 :
                                            colors[folder.id % colors.length] === "#BBE78E" ? folder_BBE78E :
                                                colors[folder.id % colors.length] === "#DA9672" ? folder_DA9672 :
                                                    colors[folder.id % colors.length] === "#C19BFF" ? folder_C19BFF :
                                                        folder_FFCA28
                    }
                    style={{
                        width: !isElevated?180:250,
                        height: !isElevated?180:250,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View>
                        <Text style={{
                            color: '#000000DE',
                            fontSize: 20,
                            fontWeight: '700',

                        }}>{folder.name}</Text>
                    </View>
                </ImageBackground >

            </TouchableNativeFeedback>
        </Animated.View>

    )
}

export default FolderCard