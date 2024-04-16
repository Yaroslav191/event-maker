import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import Svg, { Image } from "react-native-svg";

const index = () => {
   return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
         <Link href={"/(use)"} asChild>
            <Button text="User" />
         </Link>
         <Link href={"/(admin)"} asChild>
            <Button text="Admin" />
         </Link>

         <Button text="Sign out" />
      </View>
   );
};

export default index;
