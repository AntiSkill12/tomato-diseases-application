import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArticleDetail = ({ navigation, route }) => {
    const { article } = route.params;
    
    if (!article) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Data artikel tidak tersedia.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon} />
                </TouchableOpacity>
            </View>
        );
    }

    // Fungsi untuk render paragraf dari content
    const renderArticleContent = () => {
        if (article.content && Array.isArray(article.content)) {
            return article.content.map((item, index) => (
                <Text key={index} style={styles.articleParagraph}>
                    {item.paragraph}
                </Text>
            ));
        }
        return <Text style={styles.articleParagraph}>Konten tidak tersedia.</Text>;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Article</Text>
            </View>

            {article.imageUrl ? (
                <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
            ) : (
                <Text style={styles.missingImageText}>Gambar tidak tersedia</Text>
            )}

            <Text style={styles.articleTitle}>{article.title || 'Judul tidak tersedia'}</Text>

            <View style={styles.articleHeader}>
                <Text style={styles.articleDate}>{article.publishDate || 'Tanggal tidak tersedia'}</Text>
                <Text style={styles.postByAdmin}>Post By Admin</Text>
            </View>

            {/* Render konten artikel */}
            {renderArticleContent()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#97BE5A',
        marginHorizontal: -20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    backIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    articleImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    missingImageText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 20,
        color: '#666',
        textAlign: 'center',
    },
    articleTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    articleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    articleDate: {
        fontSize: 12,
        color: '#666',
    },
    postByAdmin: {
        fontSize: 12,
        color: '#666',
    },
    articleParagraph: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'justify',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ArticleDetail;
