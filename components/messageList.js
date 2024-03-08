import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MessageList({ messages, currentUser, scrollRef }) {
  // console.log(messages);
  // const renderMessageBubble = ({ item }) => {
  //   const bubbleColor =
  //     item.userId === currentUser?.userId
  //       ? "bg-white rounded-tl-lg"
  //       : "bg-cyan-200 rounded-tr-lg";
  //   const textColor =
  //     item.userId === currentUser?.userId ? "text-black" : "text-black";
  //   const textPosition =
  //     item.userId === currentUser?.userId ? "flex-row-reverse" : "flex-row";
  //   const marginSize = item.userId === currentUser?.userId ? "mr-0" : "mr-8";
  //   const timePosition =
  //     item.userId === currentUser?.userId ? "self-end" : "self-start";

  //   return (
  //     <View className={`mb-2 px-2 ${textPosition}`}>
  //       <View>
  //         <View
  //           className={` rounded-b-lg px-4 py-2 ${bubbleColor} ${marginSize}`}
  //         >
  //           <Text style={{ fontSize: hp(2.2) }} className={`${textColor}`}>
  //             {item.message}
  //           </Text>
  //         </View>
  //         <Text
  //           style={{ fontSize: hp(1.2) }}
  //           className={`mt-1 mx-2 ${timePosition}`}
  //         >
  //           {new Date(
  //             parseInt(item?.createdAt?.seconds) * 1000
  //           ).toLocaleTimeString("en-US", {
  //             hour: "numeric",
  //             minute: "numeric",
  //             hour12: true,
  //           })}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <View className="py-2">
      {/* <FlatList
        data={messages}
        keyExtractor={(item) => item.createdAt}
        renderItem={renderMessageBubble}
      /> */}
      <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 60 }}>
        {messages.map((item) => {
          const bubbleColor =
            item.userId === currentUser?.userId
              ? "bg-white rounded-tl-lg"
              : "bg-cyan-200 rounded-tr-lg";
          const textColor =
            item.userId === currentUser?.userId ? "text-black" : "text-black";
          const textPosition =
            item.userId === currentUser?.userId
              ? "flex-row-reverse"
              : "flex-row";
          const marginSize =
            item.userId === currentUser?.userId ? "mr-0" : "mr-8";
          const timePosition =
            item.userId === currentUser?.userId ? "self-end" : "self-start";

          return (
            <View className={`mb-2 px-2 ${textPosition}`} key={item.createdAt}>
              <View>
                <View
                  className={` rounded-b-lg px-4 py-2 ${bubbleColor} ${marginSize}`}
                >
                  <Text
                    style={{ fontSize: hp(2.2) }}
                    className={`${textColor}`}
                  >
                    {item.message}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: hp(1.2) }}
                  className={`mt-1 mx-2 ${timePosition}`}
                >
                  {new Date(
                    parseInt(item?.createdAt?.seconds) * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
