import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { blurhash } from "../utils/elements";
import { doc, getDoc } from "firebase/firestore";
import FriendItem from "./friendItem";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function FriendList({ friends, currentUser, navigation }) {
  return (
    <View className="flex-1 py-3">
      {friends?.length > 0 ? (
        <FlatList
          data={friends}
          keyExtractor={(item) => item.roomId}
          renderItem={({ item }) => (
            <FriendItem
              item={item}
              currentUser={currentUser}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View className="justify-center items-center">
          <Text style={{ fontSize: hp(3) }} className="text-neutral-400">
            Create new chat
          </Text>
        </View>
      )}
    </View>
  );
}
