import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { blurhash } from "../utils/elements";
import { useAuth } from "../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  PencilIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function UserProfile() {
  const { user } = useAuth();
  const navigation = useNavigation();
  return (
    <View className="flex-1 space-y-6">
      <View className="absolute top-5 left-5 z-50">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={hp(3)} color={"black"} />
        </TouchableOpacity>
      </View>
      <View className="items-center py-10">
        {/* Profile Picture */}
        <View className="p-1 bg-cyan-600/20 rounded-full">
          <Image
            style={{ height: hp(20), aspectRatio: 1, borderRadius: 100 }}
            source={user?.profilePic}
            placeholder={blurhash}
            transition={500}
          />
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
          <PencilSquareIcon size={hp(3)} color={"gray"} />
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
            <Text style={{ fontSize: hp(2.5) }} className=" text-black">
              {user?.bio}
            </Text>
          </View>
          <PencilSquareIcon size={hp(3)} color={"gray"} />
        </View>
      </View>
    </View>
  );
}
