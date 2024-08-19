import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { database } from '../firebaseConfig';
import {push, ref, set, get} from 'firebase/database';


const BookDetails = ({ route, navigation }) => {
    const [book, setBook] = useState(null);
    const { bookId } = route.params;

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
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{book.label}</Text>
            <Text>Category: {book.category}</Text>
            <Text>Description: {book.description}</Text>
            <Text>Date de création: {book.DateCreation}</Text>
            <Text>Date d'expiration: {book.dateExpiration}</Text>
            <Button title="Télécharger le livre" onPress={handleDownload} />
            <Button title="View PDF" onPress={handleViewPdf} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default BookDetails;