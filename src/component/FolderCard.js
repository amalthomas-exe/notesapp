import React, { useContext ,useState} from 'react'
import { View, Text, ImageBackground, TouchableNativeFeedback } from 'react-native'
import { useNavigation ,useRoute} from '@react-navigation/native'
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
import Animated,{ZoomIn} from 'react-native-reanimated'


const FolderCard = (props) => {
    const { folder,dimension,index } = props
    const { theme, colors } = useContext(noteContext)
    const [isElevated, setisElevated] = useState(false)

    const navigation = useNavigation()
    const route = useRoute()

    return (
        <Animated.View
            sharedTransitionTag={`tag${folder.id}`}
            entering={route.name==="Home"?ZoomIn.delay(index*75):null}
        >
            <TouchableNativeFeedback
                onPress={() => {
                    if(route.name==="Home"){
                        console.log('folder', folder)
                    }
                    
                }}

                onLongPress={() => {
                    navigation.navigate('OpenContextMenuFolder', {folder:folder})
                }}

                delayLongPress={200}

            >
                <ImageBackground
                    source={
                        folder.color === "#87CCA6" ? folder_87CCA6 :
                            folder.color === "#F7C59F" ? folder_F7C59F :
                                folder.color === "#F8BABC" ? folder_F8BABC :
                                    folder.color === "#DAEEA2" ? folder_DAEEA2 :
                                        folder.color === "#9DC6E9" ? folder_9DC6E9 :
                                            folder.color === "#BBE78E" ? folder_BBE78E :
                                                folder.color === "#DA9672" ? folder_DA9672 :
                                                    folder.color === "#C19BFF" ? folder_C19BFF :
                                                        folder_FFCA28
                    }
                    style={{
                        width: dimension,
                        height: dimension,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}

                    imageStyle={{
                        resizeMode: 'contain',
                    }}
                >
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            color: '#000000DE',
                            fontSize: route.name==="AddMoveToFolder"? 12: 16,
                            fontWeight: '600',

                        }}>{folder.name}</Text>
                    </View>
                </ImageBackground >

            </TouchableNativeFeedback>
        </Animated.View>

    )
}

export default FolderCard