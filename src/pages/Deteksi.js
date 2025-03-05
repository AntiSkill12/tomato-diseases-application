import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Deteksi = ({ route, navigation }) => {
  const [iotImage, setIotImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isTriggered = route.params?.isTriggered || false;

  // Fungsi untuk mengambil gambar dari IoT
  const fetchIoTImageAndDetect = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://192.168.57.92/capture');
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result;
        setIotImage(base64data);

        let formData = new FormData();
        formData.append('image', {
          uri: base64data,
          type: 'image/jpeg',
          name: 'iot_photo.jpg',
        });

        try {
          const detectionResponse = await fetch(
            'https://healthy-tomato-1011672822525.asia-southeast2.run.app/detect',
            {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          const detectionResult = await detectionResponse.json();

          // Reset param setelah selesai
          navigation.setParams({ isTriggered: false });

          navigation.navigate('Hasil', {
            detectionResult,
            capturedImage: detectionResult.image_url ? null : base64data,
          });
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Deteksi gagal. Silakan coba lagi.');
        }
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching IoT camera image:', error);
      Alert.alert('Error', 'Gagal mengambil gambar dari kamera IoT.');
    } finally {
      setLoading(false);
    }
  };

  // Reset gambar ke logo default saat halaman menjadi fokus
  useFocusEffect(
    React.useCallback(() => {
      setIotImage(null); // Reset gambar
    }, [])
  );

  // Jalankan fetch otomatis jika halaman di-trigger
  useEffect(() => {
    if (isTriggered) {
      fetchIoTImageAndDetect();
    }
  }, [isTriggered]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {iotImage ? (
            <Image
              source={{ uri: iotImage }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          ) : (
            <Image
              source={require('../assets/images/Logo.png')}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}
          <Button title="Deteksi Penyakit" onPress={fetchIoTImageAndDetect} />
        </>
      )}
    </View>
  );
};

export default Deteksi;
