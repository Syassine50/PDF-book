import React, {useEffect, useLayoutEffect, useState} from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { database, storage } from '../firebaseConfig';
import { ref, onValue, remove, get } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import RNPickerSelect from "react-native-picker-select";
import Svg, { Path } from 'react-native-svg';
import BookDetails from './BookDetail';
import {Ionicons} from "@expo/vector-icons"; // Import your BookDetails component

const ListingPage = ({ navigation }) => {
    const [toDoData, setToDoData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('none');
    const [sortedData, setSortedData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const goToNotifications = () => {
        navigation.navigate('NotificationPage');
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('NotificationPage')}
                    style={{ marginRight: 15 }}
                >
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    useEffect(() => {
        const starCountRef = ref(database, 'books/');
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const newBooks = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                console.log(newBooks);
                setToDoData(newBooks);
                handleSortChange(sortOption, newBooks);
            } else {
                setToDoData([]);
                setSortedData([]);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const handleSortChange = (value, data = toDoData) => {
        let sorted = [...data];

        if (value === 'dateDescending') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (value === 'dateAscending') {
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setSortedData(sorted);
    };


    const filteredBooks = sortedData.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteBook = (bookId) => {
        const bookRef = ref(database, `books/${bookId}`);
        get(bookRef).then((snapshot) => {
            const bookData = snapshot.val();
            if (bookData && bookData.Book) {
                if (bookData.Book.startsWith('gs://') || bookData.Book.startsWith('https://firebasestorage.googleapis.com/')) {
                    const fileRef = storageRef(storage, bookData.Book);
                    deleteObject(fileRef).then(() => {
                        console.log("File deleted successfully from Storage");
                        removeBookFromDatabase(bookRef);
                    }).catch((error) => {
                        console.error("Error deleting file from Storage: ", error);
                        removeBookFromDatabase(bookRef);
                    });
                } else {
                    removeBookFromDatabase(bookRef);
                }
            } else {
                removeBookFromDatabase(bookRef);
            }
        }).catch((error) => {
            console.error("Error getting book data: ", error);
        });
    };

    const removeBookFromDatabase = (bookRef) => {
        remove(bookRef)
            .then(() => {
                console.log("Book removed successfully from Database");
            })
            .catch((error) => {
                console.error("Error removing book from Database: ", error);
            });
    };

    const openBookDetailsModal = (bookId) => {
        setSelectedBookId(bookId);
        setModalVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: '' }]}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => { navigation.navigate("add") }}>
                    <Text style={styles.appButtonText}>Add Book</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher par label"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <RNPickerSelect
                    onValueChange={(value) => handleSortChange(value)}
                    items={[
                        { label: 'Date Descending', value: 'dateDescending' },
                        { label: 'Date Ascending', value: 'dateAscending' },
                    ]}
                    value={sortOption}
                    style={{
                        inputIOS: {
                            fontSize: 18,
                            color: "#fff",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            paddingRight: 30,
                            elevation: 8,
                            backgroundColor: "#356bcb",
                            borderRadius: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            marginTop: 8,
                            marginLeft: 200,
                            marginRight: 19,
                        },
                        inputAndroid: {
                            fontSize: 18,
                            color: "#fff",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            elevation: 8,
                            backgroundColor: "#356bcb",
                            borderRadius: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            marginTop: 8,
                            marginLeft: 245,
                            marginRight: 19,
                        },
                    }}
                />

                {filteredBooks.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => openBookDetailsModal(item.id)}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>{item.label}</Text>
                                <Text style={styles.cardcategorie}>Catégorie : {item.category}</Text>
                                <Text style={styles.cardSubtitle}>Date Éxpiration : {item.dateExpiration}</Text>
                            </View>
                            <View style={styles.cardContent}>
                                <Text>{item.category}{'\n'}{item.description}{'\n'}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => { deleteBook(item.id) }}
                            >
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <Path d="M3 6h18" />
                                    <Path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                    <Path d="M10 11v6" />
                                    <Path d="M14 11v6" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}

                >
                    <View style={styles.modalBackground}>
                        {selectedBookId && <BookDetails bookId={selectedBookId}
                                                        navigation={navigation} onClose={() => setModalVisible(false)} />}
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};
export default ListingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(79,79,79,0.02)'
    },

    iconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: 200,
        marginVertical: 10,
    },
    icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    cardcategorie: {
        fontSize: 14,
        color: '#63caff',
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dark background
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: 370,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 1,
    },
    cardHeader: {
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#356bcb'
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    cardContent: {
        marginTop: 8,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#356bcb",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 8,
        marginLeft: 245,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    searchInput: {
        borderRadius: 10,
        backgroundColor: 'rgba(211,211,211,0.53)',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 100,
        elevation: 1,
        padding: 10,
        marginVertical: 8,
        color: '#000000',
        width: '90%',
    },
});
