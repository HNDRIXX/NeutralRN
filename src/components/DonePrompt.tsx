import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Context from '../context/Context';
import { Colors } from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DonePrompt() {
    const { isSuccess, handleSuccess } = useContext(Context)
    const navigation: any = useNavigation();

    const handleButtonPress = () => {
        handleSuccess();
        navigation.replace('Home');
    }

    return (
        <Modal
            visible={isSuccess}
            transparent={true}
            animationType="fade"
            onRequestClose={handleSuccess}
        >
            <TouchableOpacity
                onPress={handleSuccess}
                style={styles.container}
            >
                <View style={styles.wrapper}>
                    <FontAwesome 
                        name="check-circle" 
                        size={60} 
                        color={Colors.green} 
                    />

                    <Text style={styles.text}>Success!</Text>
                    <Text style={styles.subText}>
                        Your action has been{'\n'}successfully done.
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleButtonPress}
                    >
                        <Text style={styles.buttonText}>
                            PROCEED
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(110, 110, 110, 0.19)',
    },

    wrapper: {
        backgroundColor: Colors.white,
        padding: 35,
        borderRadius: 10,
        alignItems: 'center',
    },

    text: {
        fontSize: 18,
        fontFamily: 'Bold',
        color: Colors.green,
        marginTop: 10,
        marginBottom: 5
    },

    subText: {
        fontSize: 15,
        fontFamily: 'Regular',
        lineHeight: 17,
        textAlign: 'center'
    },

    button: {
        marginTop: 20,
        backgroundColor: Colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 7,
        borderRadius: 90
    },

    buttonText: {
        fontFamily: 'Bold',
        color: Colors.white
    }
})