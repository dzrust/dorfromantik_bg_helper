/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css";
import { useColorScheme, View } from "react-native";
import { Label } from "./src";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Label>Welcome to Nativewind!</Label>
    </View>
  );
}

export default App;
