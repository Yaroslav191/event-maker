import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Link, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthToken from "../utils/hooks";

const index = () => {
  const { token, loading } = useAuthToken();

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
