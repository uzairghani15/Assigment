import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '../../Theme/Icons';
import Colors from '../../Theme/Colors';
import SwitchToggle from 'react-native-switch-toggle';
import axios from 'axios';

const RoutinesScreen = () => {
    const [morningSwitchOn, setMorningSwitchOn] = useState(false);
    const [eveningSwitchOn, setEveningSwitchOn] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [dataApi, setDataApi] = useState([]);
    const [newOrder, setNewOrder] = useState("ascending");

    const handleSearch = (searchLetter) => {
        const filteredItems = dataApi.filter((item) => {
          return item.name.toLowerCase().includes(searchLetter.toLowerCase());
        });

        if (searchLetter) {
          setReminders(filteredItems);
        } else {
          setReminders(dataApi);
        }
    };

    const handleSort = () => {
        const sortedReminders = [...reminders].sort((a, b) => {
            if (newOrder === "ascending") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        
        setReminders(sortedReminders);
        setNewOrder(newOrder === "ascending" ? "descending" : "ascending");
    };

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get(
                    'https://devapi.getgoally.com/v1/api/reminders/all',
                    {
                        headers: {
                            Authorization: 'ddc58e6a-2e69-4f44-97e8-1454eb352069',
                        },
                    }
                );

                const newReminders = response?.data?.docs || [];
                setReminders(newReminders);
                console.log("line 54:: ", newReminders)
                setDataApi(newReminders);
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        };

        fetchReminders();
    }, []);

    const onToggleMorningSwitch = () => {
        setMorningSwitchOn(!morningSwitchOn);
    };

    const onToggleEveningSwitch = () => {
        setEveningSwitchOn(!eveningSwitchOn);
    };

    return (
        <ImageBackground source={require('../../Theme/Images/BackgroundImage.png')} resizeMode="contain" style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={Colors.darkBlue} barStyle="light-content" />

            <View style={{ flexDirection: 'row', backgroundColor: '#182545', height: 60, justifyContent: 'space-between', alignItems: 'center', padding: 0, paddingHorizontal: 16 }}>
                <Image source={require('../../Theme/Images/HomeIcon.png')} style={{ width: 36, height: 36 }} />
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '400' }}>Routines</Text>
                <Image source={require('../../Theme/Images/SettingsIcon.png')} style={{ width: 36, height: 36 }} />
            </View>

            {/* Routines Container */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 3 }}>
                {/* Morning Routine */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ marginTop: 8, fontSize: 16, color: 'black', fontWeight: '500' }}>Morning Routine</Text>
                    <ImageBackground source={require("../../Theme/Images/MorningRoutine.png")} style={{ width: 168, height: 100, marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                            <View style={{ alignItems: 'left' }}>
                                <Text style={{ color: Colors.Black, fontSize: 16, fontWeight: '400' }}>Weekdays</Text>
                                <Text style={{ color: Colors.Black, fontSize: 16, fontWeight: '400' }}>7:00 AM</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <SwitchToggle
                                    switchOn={morningSwitchOn}
                                    onPress={onToggleMorningSwitch}
                                    circleColorOff={Colors.White}
                                    circleColorOn={Colors.White}
                                    backgroundColorOn="#72CEBC"
                                    backgroundColorOff="#74777F"
                                    circleStyle={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 25,
                                        backgroundColor: 'blue',
                                    }}
                                    containerStyle={{
                                        width: 51,
                                        height: 32,
                                        borderRadius: 25,
                                        padding: 2.5,
                                        backgroundColor: '#74777F',
                                    }}
                                    duration={300}
                                />
                                <Icon type='FontAwesome5' color={Colors.Black} size={18} name='chevron-right' />
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Evening Routine */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ marginTop: 8, fontSize: 16, color: 'black', fontWeight: '500' }}>Evening Routine</Text>
                    <ImageBackground source={require("../../Theme/Images/EveningRoutine.png")} style={{ width: 168, height: 100, marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                            <View style={{ alignItems: 'left' }}>
                                <Text style={{ color: Colors.White, fontSize: 16, fontWeight: '400' }}>Everyday</Text>
                                <Text style={{ color: Colors.White, fontSize: 16, fontWeight: '400' }}>9:00 PM</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <SwitchToggle
                                    switchOn={eveningSwitchOn}
                                    onPress={onToggleEveningSwitch}
                                    circleColorOff={Colors.White}
                                    circleColorOn={Colors.White}
                                    backgroundColorOn="#72CEBC"
                                    backgroundColorOff="#74777F"
                                    circleStyle={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 25,
                                        backgroundColor: 'blue',
                                    }}
                                    containerStyle={{
                                        width: 51,
                                        height: 32,
                                        borderRadius: 25,
                                        padding: 2.5,
                                        backgroundColor: '#74777F',
                                    }}
                                    duration={300}
                                />
                                <Icon type='FontAwesome5' color={Colors.White} size={18} name='chevron-right' />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: Colors.grey, marginTop: '3%' }} />

            {/* Search Container */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '5%', marginTop: '3%', marginBottom: '5%' }}>
                <TextInput style={{ width: '75%', height: 48, color: Colors.Black, padding: 0, paddingLeft: 10, borderColor: Colors.Black, borderWidth: 1 }} placeholder="" placeholderTextColor={Colors.Black} onChangeText={handleSearch} />
                <TouchableOpacity style={{ backgroundColor: Colors.Green, padding: '3%', height: 48, width: 41.84, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type='FontAwesome' name='search' color={Colors.White} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={handleSort}>
                    <Image source={require('../../Theme/Images/sortIcon.png')} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Displaying Reminders */}
                {reminders.map((reminder, index) => (
                    <View>
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', marginBottom: '3%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: reminder?.visualAidUrl }} style={{ width: 48, height: 48 }} />
                                <View style={{ marginLeft: '3%', bottom: "10%"}}>
                                    <Text style={{ fontWeight: '500', fontSize: 16, color: Colors.Black }}>{reminder?.name}</Text>
                                </View>
                            </View>
                            <Icon type='FontAwesome5' color={Colors.Black} size={18} name='chevron-right' />
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: "rgba(186, 193, 202, 1)", marginHorizontal: '5%', marginBottom: '3%' }} />
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

export default RoutinesScreen;
