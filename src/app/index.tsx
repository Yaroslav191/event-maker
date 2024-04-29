import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Link, Redirect } from "expo-router";
import { MapType } from "../context/MapContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
   const [token, setToken] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const storedToken = await AsyncStorage.getItem("token");
            setToken(storedToken as any);
         } catch (error) {
            console.error("Error fetching token:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   if (loading) {
      return <ActivityIndicator />;
   }

   if (token) {
      return <Redirect href={"/(map)"} />;
   } else {
      return <Redirect href={"/sign-in"} />;
   }
};

export default index;
