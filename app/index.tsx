import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { ROUTES } from "../models/route";

const campaigns = [{ id: "1", name: "Family Run", startDate: "2025-08-01" }];

export default function CampaignList() {
  const router = useRouter();
  return (
    <VStack>
      <Button onPress={() => router.navigate(ROUTES.NEW)}>
        <ButtonText>Start Campaign</ButtonText>
      </Button>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.navigate(ROUTES.DETAILS, { id: item.id })}
          >
            <Card className="mt-4">
              <Heading>{item.name}</Heading>
              <Text className="text-neutral-500">Started {item.startDate}</Text>
            </Card>
          </Pressable>
        )}
      />
    </VStack>
  );
}
