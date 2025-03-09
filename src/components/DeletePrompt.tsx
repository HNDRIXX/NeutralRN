import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { handleDeletePrompt } from '../redux/slices/defaultSlice';
import { deleteData } from '../redux/slices/deleteSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

export default function DeletePrompt() {
    const { isDeletePrompt } = useAppSelector((state) => state.default);
    const dispatch = useAppDispatch();

    return (
        <Modal
            visible={isDeletePrompt}
            transparent={true}
            animationType="fade"
            onRequestClose={() => dispatch(handleDeletePrompt())}
        >
            <TouchableOpacity 
                onPress={() => handleDeletePrompt()} 
                style={styles.container}
            >
                <View style={styles.wrapper}>
                    <Ionicons name="warning" size={60} color={Colors.warn} />
                    <Text style={styles.text}>Delete</Text>
                    <Text style={styles.subText}>
                        Are you sure you want to{'\n'}delete this data?
                    </Text>

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity 
                            onPress={() => dispatch(handleDeletePrompt())}
                            style={styles.noButton}
                        >
                            <Text style={styles.noText}>
                                NO
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => dispatch(deleteData())}
                            style={styles.yesButton}
                        >
                            <Text style={styles.yesText}>
                                YES
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(110, 110, 110, 0.42)',
    },

    wrapper: {
        backgroundColor: Colors.white,
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },

    text: {
        fontSize: 18,
        fontFamily: 'Bold',
        marginTop: 10,
        marginBottom: 5
    },

    subText: {
        fontSize: 15,
        fontFamily: 'Regular',
        lineHeight: 17,
        textAlign: 'center'
    },

    buttonWrapper: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 20
    },

    noText: {
        fontFamily: 'Bold',
        fontWeight: '600',
        color: Colors.primary
    },

    noButton: {
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 90
    },

    yesText: {
        fontFamily: 'Bold',
        color: Colors.gray
    },

    yesButton: {
        borderColor: Colors.gray,
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 90
    }
})