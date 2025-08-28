import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Campaign } from "@/models/campaign";
import { useRouter } from "expo-router";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ROUTES } from "../models/route";

export default function CampaignList() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setCampaigns([]);
    } catch (error) {
      console.error("Failed to load campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <VStack className="flex-1 p-4">
      <Button onPress={() => router.navigate(ROUTES.NEW)}>
        <ButtonText>Start Campaign</ButtonText>
      </Button>

      <FlatList
        data={campaigns}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-neutral-500 text-center">
              No campaigns yet. Create your first campaign to get started!
            </Text>
          </View>
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.navigate(
                ROUTES.DETAILS.replace("[campaignId]", `${item.id}`)
              )
            }
          >
            <Card className="mt-4">
              <Heading>{item.name}</Heading>
              <Text className="text-neutral-500">
                Started{" "}
                {DateTime.fromJSDate(item.startDate).toFormat("MMM dd, yyyy")}
              </Text>
              {item.endDate && (
                <Text className="text-neutral-500">
                  Ended{" "}
                  {DateTime.fromJSDate(item.endDate!).toFormat("MMM dd, yyyy")}
                </Text>
              )}
            </Card>
          </Pressable>
        )}
      />
    </VStack>
  );
}
