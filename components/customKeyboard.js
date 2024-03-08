import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";

const ios = Platform.OS == "ios";
export default function CustomKeyboard({ children, inchat }) {
  let keyboardConfig = {};
  let scrollviewConfig = {};
  if (inchat) {
    keyboardConfig = { keyboardVerticalOffset: 90 };
    scrollviewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      {...keyboardConfig}
      // keyboardVerticalOffset={90}
      style={{ flex: 1, paddingBottom: 40 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollviewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
