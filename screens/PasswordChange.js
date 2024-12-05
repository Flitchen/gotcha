import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updatePassword } from "firebase/auth";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  LockOpenIcon,
} from "react-native-heroicons/outline";

export default function PasswordChange() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const changePassword = async () => {
    if (password.trim == "" || confirmPassword.trim() == "") {
      Alert.alert("Error", "Please fill all the fields");

      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");

      return;
    }
    setLoading(true);
    updatePassword(user, password)
      .then(() => {
        Alert.alert("Success", "Password changed successfully");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes("(auth/weak-password)")) {
          Alert.alert("Error", " Password should be at least 6 characters");
        } else {
          Alert.alert("Error", "Password could not be changed");
        }
      });
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 25,
        }}
      >
        <View className="space-y-16">
          <View className="relative">
            <TouchableOpacity
              className="absolute  z-50 top-5 left-4 bg-white p-2 rounded-full"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeftIcon size={hp(3)} color={"black"} />
            </TouchableOpacity>
            <Text className="text-center font-bold text-lightBlack text-2xl my-5 tracking-wider">
              Change Password
            </Text>
          </View>

          {/* Text Inputs */}
          <View className="space-y-3 px-6">
            <View className="space-y-2">
              <Text>New Password:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <LockOpenIcon size={hp(2.71)} strokeWidth={2} color="gray" />

                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="New password"
                  secureTextEntry={showPassword ? false : true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {/* Show password toggle */}
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon
                      size={hp(2.71)}
                      strokeWidth={2}
                      color="gray"
                    />
                  ) : (
                    <EyeIcon size={hp(2.71)} strokeWidth={2} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View className="space-y-2">
              <Text>Confirm Password:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <LockOpenIcon size={hp(2.71)} strokeWidth={2} color="gray" />

                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="Confirm new password"
                  secureTextEntry={showConfirmPassword ? false : true}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
                {/* Show password toggle */}
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon
                      size={hp(2.71)}
                      strokeWidth={2}
                      color="gray"
                    />
                  ) : (
                    <EyeIcon size={hp(2.71)} strokeWidth={2} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Change password button */}
        <TouchableOpacity
          disabled={loading}
          onPress={changePassword}
          style={{ width: wp(70), backgroundColor: "#60A5FA" }}
          className={`self-center my-10 px-10 py-3 rounded-lg ${
            loading ? "opacity-50" : ""
          }`}
        >
          <Text
            style={{ fontSize: hp(2.2) }}
            className="text-white font-bold tracking-widest text-center"
          >
            {!loading ? (
              "Change Password"
            ) : (
              <ActivityIndicator color="#FFFFFF" />
            )}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
