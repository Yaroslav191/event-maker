import React, { useState } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/config";
import { getFirebaseImage } from "@/src/utils";

export default function TabTwoScreen() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageName, setImageName] = useState(0);

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Pick image from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Make sure to update state here
      // console.log(result.assets[0].uri);
    }
  };

  const submitData = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const name = new Date().getTime();
    setImageName(name);

    console.log(blob);

    const storageRef = ref(storage, "image" + name);

    uploadBytesResumable(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // Function to upload image
  const uploadImage = async () => {
    if (!selectedImage) return;

    // Create a new FormData object
    const formData = new FormData();
    // formData.append("image", {
    //    uri: selectedImage,
    //    name: "photo.jpg", // File name you want
    //    type: "image/jpeg", // File type
    // });

    // Send the request using axios
    try {
      const response = await axios.post(
        "http://192.168.100.123:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle the response
      console.log("Image uploaded:", response.data);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Upload Image" onPress={uploadImage} />
      <Button
        title="Upload Image to Firebase"
        onPress={() => {
          submitData(selectedImage);
        }}
      />
      <Button
        title="get Image from Firebase"
        onPress={() => {
          getFirebaseImage("image1714459308929");
        }}
      />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
