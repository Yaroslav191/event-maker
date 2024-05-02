import Colors from "@/src/constants/Colors";
import { Stack, Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
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
