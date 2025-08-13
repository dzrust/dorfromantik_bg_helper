import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/models/route";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { campaignService, sessionService } from "@/db/services";
import { type Campaign as DbCampaign, type PlaySession as DbPlaySession } from "@/db/schema";
import { DateTime } from "luxon";
import { Avatar, AvatarFallbackText, AvatarGroup } from "@/components/ui/avatar";

export default function CampaignDetail() {
  const router = useRouter();
  const { campaignId } = useLocalSearchParams();
  const [campaign, setCampaign] = useState<any>(null);
  const [sessions, setSessions] = useState<DbPlaySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaignData();
  }, [campaignId]);

  const loadCampaignData = async () => {
    try {
      setLoading(true);
      const id = parseInt(campaignId as string);
      const campaignData = await campaignService.getById(id);
      if (campaignData) {
        setCampaign(campaignData);
        const sessionsData = await sessionService.getAllForCampaign(id);
        setSessions(sessionsData);
      }
    } catch (error) {
      console.error('Failed to load campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = async () => {
    if (!campaign) return;
    
    try {
      // Start session with all campaign players
      const playerIds = campaign.players.map(p => p.id);
      const session = await sessionService.create(campaign.id, playerIds);
      router.navigate(ROUTES.SESSION.replace('[sessionId]', session.id));
    } catch (error) {
      console.error('Failed to start session:', error);
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
          Started {DateTime.fromISO(campaign.startDate).toFormat('MMM dd, yyyy')}
        </Text>
        
        <Text className="font-semibold mb-2">Players:</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {campaign.players.map((player) => (
            <Avatar key={player.id}>
              <AvatarFallbackText>{player.name}</AvatarFallbackText>
            </Avatar>
          ))}
        </View>
        
        {campaign.achievements.length > 0 && (
          <>
            <Text className="font-semibold mb-2">Achievements Unlocked:</Text>
            {campaign.achievements.map((achievement: any) => (
              <Text key={achievement.id} className="text-green-600">
                • {achievement.name}
              </Text>
            ))}
          </>
        )}
      </Card>

      <Button onPress={startNewSession} className="mb-4">
        <ButtonText>Start New Session</ButtonText>
      </Button>
      
      <Heading className="mb-2">Sessions</Heading>
      {sessions.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-neutral-500 text-center">
            No sessions yet. Start your first session!
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card className="mt-4">
              <Heading>Session {item.index}</Heading>
              <Text className="text-neutral-500">
                {DateTime.fromISO(item.date).toFormat('MMM dd, yyyy')}
              </Text>
              <View className="flex-row gap-2 mt-2">
                <Button
                  variant="outline"
                  onPress={() =>
                    router.navigate(ROUTES.SESSION.replace('[sessionId]', item.id))
                  }
                >
                  <ButtonText>Play</ButtonText>
                </Button>
                <Button
                  variant="outline"
                  onPress={() =>
                    router.navigate(ROUTES.SCORE.replace('[sessionId]', item.id))
                  }
                >
                  <ButtonText>Score</ButtonText>
                </Button>
                <Button
                  variant="outline"
                  onPress={() =>
                    router.navigate(ROUTES.EDIT_SESSION.replace('[sessionId]', item.id))
                  }
                >
                  <ButtonText>Edit</ButtonText>
                </Button>
              </View>
            </Card>
          )}
        />
      )}
    </VStack>
  );
}
