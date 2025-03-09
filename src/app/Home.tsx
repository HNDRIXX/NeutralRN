import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import Context from '../context/Context';
import DeletePrompt from '../components/DeletePrompt';
import DonePrompt from '../components/DonePrompt';

export default function Home({ navigation }: any) {
    const { data, handleShow, isLoading, fetchData, isFetching } = useContext(Context);

    const handleEditPress = (item: any) => {
        navigation.navigate('Form', { type: 'edit', data: item });
    }

    const handleItemPress = (item: any) => {
        navigation.navigate('Form', { type: 'view', data: item });
    }

    const handleCreatePress = () => {
        navigation.navigate('Form', { type: 'create' });
    }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff'  }}>
            <View style={styles.topWrapper}>
                <Image
                    source={require('../assets/list.png')}
                    style={{ width: 160, height: 160 }}
                />
                
                <View style={styles.topTextWrapper}>
                    <Text style={styles.topText}>Here's the list of data to display.</Text>
                    <Text style={styles.regularText}>Feel free to create, update, or delete data.</Text>                
                </View>
            </View>

            <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreatePress}
            >
                <Entypo name="add-to-list" size={20} color={Colors.white} />
                <Text style={styles.createButtonText}>Create new data</Text>
            </TouchableOpacity>

            {isFetching ? (
                <ActivityIndicator color={Colors.primary} size={'small'} style={{ padding: 20, marginTop: 20 }} />
            ) : (
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    onRefresh={fetchData}
                    refreshing={isLoading}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity 
                                onPress={() => handleItemPress(item)} 
                                style={{ flex: 1 }}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={styles.itemSubText}>Age: {item.age}</Text>
                            </TouchableOpacity>

                            <View style={styles.iconContainer}>
                                <TouchableOpacity
                                    onPress={() => handleEditPress(item)}
                                >
                                    <FontAwesome6 name="edit" size={22} color={Colors.lightGray} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleShow(item?._id)}
                                >
                                    <FontAwesome6 name="trash-alt" size={22} color={Colors.lightGray} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    style={styles.list}
                    contentContainerStyle={{ 
                        gap: 10,
                        marginTop: 10,
                        paddingHorizontal: 20,
                    }}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons name="border-none-variant" size={24} color={Colors.lightGray} />
                            <Text style={styles.emptyText}>No data found.</Text>
                        </View>
                    )}
                />
            )}

            <DeletePrompt />
            <DonePrompt />
        </View>
    )
}

const styles = StyleSheet.create({
    topWrapper: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        gap: 10,
        marginTop: 10,
        paddingHorizontal: 20
    },

    topTextWrapper: {
        flexShrink: 1,
    },

    topText: {
        marginBottom: 10,
        fontSize: 19,
        lineHeight: 23,
        fontFamily: 'Bold'
    },

    itemContainer: {
        padding: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: '0 5px 5px rgba(80, 80, 80, 0.2)',
    },

    itemText: {
        fontSize: 16,
        fontFamily: 'SemiBold'
    },

    itemSubText:{
        fontSize: 14,
        fontFamily: 'Regular'
    },

    iconContainer: {
        flexDirection: 'row',
        gap: 15
    },

    list: {
        marginTop: 20
    },

    createButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginHorizontal: 20,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    createButtonText: {
        fontSize: 15,
        fontFamily: 'SemiBold',
        marginTop: 3,
        color: Colors.white
    },

    regularText: {
        fontSize: 13,
        fontFamily: 'Regular'
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        margin: 20
    },

    emptyText: {
        fontSize: 15,
        fontFamily: 'Regular',
        color: Colors.lightGray
    }
})