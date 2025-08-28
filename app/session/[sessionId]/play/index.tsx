import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import HStack from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { usePlaySession } from '@/hooks/usePlaySession';
import { Stack } from 'expo-router';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function PlaySession() {
  const {
    inPlay,
    completed,
    decks,
    isLoading,
    drawGrain,
    drawCity,
    drawForest,
    drawRailroad,
    drawRiver,
    completeTile,
    canDrawGrain,
    canDrawCity,
    canDrawForest,
    canDrawRailroad,
    canDrawRiver,
  } = usePlaySession();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <>
      <Stack.Screen options={{ title: 'Game' }} />
      {children}
    </>
  );

  if (isLoading) {
    return (
      <Wrapper>
        <VStack className="flex-1 items-center justify-center p-4">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="mt-4">Loading game session...</Text>
        </VStack>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ScrollView>
        <VStack className="flex-1 p-4">
          <Heading>Play Session</Heading>

          <Card className="mb-4">
            <Heading size="md" className="mb-3">
              Draw Tiles
            </Heading>
            <HStack space="sm" wrap={true}>
              <Button disabled={!canDrawForest} onPress={drawForest} size="sm">
                Forest ({decks.forest.length})
              </Button>
              <Button disabled={!canDrawGrain} onPress={drawGrain} size="sm">
                Grain ({decks.grain.length})
              </Button>
              <Button disabled={!canDrawCity} onPress={drawCity} size="sm">
                City ({decks.city.length})
              </Button>
              <Button disabled={!canDrawRailroad} onPress={drawRailroad} size="sm">
                Railroad ({decks.railroad.length})
              </Button>
              <Button disabled={!canDrawRiver} onPress={drawRiver} size="sm">
                River ({decks.river.length})
              </Button>
            </HStack>
          </Card>

          <Card className="mb-4">
            <Heading size="md" className="mb-3">
              In Play ({inPlay.length}/3)
            </Heading>
            <HStack space="sm" wrap={true}>
              {inPlay.map((tile) => (
                <Button
                  key={tile.id}
                  onPress={() => completeTile(tile)}
                  variant="outline"
                  size="sm">
                  {tile.type} - {tile.value}
                </Button>
              ))}
            </HStack>
            {inPlay.length === 0 && (
              <Text variant="caption" className="py-4 text-center">
                No tiles in play. Draw some tiles to get started!
              </Text>
            )}
          </Card>

          <Card className="mb-4">
            <Heading size="md" className="mb-3">
              Completed Tiles ({completed.length})
            </Heading>
            <HStack space="sm" wrap={true}>
              {completed.map((tile) => (
                <Card key={tile.id} variant="outline" size="sm">
                  <Text size="sm">
                    {tile.type} - {tile.value}
                  </Text>
                </Card>
              ))}
            </HStack>
            {completed.length === 0 && (
              <Text variant="caption" className="py-4 text-center">
                No completed tiles yet.
              </Text>
            )}
          </Card>
        </VStack>
      </ScrollView>
    </Wrapper>
  );
}
