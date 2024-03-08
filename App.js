import Navigation from "./navigation";
import React from "react";
import { AuthContextProvider } from "./context/authContext";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar barStyle={"light-content"} backgroundColor={`#60A5FA`} />
      <Navigation />
    </AuthContextProvider>
  );
}
