import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { useAuth } from "../context/authContext";
import UserList from "../components/userList";
import { usersRef } from "../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import Loading from "../components/loading";

export default function AddFriend() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.userId));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
    setLoading(false);
  };

  return (
    <View className="flex-1">
      <View className="py-3 px-6 bg-blue-400 shadow">
        {!startSearch ? (
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={hp(3)} color={"white"} />
              </TouchableOpacity>
              <Animated.Text
                entering={FadeInLeft.duration(250)}
                style={{ fontSize: hp(2) }}
                className=" text-white text-center font-semibold"
              >
                Choose friend
              </Animated.Text>
            </View>
            <TouchableOpacity onPress={() => setStartSearch(true)}>
              <Text>
                <MagnifyingGlassIcon size={hp(3)} color="white" />{" "}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity
              onPress={() => {
                setStartSearch(false);
                setSearch("");
              }}
            >
              <ArrowLeftIcon size={hp(3)} color={"white"} />
            </TouchableOpacity>

            <TextInput
              value={search}
              placeholder="Search"
              placeholderTextColor={"white"}
              className="text-white flex-1"
              selectionColor={"white"}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
        )}
      </View>
      {loading ? (
        <Loading />
      ) : (
        <UserList users={users} searchedUser={search} navigation={navigation} />
      )}
    </View>
  );
}
