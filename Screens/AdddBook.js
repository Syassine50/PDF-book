import React, {useCallback, useState} from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import {database, firebase , storage} from '../firebaseConfig';
import {push, ref, serverTimestamp, set} from 'firebase/database';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as storageRef, deleteObject } from 'firebase/storage';


import {Picker} from '@react-native-picker/picker';


const AddBook = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedType, setSelectedtype] = useState();

        const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };


    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const formatDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };
    let result = null;
    const pickDocument =  useCallback(async () => {
        try {
             result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            const source = result.assets[0].uri;

            setSelectedDocument(source);
            if (result.type === 'success') {
            }

        } catch (err) {
            console.log('Error picking document:', err);
        }
    });
    const getCurrentDate=()=>{

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date;//format: d-m-y;
    }
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [uploading , setUploading] =  useState(false) ;
        function generateUniqueRef() {
            return push(ref(database, 'books')).key;
        }
        const newBookRef = generateUniqueRef();

    const uploadpdf = async () => {
        setUploading(true);
        try {
            if (!selectedDocument) {
                throw new Error('No document selected');
            }

            let response;
            try {
                response = await fetch(selectedDocument);
            } catch (fetchError) {
                console.error('Error fetching the document:', fetchError);
                throw new Error('Failed to fetch the document');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const filename = selectedDocument.substring(selectedDocument.lastIndexOf('/') + 1);
            const fileRef = storageRef(storage, 'books/' + filename);

            const snapshot = await uploadBytes(fileRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);

            setSelectedDocument(null);
            setUploading(false);
            console.log('File uploaded successfully. Download URL:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
            throw error;
        }
    };


    const adddata = async () => {
        if (formatDate(date) <= getCurrentDate()) {
            Alert.alert("Sélectionner une date d'expiration différente de celle d'aujourd'hui")
            return;
        }
        if (!label || !description || !selectedDocument) {
            Alert.alert("Error", "Please fill all fields and select a document");
            return;
        }

        try {
            const downloadURL = await uploadpdf();
            set(ref(database, 'books/' + label), {
                BookReference: newBookRef,
                DateCreation: getCurrentDate(),

                createdAt: serverTimestamp(),
                label: label,
                dateExpiration: formatDate(date),
                description: description,
                category: selectedType,
                Book: downloadURL,
            });

            setLabel('');
            setDate(new Date());
            setDescription('');
            setSelectedDocument(null);
            Alert.alert("Book Added!");
        } catch (error) {
            console.error("Error adding book:", error);
            Alert.alert("Error", "Failed to add the book: " + error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text>Label:</Text>
                <TextInput
                    style={styles.input}
                    value={label}
                    onChangeText={setLabel}
                />

                <Text>Date d'expiration:</Text>
                <TouchableOpacity onPress={toggleDatePicker}>
                    <TextInput
                        style={styles.input}
                        value={formatDate(date)}
                        editable={false}
                    />
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <Text>Description:</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />

                <Text>Category:</Text>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedtype(itemValue)
                    }>
                    <Picker.Item label="Nouvelle " value="Nouvelle " />
                    <Picker.Item label="Conte" value="Conte" />
                    <Picker.Item label="Mythe" value="Mythe" />
                    <Picker.Item label="Légende" value="Légende" />
                    <Picker.Item label="Biographie" value="Biographie" />
                    <Picker.Item label="Autobiographie" value="Autobiographie" />
                    <Picker.Item label="Chronique" value="Chronique" />
                    <Picker.Item label="Apologue " value="Apologue " />
                    <Picker.Item label="Journal" value="Journal" />
                    <Picker.Item label="Roman" value="Roman" />
                </Picker>

                <Text>Réference de livre:</Text>
                <TouchableOpacity style={styles.input} onPress={pickDocument}>
                    <Text>{selectedDocument ? selectedDocument.name : "Sélectionner un livre PDF"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={adddata}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AddBook;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight
    },
    formContainer: {
        alignItems: "stretch",
    },
    input: {
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
    },
    textinput: {
        marginTop: 4,
        alignItems: "stretch"
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});