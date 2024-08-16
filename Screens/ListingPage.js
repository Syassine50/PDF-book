import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList, ScrollView,} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { database , storage } from '../firebaseConfig';
import  {firebase} from '../firebaseConfig';
import { ref, push, serverTimestamp, get , set ,onValue , remove } from 'firebase/database';
import Svg ,{ G, Path } from 'react-native-svg';
import { ref as storageRef, deleteObject } from 'firebase/storage';


const ListingPage= ({navigation}) => {
    const [toDoData , setToDoData]= useState([])
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
            } else {
                setToDoData([]);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>{item.label}</Text>
            <Text>{item.description}</Text>
            <Text>{item.dateExpiration}</Text>
        </View>

    );
    const deleteBook = (bookId) => {
        const bookRef = ref(database, `books/${bookId}`);

        get(bookRef).then((snapshot) => {
            const bookData = snapshot.val();
            if (bookData && bookData.Book) {
                // Check if the Book field is a valid Firebase Storage URL
                if (bookData.Book.startsWith('gs://') || bookData.Book.startsWith('https://firebasestorage.googleapis.com/')) {
                    // It's a Firebase Storage URL, proceed with deletion
                    const fileRef = storageRef(storage, bookData.Book);

                    deleteObject(fileRef).then(() => {
                        console.log("File deleted successfully from Storage");
                        removeBookFromDatabase(bookRef);
                    }).catch((error) => {
                        console.error("Error deleting file from Storage: ", error);
                        // If file deletion fails, you might still want to delete the database entry
                        removeBookFromDatabase(bookRef);
                    });
                } else {
                    console.log("Invalid Storage URL, removing only database entry");
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
    return(
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: '' }]} >

                <TouchableOpacity style={styles.appButtonContainer} onPress={()=> {navigation.navigate("add")}}>
                    <Text style={styles.appButtonText}>Add Book</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={()=> {navigation.replace("OnBording")}}>
                    <Text style={styles.appButtonText}>onboarding</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={()=> {navigation.navigate("BookList")}}>
                    <Text style={styles.appButtonText}>onboarding</Text>
                </TouchableOpacity>
                    {
                        toDoData.map((item, index) => {
                            return(
                                <TouchableOpacity key={item.id} onPress={ () => navigation.navigate("add")}>

                                    <View style={styles.card} >
                                        <View style={styles.cardHeader}>
                                            <Text style={styles.cardTitle}>{item.label}</Text>
                                            <Text style={styles.cardcategorie}>Catégorie : {item.category}</Text>
                                            <Text style={styles.cardSubtitle}>Date Éxpiration : {item.dateExpiration}</Text>
                                        </View>

                                        <View style={styles.cardContent}>
                                            <Text>{item.category}{'\n'}{item.description}  {'\n'} {item.Book}   </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.iconContainer}
                                            onPress={() => {deleteBook(item.id)}}
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
                            )
                        })
                    }
            </View>
        </ScrollView>
    )
};
export default ListingPage ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',
        backgroundColor:'rgba(79,79,79,0.02)'

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
    icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',

    },
    cardcategorie:{
            fontSize: 14,
            color: '#63caff',

    },
    scrollViewContent: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width:370,
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
        color:'#356bcb'
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
        marginTop:8 ,
        marginLeft :245,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});
