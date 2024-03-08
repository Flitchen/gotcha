import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ArrowUpOnSquareIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MicrophoneIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/authContext";
import { blurhash, getRoomId } from "../utils/elements";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import MessageList from "../components/messageList";
import Toast from "react-native-simple-toast";
import { Image } from "expo-image";
import Animated, { FadeInRight } from "react-native-reanimated";
import Loading from "../components/loading";

export default function ChatRoom() {
  const { params } = useRoute();
  // console.log("params: ", params.item);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState({});
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const getFriend = async (id) => {
    let docRef = doc(db, "users", id);
    let docSnap = await getDoc(docRef);
    // console.log("docsnap: ", docSnap.data());
    setFriend({ ...docSnap.data() });
  };
  const handleMorePress = () => {
    setShowMoreOptions((prev) => !prev);
  };
  const handleTouchablePress = () => {
    setShowMoreOptions(false);
  };
  const sendMessage = async () => {
    try {
      let newMesssage = message;
      setMessage("");
      let roomId = getRoomId(user?.userId, friend?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        message: newMesssage,
        profilePic: user?.profilePic,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      // console.log("messageId: ", newDoc.id);
    } catch (error) {
      console.log(error);
    }
  };
  const createRoomIfNotExist = async () => {
    let roomId = getRoomId(user?.userId, params.item);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
      firstUserId: user?.userId,
      firstUsername: user?.username,
      firstUserProfilePic: user?.profilePic,
      secondUserId: params?.item,
      secondUsername: params?.username,
      secondUserProfilePic: params?.profilePic,
    });
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);
  const updateScrollView = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  useEffect(() => {
    getFriend(params.item);
    createRoomIfNotExist();
    let roomId = getRoomId(user?.userId, params?.item);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    // setTimeout(() => setLoading(false), 1000);
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
      setLoading(false);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unsubscribe();
      KeyboardDidShowListener.remove();
    };
  }, []);
  return (
    <TouchableWithoutFeedback onPress={() => setShowMoreOptions(false)}>
      <View className="flex-1">
        {showMoreOptions && (
          <MoreOptions
            navigation={navigation}
            handleTouchablePress={handleTouchablePress}
            showMoreOptions={showMoreOptions}
          />
        )}
        {/* Chat Header */}
        <View className="flex-row space-x-4 px-4 py-2 justify-between items-center bg-white/80 shadow">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={hp(3)} color={"black"} />
          </TouchableOpacity>
          <View className="flex-1 flex-row space-x-2 ">
            <View className="p-1 self-start bg-cyan-600/10 rounded-full">
              <Image
                style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
                source={friend?.profilePic}
                placeholder={blurhash}
                transition={500}
              />
            </View>

            <View>
              <Animated.Text
                entering={FadeInRight.duration(500)}
                className="font-bold text-lg "
              >
                {friend?.username}
              </Animated.Text>
              <Animated.Text
                entering={FadeInRight.duration(500)}
                className="text-cyan-950 text-sm"
              >
                {friend?.bio?.length > 30
                  ? friend?.bio.slice(0, 30) + "..."
                  : friend?.bio}
              </Animated.Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleMorePress}>
            <EllipsisVerticalIcon
              size={hp(2.71)}
              strokeWidth={2}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior="height"
          className="flex-1 justify-between"
          // keyboardVerticalOffset={120}
        >
          {loading ? (
            <Loading />
          ) : (
            <MessageList
              scrollRef={scrollRef}
              messages={messages}
              currentUser={user}
            />
          )}
          {/* Text Input for writing messages */}
          <View className="absolute bottom-0 space-x-2 px-2 py-3 flex-row items-center bg-white border-t border-gray-300">
            {/* Upload media icon */}
            <TouchableOpacity
              className="mr-2"
              onPress={() => {
                Toast.show("This feature currently does not work");
              }}
            >
              {/* Add Icon SVG */}
              <ArrowUpOnSquareIcon color={"#60A5FA"} size={hp(3)} />
            </TouchableOpacity>

            {/* <View className="w-2/3"> */}
            <TextInput
              placeholder="Type Message"
              multiline={true}
              value={message}
              onChangeText={(text) => setMessage(text)}
              className="flex-1 py-1 rounded-full"
            />
            {/* </View> */}

            <View className="flex-row items-center ">
              {!message ? (
                <TouchableOpacity
                  onPress={() => {
                    Toast.show("This feature currently does not work");
                  }}
                >
                  {/* Record Icon SVG */}
                  <MicrophoneIcon color={"#60A5FA"} size={hp(3)} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    sendMessage();
                  }}
                >
                  {/* Send Icon Svg */}
                  <PaperAirplaneIcon color={"#60A5FA"} size={hp(3)} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const MoreOptions = ({ navigation, handleTouchablePress, showMoreOptions }) => {
  return (
    <Modal transparent={true} visible={showMoreOptions}>
      <View className="absolute top-10 right-2 z-50 mt-6 mr-2 bg-white rounded-lg p-4 space-y-3">
        <TouchableOpacity
          onPress={() => {
            Toast.show("This feature currently does not work");
          }}
          className=" flex-row space-x-5 items-center"
        >
          <MagnifyingGlassIcon size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Toast.show("This feature currently does not work");
          }}
          className=" flex-row space-x-5 items-center"
        >
          <MapPinIcon size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            View Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Toast.show("This feature currently does not work");
          }}
          className=" flex-row space-x-5 items-center"
        >
          <TrashIcon size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Clear Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Toast.show("This feature currently does not work");
          }}
          className=" flex-row space-x-5 items-center"
        >
          <NoSymbolIcon size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Block
          </Text>
        </TouchableOpacity>
      </View>
      <View onTouchEnd={handleTouchablePress} className="flex-1"></View>
    </Modal>
  );
};
