import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'

export default function BackButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                padding: 15
            }}
            onPress={() => navigation.goBack()}
        >
            <Ionicons name="chevron-back" size={22} color={Colors.gray} />
            <Text style={{ fontSize: 16, fontFamily: 'SemiBold', color: Colors.gray, }}>Back</Text>
        </TouchableOpacity>
    )
}