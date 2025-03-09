import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from '../constants/Colors'
import BackButton from '../components/BackButton'
import Context from '../context/Context'
import DonePrompt from '../components/DonePrompt'

export default function Form({ navigation, route }: any) {
    const { data, type } = route.params
    const { 
        handleCreateSubmit, 
        handleUpdateSubmit,
        handleShow,
    } = useContext(Context);

    const [fieldData, setFieldData] = useState(() => ({
        name: data?.name ?? '',
        age: data?.age ?? '',
        colour: data?.colour ?? '',
    }));

    return (
        <View style={styles.container}>
            <BackButton />
            <View style={styles.topWrapper}>
                <Image
                    source={
                        type === 'create' ? require('../assets/data.png') :
                        require('../assets/file.png')
                    }
                    style={{ width: 160, height: 160 }}
                />

                <View style={styles.topTextWrapper}>
                    <Text style={styles.topText}>
                        {
                            type === 'create' ? 'Create Page' : 
                            type === 'view' ? 'View Page' : 
                            'Update Page'
                        }
                    </Text>

                    <Text style={styles.regularText}>
                        {
                            type === 'create' ? 'Create a new data here.' : 
                            type === 'view' ? 'View your chosen data here in this page.' 
                            : 'Update or edit a specific data here.'
                        }
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView style={styles.inputWrapper}>
                    <View>
                        <Text style={styles.labelText}>Name</Text>
                        <TextInput
                            editable={type !== 'view'}
                            style={styles.input}
                            placeholder='Name'
                            value={fieldData.name}
                            onChangeText={(text) => 
                                setFieldData({ ...fieldData, name: text })
                            }
                        />
                    </View>

                    <View>
                        <Text style={styles.labelText}>Age</Text>
                        <TextInput
                            editable={type !== 'view'}
                            style={styles.input}
                            placeholder='Age'
                            value={fieldData.age.toString()}
                            onChangeText={(text) => 
                                setFieldData({ ...fieldData, age: text })
                            }
                            keyboardType='numeric'
                        />
                    </View>

                    <View>
                        <Text style={styles.labelText}>Colour</Text>
                        <TextInput
                            editable={type !== 'view'}
                            style={styles.input}
                            placeholder='Colour'
                            value={fieldData.colour}
                            onChangeText={(text) => 
                                setFieldData({ ...fieldData, colour: text })
                            }
                        />
                    </View>
                </ScrollView>
            </View>

            {type == 'view' ? (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleShow(data?._id)}
                >
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
            )
            : (
                <View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            if (type === 'create') {
                                handleCreateSubmit(fieldData);
                            } else if (type === 'edit') {
                                handleUpdateSubmit(data?._id, fieldData);
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            )}

            <DonePrompt />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    topWrapper: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        gap: 10,
        paddingHorizontal: 25,
        marginTop: -15
    },

    topTextWrapper: {
        flexShrink: 1,
    },

    topText: {
        marginBottom: 5,
        fontSize: 20,
        fontFamily: 'Bold'
    },

    regularText: {
        fontFamily: 'Regular',
        fontSize: 13,
    },

    labelText: {
        fontSize: 15,
        fontFamily: 'SemiBold',
        marginBottom: 5,
        color: Colors.gray
    },

    input: {
        borderColor: Colors.lightGray,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Regular'
    },

    inputWrapper: {
        paddingHorizontal: 20
    },

    deleteButton: {
        backgroundColor: Colors.red,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 90,
        margin: 20,
        alignItems: 'center'
    },

    submitButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 90,
        margin: 20,
        alignItems: 'center'
    },

    buttonText: {
        color: Colors.white,
        fontFamily: 'Bold',
        fontSize: 15
    }
})