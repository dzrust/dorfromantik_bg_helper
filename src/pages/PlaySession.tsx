import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/ui/Button";
import { Card, CardSection, CardTitle } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import React, { useState } from "react";
import { Text, FlatList } from "react-native";
import type { StaticScreenProps } from "@react-navigation/native";
import { ROUTES } from "../models/route";
import { Page } from "../components/ui/Page";

type Props = StaticScreenProps<{
  campaignId: string;
}>;

export default function PlaySession({ route }: Props) {
  const navigation = useNavigation<any>();
  const { campaignId } = route.params;
  const [tilesInPlay, setTilesInPlay] = useState<any[]>([]);

  return (
    <Page>
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
              <Button onPress={() => {}}>Complete</Button>
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
      <Button onPress={() => navigation.navigate(ROUTES.SCORE, { campaignId })}>End Session</Button>
    </Page>
  );
}
