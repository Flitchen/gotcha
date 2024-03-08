import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import CustomKeyboard from "../components/customKeyboard";
import { useAuth } from "../context/authContext";
import Toast from "react-native-simple-toast";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (
      userCredentials.email.trim() == "" ||
      userCredentials.password.trim() == ""
    ) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 3000);
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await login(
      userCredentials.email,
      userCredentials.password
    );
    setLoading(false);

    if (!response.success) {
      setError(response.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
      Toast.show(response.msg);
      return;
    }
    navigation.replace("ChatStack");
  };
  const navigateToSignUp = () => {
    setUserCredentials({
      email: "",
      password: "",
    });
    setShowPassword(false);
    setError(null);
    setLoading(false);
    navigation.navigate("Signup");
  };
  return (
    <CustomKeyboard>
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/* Welcome image */}
        <View className="items-center">
          <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/welcome.png")}
          />
        </View>

        <View className="flex items-center space-y-4">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="font-bold tracking-wider text-center text-neutral-800"
            style={{ fontSize: hp(5), marginBottom: hp(2.5) }}
          >
            Login
          </Animated.Text>
          {/* Error message */}
          {error && (
            <Animated.Text
              entering={FadeInLeft}
              exiting={FadeOutUp}
              className="text-red-400 font-bold text-center text-base"
            >
              {error}
            </Animated.Text>
          )}
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={{ height: hp(7) }}
            className="flex-row px-4 space-x-4 bg-black/5 items-center rounded-2xl"
          >
            <EnvelopeIcon size={hp(2.71)} strokeWidth={2} color="gray" />
            <TextInput
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Email"
              // placeholder="Username or Phone number"
              placeholderTextColor={"gray"}
              value={userCredentials.email}
              onChangeText={(text) =>
                setUserCredentials({ ...userCredentials, email: text })
              }
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            style={{ height: hp(7) }}
            className="flex-row px-4 space-x-4 bg-black/5 items-center rounded-2xl"
          >
            <LockClosedIcon size={hp(2.71)} strokeWidth={2} color="gray" />
            <TextInput
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry={showPassword ? false : true}
              value={userCredentials.password}
              onChangeText={(text) =>
                setUserCredentials({ ...userCredentials, password: text })
              }
            />

            {/* Show password toggle */}
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <EyeSlashIcon size={hp(2.71)} strokeWidth={2} color="gray" />
              ) : (
                <EyeIcon size={hp(2.71)} strokeWidth={2} color="gray" />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View className="space-y-3">
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              className="flex-row justify-center items-center space-x-4 rounded-2xl p-3 bg-blue-400"
              disabled={loading}
              onPress={handleLogin}
            >
              {!loading ? (
                <Text className="text-xl font-bold text-center text-white">
                  Login
                </Text>
              ) : (
                <ActivityIndicator color={"white"} />
              )}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text style={{ fontSize: hp(1.8) }}>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={{ fontSize: hp(1.8) }} className="text-blue-600">
                Sign up
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </CustomKeyboard>
  );
}
