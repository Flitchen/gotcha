import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";

export default function Splash() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    //Check if user is authenticated
    setTimeout(() => {
      if (typeof isAuthenticated == "undefined") return;
      if (isAuthenticated == true) {
        navigation.replace("ChatStack");
      } else {
        navigation.replace("AuthStack");
      }
    }, 1000);
  }, [isAuthenticated]);

  return <Loading />;
}
