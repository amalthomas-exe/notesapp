import React, { useState, useCallback,useContext } from 'react'
import { View, Text,Appearance } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import noteContext from '../context/noteContext'

const CustomDropDownPicker = ({name, open, setOpen, value, items, setItems, setValue, onOpen }) => {
    const {theme,setTheme} = useContext(noteContext);
    const colorScheme = Appearance.getColorScheme();
    return (
            <DropDownPicker
                style={{
                    width: 150,
                    backgroundColor: theme==="light"?'rgba(230, 228, 228, 1)':"rgba(30, 30, 30, 1)",
                    borderColor: theme==="light"?'rgba(0,0,0,0.2)':"#ffffff6E",
                    zIndex: open ? 1 : 0,
                    
                }}
                labelStyle={{
                    fontSize: 14,
                    color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                }}
                listItemLabelStyle={{
                    fontSize: 14,
                    color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                }}

                tickIconStyle={{
                    tintColor: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                }}
                ArrowDownIconComponent={() => <AntDesign name="down" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />}
                ArrowUpIconComponent={() => <AntDesign name="up" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />}
                dropDownContainerStyle={{
                    backgroundColor: theme==="light"?'rgba(230, 228, 228, 1)':"rgba(30, 30, 30, 1)",
                    borderColor: theme==="light"?'rgba(0,0,0,0.2)':'#ffffff7E',
                }}
                placeholderStyle={{
                    fontSize: 14,
                    color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                }}
                containerStyle={{
                    width: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingVertical: 0,
                }}
                onOpen={onOpen}
                open={open}
                value={value}
                onChangeValue={(value) => {
                    if(name==="theme"){
                        setTheme(value);
                    }
                }}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
    )
}

const Settings = () => {
    const {theme} = useContext(noteContext);
    const [themeOpen, setThemeOpen] = useState(false);
    const [themeValue, setThemeValue] = useState(theme);
    const [themeItems, setThemeItems] = useState([
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
    ]);
    const onThemeOpen = useCallback(() => {
        setOrderOpen(false);
        setAutoSaveOpen(false);
    }, []);

    const [orderOpen, setOrderOpen] = useState(false);
    const [orderValue, setOrderValue] = useState(null);
    const [orderItems, setOrderItems] = useState([
        { label: 'Created', value: 'created' },
        { label: 'Updated', value: 'updated' },
        { label: 'Title', value: 'title' },
        { label: 'Liked first', value: 'liked' }
    ]);

    const [autoSaveOpen, setAutoSaveOpen] = useState(false);
    const [autoSaveValue, setAutoSaveValue] = useState(null);
    const [autoSaveItems, setAutoSaveItems] = useState([
        { label: 'On', value: 'on' },
        { label: 'Off', value: 'off' },
    ]);

    const [backupOpen, setBackupOpen] = useState(false);
    const [backupValue, setBackupValue] = useState(null);
    const [backupItems, setBackupItems] = useState([
        { label: 'Every day', value: 'daily' },
        { label: 'Every week', value: 'weeekly' },
        { label: 'Every month', value: 'monthly' },
        { label: 'Never', value: 'never' }
    ]);


    return (
        <View style={{
            flex: 1,
            backgroundColor: (theme==="light")?'rgba(230, 228, 228, 1)':"rgba(30, 30, 30, 1)",
            paddingTop: 40,
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Text style={{
                fontSize: 30,
                fontWeight: '500',
                color: theme==="light"?'#000':"#fff",
                marginBottom: 40,
            }}>Settings</Text>

            <Text style={{
                fontSize: 16,
                fontWeight: '500',
                color: theme==="light"?'#0000008A':"rgba(255,255,255,0.7)",
                marginBottom: 10,
            }}>
                General
            </Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <AntDesign name="bulb1" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"
                    }}>
                        App theme
                    </Text>
                </View>
                <CustomDropDownPicker
                    name={"theme"}
                    open={themeOpen}
                    onOpen={onThemeOpen}
                    setOpen={setThemeOpen}
                    value={themeValue}
                    setValue={setThemeValue}
                    items={themeItems}
                    setItems={setThemeItems}
                />
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <FontAwesome name="sort-amount-asc" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Display order
                    </Text>
                </View>
                <CustomDropDownPicker
                    name={"order"}
                    open={orderOpen}
                    setOpen={setOrderOpen}
                    value={orderValue}
                    setValue={setOrderValue}
                    items={orderItems}
                    setItems={setOrderItems} />
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <AntDesign name="edit" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Auto save drafts
                    </Text>
                </View>
                <CustomDropDownPicker
                    name={"autoSave"}
                    open={autoSaveOpen}
                    setOpen={setAutoSaveOpen}
                    value={autoSaveValue}
                    setValue={setAutoSaveValue}
                    items={autoSaveItems}
                    setItems={setAutoSaveItems} />
            </View>
            <Text style={{
                marginTop: 30,
                fontSize: 16,
                fontWeight: '500',
                color: theme==="light"?'#0000008A':"rgba(255,255,255,0.7)",
                marginBottom: 10,
            }}>
                Backup
            </Text>
            <View style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <AntDesign name="user" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"}/>
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Linked account
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        marginRight: 10,
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Not set
                    </Text>
                    <AntDesign name="right" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                </View>
            </View>
            <View style={{
                marginTop: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <AntDesign name="cloudo" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Cloud backup
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        marginRight: 10,
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Enabled
                    </Text>
                    <AntDesign name="right" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"}/>
                </View>
            </View>
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <MaterialCommunityIcons name="backup-restore" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Automatic backup
                    </Text>
                </View>
                <CustomDropDownPicker
                    name={"backup"}
                    open={backupOpen}
                    setOpen={setBackupOpen}
                    value={backupValue}
                    setValue={setBackupValue}
                    items={backupItems}
                    setItems={setBackupItems} 
                />
            </View>
            <Text style={{
                marginTop: 30,
                fontSize: 16,
                fontWeight: '500',
                color: theme==="light"?'#0000008A':"rgba(255,255,255,0.7)",
                marginBottom: 10,
            }}>
                Security
            </Text>
            <View style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <AntDesign name="lock" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        App Lock
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        marginRight: 10,
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Not set
                    </Text>
                    <AntDesign name="right" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                </View>
            </View>
            <View style={{
                marginTop: 30,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <FontAwesome name="eye-slash" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 8,
                        fontWeight: '500',
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Encryption method
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        marginRight: 10,
                        color: theme==="light"?'#000000AE':"rgba(255,255,255,0.9)",
                    }}>
                        Not set
                    </Text>
                    <AntDesign name="right" size={16} color={theme==="light"?'#000000AE':"rgba(255,255,255,0.9)"} />
                </View>
            </View>

        </View >
    )
}

export default Settings