import React from "react";
import {View, Text, StyleSheet, } from "react-native";


const PdfViewer = ({ route }) => {
    const { pdfUri } = route.params;
    return(
        {/*<Pdf


            source={pdfUri}
            onLoadComplete={(numberOfPages,filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
        />*/}
    )
};
export default PdfViewer ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',

    }

});
