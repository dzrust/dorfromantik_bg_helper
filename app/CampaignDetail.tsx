import { ROUTES } from "@/models/route";
import { Button } from "@/src/componentscomponents/ui/Button";
import { Card, CardTitle } from "@/src/componentscomponents/ui/Card";
import { Page } from "@/src/componentscomponents/ui/Page";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import React from "react";
import { FlatList, Text } from "react-native";

type Props = StaticScreenProps<{
  id: string;
}>;

const sessions = [{ id: "s1", index: 1, totalScore: 120 }];

export default function CampaignDetail({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation<any>();
  return (
    <Page>
      <Button onPress={() => navigation.navigate(ROUTES.SESSION, { campaignId: id })}>Start Session</Button>
      <FlatList
        data={sessions}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card className="mt-4">
            <CardTitle>Session {item.index}</CardTitle>
            <Text>Total Score: {item.totalScore}</Text>
            <Button variant="ghost" onPress={() => navigation.navigate(ROUTES.EDIT_SESSION, { id: item.id })}>Edit</Button>
          </Card>
        )}
      />
    </Page>
  );
}
