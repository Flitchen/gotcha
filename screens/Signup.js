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
  PhoneIcon,
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
import Toast from "react-native-simple-toast";
import { useAuth } from "../context/authContext";

export default function Signup() {
  const navigation = useNavigation();
  const { signup } = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      userInfo.email.trim() == "" ||
      userInfo.username.trim() == "" ||
      userInfo.password.trim() == "" ||
      passwordConfirm.trim() == ""
    ) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    if (passwordConfirm !== userInfo.password) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    setLoading(true);

    let response = await signup(
      userInfo.email,
      userInfo.username,
      userInfo.password
    );
    setLoading(false);

    if (!response.success) {
      Toast.show(response.msg);
      return;
    }
    navigation.replace("ChatStack");
  };
  const navigateToLogin = () => {
    setUserInfo({
      email: "",
      username: "",
      password: "",
    });
    setShowConfirmPassword(false);
    setPasswordConfirm("");
    setShowPassword(false);
    setError(null);
    setLoading(false);
    navigation.navigate("Login");
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
            source={require("../assets/images/signup.png")}
          />
        </View>

        <View className="flex items-center space-y-4">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="font-bold tracking-wider text-center text-neutral-800"
            style={{ fontSize: hp(5), marginBottom: hp(2.5) }}
          >
            Sign Up
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
            {/* <PhoneIcon size={hp(2.71)} strokeWidth={2} color="gray" /> */}
            <TextInput
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Email"
              // placeholder="Phone number"
              placeholderTextColor={"gray"}
              keyboardType="email-address"
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={{ height: hp(7) }}
            className="flex-row px-4 space-x-4 bg-black/5 items-center rounded-2xl"
          >
            <UserIcon size={hp(2.71)} strokeWidth={2} color="gray" />
            <TextInput
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Username"
              placeholderTextColor={"gray"}
              value={userInfo.username}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, username: text })
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
              value={userInfo.password}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, password: text })
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
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            style={{ height: hp(7) }}
            className="flex-row px-4 space-x-4 bg-black/5 items-center rounded-2xl"
          >
            <LockClosedIcon size={hp(2.71)} strokeWidth={2} color="gray" />
            <TextInput
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
              secureTextEntry={showConfirmPassword ? false : true}
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text)}
            />

            {/* Show password toggle */}
            <TouchableOpacity
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
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
              onPress={handleSignUp}
              disabled={loading}
            >
              {!loading ? (
                <Text className="text-xl font-bold text-center text-white">
                  Sign Up
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
            <Text style={{ fontSize: hp(1.8) }}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={{ fontSize: hp(1.8) }} className="text-blue-600">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </CustomKeyboard>
  );
}
