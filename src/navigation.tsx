import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CampaignList from "./pages/CampaignList";
import CampaignDetail from "./pages/CampaignDetail";
import PlaySession from "./pages/PlaySession";
import EditSession from "./pages/EditSession";
import EndSession from "./pages/EndSession";
import { ROUTES } from "./models/route";



const RootStack = createNativeStackNavigator({
  screens: {
    [ROUTES.HOME]: CampaignList,
    [ROUTES.DETAILS]: CampaignDetail,
    [ROUTES.SESSION]: PlaySession,
    [ROUTES.EDIT_SESSION]: EditSession,
    [ROUTES.SCORE]: EndSession
  },
});

export const Navigation = createStaticNavigation(RootStack);