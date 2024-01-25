import noteContext from "./noteContext";
import { useState } from "react";
import { Appearance } from "react-native";
import { MMKVLoader,useMMKVStorage } from "react-native-mmkv-storage";

const storage = new MMKVLoader().initialize();

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const [folders, addFolders] = useState([])
    const [masterNotes, setMasterNotes] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const colors = [
        "#87CCA6",
        "#F7C59F",
        "#F8BABC",
        "#DAEEA2",
        "#9DC6E9",
        "#BBE78E",
        "#DA9672",
        "#C19BFF"
    ]
    const [currentTab, setCurrentTab] = useState(0);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [theme, setTheme] = useMMKVStorage("theme",storage,Appearance.getColorScheme());

    handleThemeChange = () => {
        if(theme==="dark"){
            setTheme("light")

        }else{
            setTheme("dark")
        }
    }
    return (
        <noteContext.Provider value={{
            colors,
            notes,
            setNotes,
            refreshing,
            setRefreshing,
            currentTab,
            setCurrentTab,
            masterNotes,
            setMasterNotes,
            isFirstLoad,
            setIsFirstLoad,
            theme,
            setTheme,
            folders,
            addFolders,
        }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState