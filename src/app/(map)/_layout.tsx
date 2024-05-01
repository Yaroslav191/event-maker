import { Redirect, Stack } from "expo-router";

export default function MapScreen() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Карта" }} />
    </Stack>
  );
}
