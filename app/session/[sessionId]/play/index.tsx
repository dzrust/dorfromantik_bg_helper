import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import HStack from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAchievements } from '@/hooks/useAchievements';
import { usePlaySession } from '@/hooks/usePlaySession';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function PlaySession() {
  const { 
    unlockedAchievements, 
    isLoading: achievementsLoading 
  } = useAchievements();
  
  const playSession = usePlaySession(unlockedAchievements);
  const canDraw = playSession.inPlay.length < 3;
  const canDrawForest = canDraw && playSession.decks.forest.length > 0;
  const canDrawGrain = canDraw && playSession.decks.grain.length > 0;
  const canDrawCity = canDraw && playSession.decks.city.length > 0;
  const canDrawRailroad = canDraw && playSession.decks.railroad.length > 0;
  const canDrawRiver = canDraw && playSession.decks.river.length > 0;

  if (achievementsLoading) {
    return (
      <VStack className="flex-1 items-center justify-center p-4">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4">Loading game session...</Text>
      </VStack>
    );
  }
  
  return (
    <ScrollView>
      <VStack className="flex-1 p-4">
        <Heading>Play Session</Heading>
        
        <Card className="mb-4">
          <Heading size="md" className="mb-2">Active Achievements</Heading>
          <Text variant="caption">
            Unlocked: {unlockedAchievements.length} achievements
          </Text>
        </Card>

        <Card className="mb-4">
          <Heading size="md" className="mb-3">Draw Tiles</Heading>
          <HStack space="sm" wrap={true}>
            <Button 
              disabled={!canDrawForest} 
              onPress={playSession.drawForest}
              size="sm"
            >
              Forest ({playSession.decks.forest.length})
            </Button>
            <Button 
              disabled={!canDrawGrain} 
              onPress={playSession.drawGrain}
              size="sm"
            >
              Grain ({playSession.decks.grain.length})
            </Button>
            <Button 
              disabled={!canDrawCity} 
              onPress={playSession.drawCity}
              size="sm"
            >
              City ({playSession.decks.city.length})
            </Button>
            <Button 
              disabled={!canDrawRailroad} 
              onPress={playSession.drawRailroad}
              size="sm"
            >
              Railroad ({playSession.decks.railroad.length})
            </Button>
            <Button 
              disabled={!canDrawRiver} 
              onPress={playSession.drawRiver}
              size="sm"
            >
              River ({playSession.decks.river.length})
            </Button>
          </HStack>
        </Card>

        <Card className="mb-4">
          <Heading size="md" className="mb-3">In Play ({playSession.inPlay.length}/3)</Heading>
          <HStack space="sm" wrap={true}>
            {playSession.inPlay.map((inPlayTile) => (
              <Button 
                key={inPlayTile.id} 
                onPress={() => playSession.completeTile(inPlayTile)}
                variant="outline"
                size="sm"
              >
                {inPlayTile.type} - {inPlayTile.value}
              </Button>
            ))}
          </HStack>
          {playSession.inPlay.length === 0 && (
            <Text variant="caption" className="text-center py-4">
              No tiles in play. Draw some tiles to get started!
            </Text>
          )}
        </Card>

        <Card>
          <Heading size="md" className="mb-3">Completed Tiles ({playSession.completed.length})</Heading>
          <HStack space="sm" wrap={true}>
            {playSession.completed.map((completedTile) => (
              <Card key={completedTile.id} variant="outline" size="sm">
                <Text size="sm">
                  {completedTile.type} - {completedTile.value}
                </Text>
              </Card>
            ))}
          </HStack>
          {playSession.completed.length === 0 && (
            <Text variant="caption" className="text-center py-4">
              No completed tiles yet.
            </Text>
          )}
        </Card>
      </VStack>
    </ScrollView>
  );
}