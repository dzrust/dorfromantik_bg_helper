/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css";
import { useColorScheme } from "react-native";
import { Navigation } from "./src/navigation";
import { ToastProvider } from "./src";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <Navigation />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

export default App;
