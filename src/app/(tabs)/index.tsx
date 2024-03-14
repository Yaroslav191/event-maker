import { StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import MapView from "react-native-maps";

export default function TabOneScreen() {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Карта</Text>
         <MapView style={styles.map} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   title: {
      fontSize: 20,
      textAlign: "center",
      padding: 5,
   },
   map: {
      width: "100%",
      height: "40%",
   },
});
