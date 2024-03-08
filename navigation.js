import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ChatRoom,
  Home,
  Login,
  Signup,
  Splash,
  AddFriend,
  UserProfile,
} from "./screens";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Login"}
      screenOptions={{ headerShown: false, headerBackVisible: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{ headerShown: false, headerBackVisible: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen
        name="AddFriend"
        component={AddFriend}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{ headerShown: false, headerBackVisible: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="ChatStack" component={ChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
