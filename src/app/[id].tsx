import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

const EventDetailsScreen = () => {
   const { id } = useLocalSearchParams();

   return (
      <View>
         <Stack.Screen options={{ title: "Details" + id }} />
         <Text>{id}</Text>
      </View>
   );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({});
