import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { blurhash } from "../utils/elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function UserList({ users, navigation, searchedUser }) {
  const renderUserItem = ({ item }) => {
    if (searchedUser == "") {
      return (
        <TouchableOpacity
          className=" border-b border-b-neutral-200"
          onPress={() =>
            navigation.replace("ChatRoom", {
              item: item?.userId,
              username: item?.username,
              profilePic: item?.profilePic,
            })
          }
        >
          <View className="rounded p-2 flex-row items-center">
            <View className="p-1 bg-cyan-600/10 rounded-full">
              <Image
                style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
                source={item?.profilePic}
                placeholder={blurhash}
                transition={500}
              />
            </View>
            <View className="ml-2">
              <Text className="text-black text-xl text-semibold">
                {item?.username}
              </Text>
              <Text>
                {item?.bio.length > 36
                  ? item?.bio.slice(0, 36) + "..."
                  : item?.bio}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if (item?.username.toLowerCase().includes(searchedUser.toLowerCase())) {
      return (
        <TouchableOpacity
          className=" border-b border-b-neutral-200"
          onPress={() =>
            navigation.replace("ChatRoom", {
              item: item?.userId,
              username: item?.username,
              profilePic: item?.profilePic,
            })
          }
        >
          <View className="rounded p-2 flex-row items-center">
            <View className="p-1 bg-cyan-600/10 rounded-full">
              <Image
                style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
                source={item?.profilePic}
                placeholder={blurhash}
                transition={500}
              />
            </View>
            <View className="ml-2">
              <Text className="text-black text-xl text-semibold">
                {item?.username}
              </Text>
              <Text>
                {item?.bio.length > 36
                  ? item?.bio.slice(0, 36) + "..."
                  : item?.bio}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View className="py-3">
      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.userId}
          renderItem={renderUserItem}
        />
      ) : (
        <View className="items-center justify-center">
          <Text style={{ fontSize: hp(3) }} className="text-neutral-400">
            No user found
          </Text>
        </View>
      )}
    </View>
  );
}
