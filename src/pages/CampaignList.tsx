import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/ui/Button";
import { Card, CardTitle, CardSection } from "../components/ui/Card";
import React from "react";
import { FlatList, Pressable, Text } from "react-native";
import { ROUTES } from "../models/route";
import { Page } from "../components/ui/Page";

const campaigns = [{ id: "1", name: "Family Run", startDate: "2025-08-01" }];

export default function CampaignList() {
  const navigation = useNavigation<any>();
  return (
    <Page>
      <Button onPress={() => navigation.navigate(ROUTES.NEW)}>Start Campaign</Button>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate(ROUTES.DETAILS, { id: item.id })}>
            <Card className="mt-4">
              <CardTitle>{item.name}</CardTitle>
              <CardSection>
                <Text className="text-neutral-500">Started {item.startDate}</Text>
              </CardSection>
            </Card>
          </Pressable>
        )}
      />
    </Page>
  );
}
