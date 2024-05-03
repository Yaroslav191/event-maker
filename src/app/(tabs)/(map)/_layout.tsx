import Colors from "@/src/constants/Colors";
import { Stack, Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

export default function MapScreen() {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{
               title: "Карта",
               headerRight: () => (
                  <Link href="/sign-in" asChild>
                     <Pressable>
                        {({ pressed }) => (
                           <SimpleLineIcons
                              name="logout"
                              size={24}
                              color="black"
                           />
                        )}
                     </Pressable>
                  </Link>
               ),
            }}
         />
      </Stack>
   );
}
