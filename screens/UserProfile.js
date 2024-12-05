import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { blurhash } from "../utils/elements";
import { useAuth } from "../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  PencilIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Toast from "react-native-simple-toast";

export default function UserProfile() {
  const { user, updateUserData } = useAuth();
  const navigation = useNavigation();
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);

  const updateBio = async () => {
    setLoading(true);
    const docRef = doc(db, "users", user.userId);
    await updateDoc(docRef, {
      bio,
    });
    updateUserData(user.userId);
    Toast.show("Bio updated successfully");
    setLoading(false);
    setEditBio(false);
  };

  const goBack = () => {
    setEditBio(false);
    navigation.goBack();
  };

  return (
    <View className="flex-1 space-y-6">
      <View className="absolute top-5 left-5 z-50">
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon size={hp(3)} color={"black"} />
        </TouchableOpacity>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="items-center py-10">
          {/* Profile Picture */}
          <View className=" p-1 bg-red-600 rounded-full">
            <Image
              style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profilePic}
              placeholder={blurhash}
              transition={500}
            />
            <TouchableOpacity className="absolute right-0 bottom-0">
              <PencilSquareIcon size={hp(3)} color={"gray"} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-4 py-6 space-y-6">
          <View className="flex-row space-x-4 items-center">
            <UserCircleIcon size={hp(5)} color={"gray"} />
            <View className="flex-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-400 tracking-wider"
              >
                Username
              </Text>
              <Text style={{ fontSize: hp(2.6) }} className=" text-black">
                {user?.username}
              </Text>
            </View>
          </View>
          <View className="flex-row space-x-4 items-center">
            <InformationCircleIcon size={hp(5)} color={"gray"} />
            <View className="flex-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-400 tracking-wider"
              >
                Bio
              </Text>
              {!editBio ? (
                <Text style={{ fontSize: hp(2.5) }} className=" text-black">
                  {user?.bio}
                </Text>
              ) : (
                <TextInput
                  style={{ fontSize: hp(2.6) }}
                  className=" w-full font-semibold text-primary-text"
                  placeholder="Your Bio"
                  autoFocus={editBio}
                  value={bio}
                  onChangeText={(text) => setBio(text)}
                />
              )}
            </View>

            {!editBio ? (
              <TouchableOpacity onPress={() => setEditBio(true)}>
                <PencilSquareIcon size={hp(3)} color={"gray"} />
              </TouchableOpacity>
            ) : (
              <>
                {loading ? (
                  <ActivityIndicator color="#60A5FA" />
                ) : (
                  <TouchableOpacity onPress={updateBio}>
                    <CheckCircleIcon size={hp(3)} color={"gray"} />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
