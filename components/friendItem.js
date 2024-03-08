import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { blurhash, formatDate } from "../utils/elements";
import { db } from "../firebaseConfig";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FriendItem({ item, currentUser, navigation }) {
  let friendUsername =
    item.firstUserId != currentUser?.userId
      ? item.firstUsername
      : item.secondUsername;
  let friendId =
    item.firstUserId != currentUser?.userId
      ? item.firstUserId
      : item.secondUserId;
  let friendProfilePic =
    item.firstUserId != currentUser?.userId
      ? item.firstUserProfilePic
      : item.secondUserProfilePic;

  const [lastMessage, setLastMessage] = useState(undefined);

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId)
        return `You: ${
          lastMessage?.message?.length > 32
            ? lastMessage?.message?.slice(0, 32) + "..."
            : lastMessage?.message
        }`;
      return lastMessage?.message?.length > 32
        ? lastMessage?.message?.slice(0, 32)
        : lastMessage?.message;
    } else {
      return `Connect with friend 🙋‍♂️`;
    }
  };
  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };
  useEffect(() => {
    let roomId = item.roomId;
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    // setTimeout(() => setLoading(false), 1000);
    const q = query(messageRef, orderBy("createdAt", "desc"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsubscribe;
  }, []);
  //   console.log("lastMessage: ", lastMessage);
  return (
    <TouchableOpacity
      className=" border-b border-b-neutral-200"
      onPress={() =>
        navigation.navigate("ChatRoom", {
          item: friendId,
          username: friendUsername,
          profilePic: friendProfilePic,
        })
      }
    >
      <View className="rounded p-2 space-x-4 flex-row items-center">
        <View className="p-1 bg-cyan-600/10 rounded-full">
          <Image
            style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
            source={friendProfilePic}
            placeholder={blurhash}
            transition={500}
          />
        </View>
        <View className="ml-2 flex-1">
          <Text
            style={{ fontSize: hp(2.7) }}
            className="text-black text-xl text-semibold"
          >
            {friendUsername}
          </Text>
          {/* <Text>
                        {item?.bio.length > 35
                          ? item?.bio.slice(0, 35) + "..."
                          : item?.bio}
                      </Text> */}
          <Text style={{ fontSize: hp(1.8) }}>{renderLastMessage()}</Text>
        </View>
        <View>
          <Text>{renderTime()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
