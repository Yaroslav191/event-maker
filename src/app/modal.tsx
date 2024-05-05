import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useContext, useEffect, useState } from "react";
import { MapType } from "../context/MapContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import axios from "axios";
import { fetchMarkers } from "../utils";
import { LOCALHOST } from "@env";

export default function ModalScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const router = useRouter();
  const { newMarker, id, titleParam, descriptionParam, timeParam } = params;
  const { markers, setMarkers } = useContext<any>(MapType);

  const [title, setTitle] = useState<string>("");
  const [descr, setDescr] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handlePress = () => {
    if (id == "-1") {
      const saveMarker = async () => {
        try {
          const data = {
            title: title,
            description: descr,
            coordinate: newMarker,
            time: time,
            visible: "1",
            id_user: 1,
          };

          const response = await axios.post(
            `http://${LOCALHOST}:8000/saveMarker`,
            data
          );

          if (response.status === 200) {
            fetchMarkers(setMarkers);
            navigation.goBack();
            console.log("go back");
          }
        } catch (error) {
          console.log(error);
        } finally {
          // setLoading(false);
        }
      };

      saveMarker();
    } else {
      let data = {
        title,
        description: descr,
        time,
        visible: "1",
        id_user: 1,
      };
      const response = axios
        .put(`http://${LOCALHOST}:8000/updateMarker/${id}`, data)
        .then(() => {
          fetchMarkers(setMarkers);
          navigation.goBack();
        })
        .catch((error) => console.log(error));
    }

    // setMarkers([...markers, JSON.parse(newMarker as string)]);
  };

  useEffect(() => {
    setTitle(titleParam as string);
    setDescr(descriptionParam as string);
    setTime(timeParam as string);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Добавить событие</Text>
      <TextInput
        placeholder="Имя"
        style={styles.input}
        value={title}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setTitle(event.nativeEvent.text)
        }
      />
      <TextInput
        placeholder="Описание"
        style={styles.input}
        value={descr}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setDescr(event.nativeEvent.text)
        }
      />
      <TextInput
        placeholder="Время"
        style={styles.input}
        value={time}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setTime(event.nativeEvent.text)
        }
      />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={handlePress}
          style={{
            // marginTop: 30,
            width: 150,
            backgroundColor: "#4A55A2",
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Сохранить
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            // marginTop: 30,
            width: 150,
            backgroundColor: "#4A55A2",
            padding: 15,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Отмена
          </Text>
        </Pressable>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
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
