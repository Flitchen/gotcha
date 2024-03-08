import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  ArrowLeftStartOnRectangleIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import FriendList from "../components/friendList";
import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Loading from "../components/loading";
export default function Home() {
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    await logout();
    navigation.replace("AuthStack");
  };
  const handleMorePress = () => {
    setShowMoreOptions(true);
  };
  const handleTouchablePress = () => {
    setShowMoreOptions(false);
  };

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      or(
        where("firstUserId", "==", user.userId ? user.userId : user.uid),
        where("secondUserId", "==", user.userId ? user.userId : user.uid)
      )
    );

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let myChatRooms = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setFriends([...myChatRooms]);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // console.log(friends);
  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View className="flex-1">
        <View className="py-3 px-6 bg-blue-400 rounded-b-3xl flex-row justify-between items-center shadow">
          <Text style={{ fontSize: hp(3) }} className=" text-white font-bold">
            Gotcha
          </Text>

          <TouchableOpacity onPress={handleMorePress}>
            <EllipsisVerticalIcon
              size={hp(2.71)}
              strokeWidth={2}
              color="white"
            />
          </TouchableOpacity>

          {showMoreOptions && (
            <MoreOptions
              navigation={navigation}
              handleTouchablePress={handleTouchablePress}
              handleLogout={handleLogout}
              showMoreOptions={showMoreOptions}
            />
          )}
        </View>
        {loading ? (
          <Loading />
        ) : (
          <FriendList
            friends={friends}
            currentUser={user}
            navigation={navigation}
          />
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriend")}
          className="p-3 absolute bottom-10 right-5 z-50 rounded-full bg-blue-400"
        >
          <PlusIcon size={hp(3)} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const MoreOptions = ({
  navigation,
  handleTouchablePress,
  handleLogout,
  showMoreOptions,
}) => {
  return (
    <Modal transparent visible={showMoreOptions}>
      <View className="absolute top-5 right-2 z-50 mt-6 mr-2 bg-white rounded-lg p-4 space-y-3">
        <TouchableOpacity
          className=" flex-row space-x-5 items-center"
          onPress={() => {
            navigation.navigate("UserProfile");
            handleTouchablePress();
          }}
        >
          <UserCircleIcon size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            View Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          className=" flex-row space-x-5 items-center"
        >
          <ArrowLeftStartOnRectangleIcon size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View onTouchEnd={handleTouchablePress} className="flex-1"></View>
    </Modal>
  );
};
