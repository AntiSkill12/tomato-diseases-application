import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {db} from './firebaseConfig'; // Import Firestore
import {collection, getDocs} from 'firebase/firestore';

const Home = ({navigation}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        setArticles(
          querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})),
        );
      } catch (error) {
        console.log('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  // Fungsi untuk menampilkan cuplikan artikel
  const renderArticleSnippet = content => {
    if (!content || !Array.isArray(content)) return ''; // Jika content tidak ada atau bukan array
    const firstParagraph = content[0]?.paragraph || ''; // Ambil paragraf pertama
    return firstParagraph.length > 100
      ? `${firstParagraph.substring(0, 100)}...`
      : firstParagraph;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.headerTitle}>Selamat Datang</Text>
      </View>

      <Text style={styles.headercategory}>Kategori Penyakit</Text>
      <View style={styles.categoryContainer}>
        {[
          {
            name: 'Bacterial Spot',
            image: require('../assets/images/bacterial_spot.png'),
          },
          {
            name: 'Blossom End Rot',
            image: require('../assets/images/blossom_end_rot.png'),
          },
          {name: 'Splitting', image: require('../assets/images/splitting.png')},
          {name: 'Cracking', image: require('../assets/images/cracking.png')},
          {name: 'Sunscald', image: require('../assets/images/sunscald.png')},
          {
            name: 'Rotten Tomato',
            image: require('../assets/images/rotten_tomato.png'),
          },
        ].map((category, index) => (
          <View key={index} style={styles.categoryBox}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.articleTitle}>Article Untuk Anda</Text>
      <FlatList
        data={articles}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.articleCard}
            onPress={() =>
              navigation.navigate('ArticleDetail', {article: item})
            }>
            <Image source={{uri: item.imageUrl}} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text style={styles.articleDate}>{item.publishDate}</Text>
              <Text style={styles.articleSnippet}>
                {renderArticleSnippet(item.content)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
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
    paddingHorizontal: 23,
  },
  logoImage: {
    marginTop: 10,
    width: 90,
    height: 85,
    marginRight: 120,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  headercategory: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  categoryBox: {
    alignItems: 'center',
    width: '30%',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderRadius: 10,
    backgroundColor: '#FFEBEE',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  articleCard: {
    flexDirection: 'row-reverse', // Ubah arah row, gambar di kanan
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10, // Tambahkan margin di sebelah kiri
  },
  articleContent: {
    flex: 1,
  },
  articleHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  articleSnippet: {
    fontSize: 14,
    color: '#333',
  },
});

export default Home;
