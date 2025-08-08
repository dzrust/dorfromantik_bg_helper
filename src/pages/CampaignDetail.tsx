import { Button } from "../components/ui/Button";
import { Card, CardTitle } from "../components/ui/Card";
import React from "react";
import { View, Text, FlatList } from "react-native";

const sessions = [{ id: "s1", index: 1, totalScore: 120 }];

export default function CampaignDetail({ route, navigation }: any) {
  const { id } = route.params;
  return (
    <View className="flex-1 bg-neutral-50 p-4">
      <Button onPress={() => navigation.navigate("PlaySession", { campaignId: id })}>Start Session</Button>
      <FlatList
        data={sessions}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card className="mt-4">
            <CardTitle>Session {item.index}</CardTitle>
            <Text>Total Score: {item.totalScore}</Text>
            <Button variant="ghost" onPress={() => navigation.navigate("EditSession", { id: item.id })}>Edit</Button>
          </Card>
        )}
      />
    </View>
  );
}
