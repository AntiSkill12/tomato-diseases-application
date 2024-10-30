import React, { useState, useCallback } from 'react';
import { View, Button, Image, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Deteksi = ({ navigation }) => {
  const [iotImage, setIotImage] = useState(null); // Menyimpan gambar dari kamera IoT
  const [loading, setLoading] = useState(false);

  // Mengatur ulang gambar ke logo tomat setiap kali halaman mendapat fokus
  useFocusEffect(
    useCallback(() => {
      setIotImage(null); // Reset gambar ke logo tomat
    }, [])
  );

  // Fungsi untuk mengambil gambar dari kamera IoT dan langsung melakukan deteksi
  const fetchIoTImageAndDetect = async () => {
    setLoading(true);  // Menampilkan loading indicator

    try {
      // Ganti link di bawah dengan link dari kamera IoT
      const response = await fetch('http://192.168.100.114/capture');
      const blob = await response.blob();

      // Membaca blob sebagai base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result;
        setIotImage(base64data);  // Set gambar dari IoT di sini

        // Setelah gambar diambil, langsung mengirim ke Cloud Run untuk deteksi
        let formData = new FormData();
        formData.append('image', {
          uri: base64data,
          type: 'image/jpeg',
          name: 'iot_photo.jpg',
        });

        try {
          const detectionResponse = await fetch('https://healthy-tomato-1011672822525.asia-southeast2.run.app/detect', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const detectionResult = await detectionResponse.json();
          console.log(detectionResult);

          // Navigasi ke halaman Hasil dengan hasil deteksi
          navigation.navigate('Hasil', { 
            detectionResult: detectionResult, 
            capturedImage: detectionResult.image_url ? null : base64data,
          });
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Deteksi gagal. Silakan coba lagi.");
        }
      };

      reader.readAsDataURL(blob);  // Membaca blob ke base64 string
    } catch (error) {
      console.error('Error fetching IoT camera image:', error);
      Alert.alert("Error", "Gagal mengambil gambar dari kamera IoT.");
    } finally {
      setLoading(false);  // Sembunyikan loading indicator
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {iotImage ? (
            // Tampilkan gambar dari IoT jika sudah ada
            <Image source={{ uri: iotImage }} style={{ width: 200, height: 200, marginBottom: 20 }} />
          ) : (
            // Tampilkan logo tomat jika gambar IoT belum ada
            <Image source={require('../assets/images/Logo.png')} style={{ width: 200, height: 200, marginBottom: 20 }} />
          )}
          <Button title="Deteksi Penyakit" onPress={fetchIoTImageAndDetect} />
        </>
      )}
    </View>
  );
};

export default Deteksi;
