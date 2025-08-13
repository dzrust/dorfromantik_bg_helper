import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { ROUTES } from "../models/route";
import { campaignService } from "../db/services";
import { type Campaign as DbCampaign } from "../db/schema";
import { DateTime } from "luxon";

export default function CampaignList() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<DbCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const data = await campaignService.getAll();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
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
      
      {campaigns.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-neutral-500 text-center">
            No campaigns yet. Create your first campaign to get started!
          </Text>
        </View>
      ) : (
        <FlatList
          data={campaigns}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.navigate(ROUTES.DETAILS.replace('[campaignId]', item.id.toString()))}
            >
              <Card className="mt-4">
                <Heading>{item.name}</Heading>
                <Text className="text-neutral-500">
                  Started {DateTime.fromISO(item.startDate).toFormat('MMM dd, yyyy')}
                </Text>
                {item.endDate && (
                  <Text className="text-neutral-500">
                    Ended {DateTime.fromISO(item.endDate!).toFormat('MMM dd, yyyy')}
                  </Text>
                )}
              </Card>
            </Pressable>
          )}
        />
      )}
    </VStack>
  );
}
