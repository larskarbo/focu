import React from "react"
import App2 from "../app-v2/App";
import { View } from "react-native-web";

function Index() {
  return (
    <View className="flex flex-col pt-0 to-yellow-50 min-h-screen">
      <App2 />
    </View>
  );
}

export default Index;
