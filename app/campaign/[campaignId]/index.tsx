import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/models/route";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

const sessions = [{ id: "s1", index: 1, totalScore: 120 }];

export default function CampaignDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation<any>();
  return (
    <VStack>
      <Button
        onPress={() => navigation.navigate(ROUTES.SESSION, { campaignId: id })}
      >
        <ButtonText>Start Session</ButtonText>
      </Button>
      <FlatList
        data={sessions}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card className="mt-4">
            <Heading>Session {item.index}</Heading>
            <Text>Total Score: {item.totalScore}</Text>
            <Button
              variant="link"
              onPress={() =>
                navigation.navigate(ROUTES.EDIT_SESSION, { id: item.id })
              }
            >
              <ButtonText>Edit</ButtonText>
            </Button>
          </Card>
        )}
      />
    </VStack>
  );
}
