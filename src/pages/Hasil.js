import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Hasil = ({ route, navigation }) => {
  const { detectionResult, capturedImage } = route.params;

  const imageUrl = detectionResult.image_url || '';
  const keterangan = detectionResult.Keterangan || 'Tidak ada keterangan';
  let kondisiTomat = detectionResult['Kondisi Tomat'] || 'Tidak tersedia';

  if (kondisiTomat === 'Bukan Gambar Tomat') {
    kondisiTomat = 'Bukan Buah Tomat';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Hasil Identifikasi</Text>
      </View>

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.imageResult} />
      ) : capturedImage ? (
        <Image source={{ uri: capturedImage }} style={styles.imageResult} />
      ) : (
        <Text style={styles.noImageText}>Gambar tidak tersedia</Text>
      )}

      <Text style={styles.sectionTitle}>Kondisi Tomat</Text>
      <Text style={styles.sectionContent}>{kondisiTomat}</Text>

      <Text style={styles.sectionTitle}>Keterangan</Text>
      <Text style={styles.sectionContent}>{keterangan}</Text>

      {/* Tombol Deteksi Penyakit */}
      <Button
        title="Deteksi Penyakit"
        onPress={() =>
          navigation.navigate('Deteksi', {
            isTriggered: true, // Trigger langsung deteksi
          })
        }
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  imageResult: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'justify',
  },
});

export default Hasil;