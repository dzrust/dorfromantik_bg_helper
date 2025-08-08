import { Card, CardSection, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

export default function EndSession({ route, navigation }: any) {
  const { campaignId } = route.params;
  const [flags, setFlags] = useState({ grain: "", city: "", forest: "" });
  const [longest, setLongest] = useState({ railroad: "", river: "" });

  return (
    <View className="flex-1 bg-neutral-50 p-4">
      <Card>
        <CardTitle>Scoring</CardTitle>
        <CardSection>
          <Input placeholder="Flags Grain" value={flags.grain} onChangeText={(v) => setFlags({ ...flags, grain: v })} />
          <Input placeholder="Flags City" value={flags.city} onChangeText={(v) => setFlags({ ...flags, city: v })} />
          <Input placeholder="Flags Forest" value={flags.forest} onChangeText={(v) => setFlags({ ...flags, forest: v })} />
          <Input placeholder="Longest Railroad" value={longest.railroad} onChangeText={(v) => setLongest({ ...longest, railroad: v })} />
          <Input placeholder="Longest River" value={longest.river} onChangeText={(v) => setLongest({ ...longest, river: v })} />
        </CardSection>
        <Pressable onPress={() => navigation.navigate("CampaignDetail", { id: campaignId })}>Save</Pressable>
      </Card>
    </View>
  );
}
