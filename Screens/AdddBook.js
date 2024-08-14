import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { database } from '../firebaseConfig';
import  {firebase} from '../firebaseConfig';
import { ref, push, serverTimestamp, get , set } from 'firebase/database';
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
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
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
        return date + '-' + month + '-' + year;//format: d-m-y;
    }
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [uploading , setUploading] =  useState(false) ;

    const uploadpdf = async () => {
        setUploading(true);
        try {
            const response = await fetch(selectedDocument);
            const blob = await response.blob();
            const filename = selectedDocument.substring(selectedDocument.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);
            await ref.put(blob);
            setSelectedDocument(null);
            console.log("ezadazdza")
        } catch (e) {
            console.log(e);
        } finally {
            setUploading(false);
        }
    };
        let reference = 0;
        const nextref = () => {
            reference+=1;
            return reference ;
        };
    const adddata = () => {
        if (formatDate(date)<=getCurrentDate()){
            Alert.alert("selectionner date d'éxpiration differente de celle d'aujourd'hui")
        }
        else if (!label || !description ||  !selectedDocument) {
            Alert.alert("Error", "Please fill all fields and select a document");
            return;
        }

        else {
            set(ref(database, 'books' + label), {
                BookReference: nextref(),
                DateCreation: getCurrentDate(),
                label: label,
                dateExpiration: formatDate(date),
                description: description,
                category: selectedType,
                Book:selectedDocument,


            });

            setLabel('')
            setDate(date)
            setDescription('')
            uploadpdf()
            Alert.alert("Book Added!")
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