import { Button } from "../components/ui/Button";
import { Card, CardTitle, CardSection } from "../components/ui/Card";
import React from "react";
import { View, FlatList, Pressable, Text } from "react-native";

const campaigns = [{ id: "1", name: "Family Run", startDate: "2025-08-01" }];

export default function CampaignList({ navigation }: any) {
  return (
    <View className="flex-1 bg-neutral-50 p-4">
      <Button onPress={() => navigation.navigate("NewCampaign")}>+ New Campaign</Button>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("CampaignDetail", { id: item.id })}>
            <Card className="mt-4">
              <CardTitle>{item.name}</CardTitle>
              <CardSection>
                <Text className="text-neutral-500">Started {item.startDate}</Text>
              </CardSection>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}
