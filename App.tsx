/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css";
import { useColorScheme, View } from "react-native";
import CampaignList from "./src/pages/CampaignList";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return <CampaignList />;
}

export default App;
