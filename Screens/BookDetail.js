import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, Linking, TouchableOpacity, ScrollView} from 'react-native';
import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

const BookDetails = ({ bookId, onClose , route, navigation }) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const bookRef = ref(database, `books/${bookId}`);
            const snapshot = await get(bookRef);
            if (snapshot.exists()) {
                setBook(snapshot.val());
            } else {
                console.log("No such document!");
            }
        };

        fetchBook();
    }, [bookId]);

    if (!book) {
        return <View><Text>Loading...</Text></View>;
    }

    const handleDownload = () => {
        Linking.openURL(book.Book);
    };

    const handleViewPdf = () => {
        navigation.navigate('PdfViewer', { pdfUri: book.Book });
        onClose();

    };

    return (
        <View style={styles.modalContainer}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>{book.label}</Text>
                <Text style={styles.texts}><Text style={styles.subtitle}>Category                 :</Text> {book.category}</Text>
                <Text style={styles.texts}><Text style={styles.subtitle}>Date de création  :</Text> {book.DateCreation}</Text>
                <Text style={styles.texts}><Text style={styles.subtitle}>Date d'expiration:</Text> {book.dateExpiration}</Text>
                <Text style={styles.texts}><Text style={styles.subtitle}>Description           :</Text> {book.description}</Text>

            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDownload}>
                    <Text style={styles.buttonText}>Télécharger le livre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleViewPdf}>
                    <Text style={styles.buttonText}>View PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        marginVertical:200,
        backgroundColor: 'white',
        borderRadius: 10,
        width:'70%',
        alignItems: 'flex-start',
    },
    container: {
        flex: 1,
        padding: 20,
        marginVertical: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#356bcb'

    },
    subtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#63caff',
    },
    texts: {
        fontSize: 17,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent :"center",
        width:'100%',
    },
    button: {
        backgroundColor: '#356bcb',
        padding: 9,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default BookDetails;
