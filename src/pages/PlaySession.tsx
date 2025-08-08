import { Card, CardSection, CardTitle } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

export default function PlaySession({ route, navigation }: any) {
  const { campaignId } = route.params;
  const [tilesInPlay, setTilesInPlay] = useState<any[]>([]);

  return (
    <View className="flex-1 bg-neutral-50 p-4">
      <Card>
        <CardTitle>Tiles In Play</CardTitle>
        <FlatList
          data={tilesInPlay}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <CardSection>
              <Text>
                {item.type} {item.value}
              </Text>
              <Pressable onPress={() => {}}>Complete</Pressable>
            </CardSection>
          )}
        />
        <Select
          options={[
            { label: "Grain", value: "grain" },
            { label: "City", value: "city" },
            { label: "Railroad", value: "railroad" },
            { label: "River", value: "river" },
            { label: "Forest", value: "forest" },
          ]}
          onChange={(type) => {}}
          placeholder="Reveal Tile Type"
        />
      </Card>
      <Pressable onPress={() => navigation.navigate("EndSession", { campaignId })}>End Session</Pressable>
    </View>
  );
}
