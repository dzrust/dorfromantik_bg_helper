import { PlaySessionDB } from "@/db/schema";
import { ROUTES } from "@/models/route";
import { useRouter } from "expo-router";
import { DateTime } from "luxon";
import { View } from "react-native";
import { Button, ButtonText } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

export type SessionCardProps = {
  item: PlaySessionDB;
};

export const SessionCard = ({ item }: SessionCardProps) => {
  const router = useRouter();
  const goToRoute = (route: ROUTES) =>
    router.navigate(route.replace("[sessionId]", `${item.id}`));
  return (
    <Card className="mt-4">
      <Heading>Session {item.index}</Heading>
      <Text className="text-neutral-500">
        {DateTime.fromISO(item.date).toFormat("MMM dd, yyyy")}
      </Text>
      <View className="flex-row gap-2 mt-2">
        <Button variant="outline" onPress={() => goToRoute(ROUTES.SESSION)}>
          <ButtonText>Play</ButtonText>
        </Button>
        <Button variant="outline" onPress={() => goToRoute(ROUTES.SCORE)}>
          <ButtonText>Score</ButtonText>
        </Button>
        <Button
          variant="outline"
          onPress={() => goToRoute(ROUTES.EDIT_SESSION)}
        >
          <ButtonText>Edit</ButtonText>
        </Button>
      </View>
    </Card>
  );
};
