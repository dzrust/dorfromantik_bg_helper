import { Button } from "@/src/componentscomponents/ui/Button";
import { Card, CardSection, CardTitle } from "@/src/componentscomponents/ui/Card";
import { Page } from "@/src/componentscomponents/ui/Page";
import { Select } from "@/src/componentscomponents/ui/Select";
import type { StaticScreenProps } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import { ROUTES } from "../models/route";

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
