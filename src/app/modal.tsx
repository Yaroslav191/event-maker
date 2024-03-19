import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useContext } from "react";
import { MapType } from "../context/MapContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

export default function ModalScreen() {
   const navigation = useNavigation();
   const params = useLocalSearchParams();
   const router = useRouter();
   const { newMarker } = params;
   const { markers, setMarkers } = useContext<any>(MapType);

   const handlePress = () => {
      // const newMarker = {
      //    coordinate: coordinate,
      //    key: String(markers.length), // Assign a unique key to the marker
      // };
      setMarkers([...markers, JSON.parse(newMarker)]);
      navigation.goBack();
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Добавить событие</Text>
         <TextInput placeholder="Описание" style={styles.input} />
         <TextInput placeholder="Время" style={styles.input} />
         <Pressable
            onPress={handlePress}
            style={{
               marginTop: 30,
               width: 200,
               backgroundColor: "#4A55A2",
               padding: 15,
               marginLeft: "auto",
               marginRight: "auto",
               borderRadius: 6,
            }}
         >
            <Text
               style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
               }}
            >
               Сохранить
            </Text>
            <Text>{markers.length}</Text>
         </Pressable>
         {/* Use a light status bar on iOS to account for the black space above the modal */}
         <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
   },
   input: {
      fontSize: 18,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      marginVertical: 10,
      width: 300,
   },
});
