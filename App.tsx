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

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  );
}

export default App;
