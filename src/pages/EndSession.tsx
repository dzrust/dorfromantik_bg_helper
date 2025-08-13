import { Button } from "../components/ui/Button";
import { Card, CardSection, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import React, { useState } from "react";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import { ROUTES } from "../models/route";
import { Page } from "../components/ui/Page";

type Props = StaticScreenProps<{
  campaignId: string;
}>;

export default function EndSession({ route }: Props) {
  const { campaignId } = route.params;
  const navigation = useNavigation<any>();
  const [flags, setFlags] = useState({ grain: "", city: "", forest: "" });
  const [longest, setLongest] = useState({ railroad: "", river: "" });

  return (
    <Page>
      <Card>
        <CardTitle>Scoring</CardTitle>
        <CardSection>
          <Input placeholder="Flags Grain" value={flags.grain} onChangeText={(v) => setFlags({ ...flags, grain: v })} />
          <Input placeholder="Flags City" value={flags.city} onChangeText={(v) => setFlags({ ...flags, city: v })} />
          <Input
            placeholder="Flags Forest"
            value={flags.forest}
            onChangeText={(v) => setFlags({ ...flags, forest: v })}
          />
          <Input
            placeholder="Longest Railroad"
            value={longest.railroad}
            onChangeText={(v) => setLongest({ ...longest, railroad: v })}
          />
          <Input
            placeholder="Longest River"
            value={longest.river}
            onChangeText={(v) => setLongest({ ...longest, river: v })}
          />
        </CardSection>
        <Button onPress={() => navigation.navigate(ROUTES.DETAILS, { id: campaignId })}>Save</Button>
      </Card>
    </Page>
  );
}
