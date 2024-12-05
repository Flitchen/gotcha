import { View, Text, FlatList } from "react-native";
import React from "react";
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
