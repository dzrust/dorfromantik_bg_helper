import { AchievementList } from "@/components/AchievementList";
import { SessionCard } from "@/components/SessionCard";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Campaign } from "@/models/campaign";
import { PlaySession } from "@/models/play-session";
import { ROUTES } from "@/models/route";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function CampaignDetail() {
  const router = useRouter();
  const { campaignId } = useLocalSearchParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [sessions, setSessions] = useState<PlaySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaignData();
  }, [campaignId]);

  const loadCampaignData = async () => {
    try {
      setLoading(true);
      const id = parseInt(campaignId as string);
      const campaignData = null;
      if (campaignData) {
        setCampaign(campaignData);
        setSessions([]);
      }
    } catch (error) {
      console.error("Failed to load campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = async () => {
    if (!campaign) return;

    try {
      // Start session with all campaign players
      const playerIds = campaign.players.map((p) => p.id);
      const session = { id: 1234 }; //await createPlaySession(campaign.id, playerIds);
      router.navigate(ROUTES.SESSION.replace("[sessionId]", `${session.id}`));
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!campaign) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Campaign not found</Text>
      </View>
    );
  }

  return (
    <VStack className="flex-1 p-4">
      <Card className="mb-4">
        <Heading>{campaign.name}</Heading>
        <Text className="text-neutral-500 mb-2">
          Started{" "}
          {DateTime.fromJSDate(campaign.startDate).toFormat("MMM dd, yyyy")}
        </Text>

        <Text className="font-semibold mb-2">Players:</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {campaign.players.map((player) => (
            <Avatar key={player.id}>
              <AvatarFallbackText>{player.name}</AvatarFallbackText>
            </Avatar>
          ))}
        </View>

        <AchievementList
          unlockedAchievements={campaign.achievements}
          onAchievementToggle={async () => {
            await Promise.resolve();
          }}
          isLoading={false}
        />
      </Card>

      <Button onPress={startNewSession} className="mb-4">
        <ButtonText>Start New Session</ButtonText>
      </Button>

      <Heading className="mb-2">Sessions</Heading>
      <FlatList
        data={sessions}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <SessionCard item={item} />}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-neutral-500 text-center">
              No sessions yet. Start your first session!
            </Text>
          </View>
        }
      />
    </VStack>
  );
}
