import { Button } from "../components/ui/Button";
import { Card, CardTitle } from "../components/ui/Card";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import { ROUTES } from "../models/route";

type Props = StaticScreenProps<{
  id: string;
}>;

const sessions = [{ id: "s1", index: 1, totalScore: 120 }];

export default function CampaignDetail({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation<any>();
  return (
    <View className="flex-1 bg-neutral-50 p-4">
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
    </View>
  );
}
