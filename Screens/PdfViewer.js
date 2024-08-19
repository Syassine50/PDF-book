import React from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const PdfViewer = ({ route }) => {
    const { pdfUri } = route.params;

    // Custom HTML and CSS for horizontal paging
    const injectedJavaScript = `
        const style = document.createElement('style');
        style.innerHTML = \`
            body {
                margin: 0;
                padding: 0;
                overflow-x: auto;
                overflow-y: hidden;
                display: flex;
                flex-direction: row;
                width: 100vw;
                height: 100vh;
                scroll-snap-type: x mandatory;
                scroll-behavior: smooth;
                white-space: nowrap; /* Prevent wrapping */
            }
            iframe {
                display: inline-block;
                width: 100vw;
                height: 100vh;
                scroll-snap-align: start;
                border: none;
            }
        \`;
        document.head.appendChild(style);

        // Wrap each iframe (page) in a div with the necessary styles
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.style.display = 'inline-block';
        });
    `;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: pdfUri }}
                style={styles.webview}
                startInLoadingState={true}
                injectedJavaScript={injectedJavaScript}
                renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default PdfViewer;
