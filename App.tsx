/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css";
import { useColorScheme } from "react-native";
import { Navigation } from "./src/navigation";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return <Navigation />;
}

export default App;
