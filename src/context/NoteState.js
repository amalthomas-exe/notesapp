import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const colors = [
        { "red": 102, "green": 70, "blue": 78 },
        { "red": 188, "green": 175, "blue": 156 },
        { "red": 44, "green": 110, "blue": 73 },
        { "red": 139, "green": 133, "blue": 193 },
        { "red": 255, "green": 93, "blue": 115 },
        {"red":196,"green":175, "blue":154},
        {"red":8, "green":99, "blue":117},
        {"red":255,"green": 225,"blue": 86},
        {"red":119,"green": 51, "blue":68},
        {"red":73,"green": 159,"blue": 104}
    ]
    

    return (
        <noteContext.Provider value={{
            colors,
            notes,
            setNotes,
            refreshing,
            setRefreshing
        }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState