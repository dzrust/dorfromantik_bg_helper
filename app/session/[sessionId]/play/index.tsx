import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Select, SelectItem } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/models/route";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";

export default function PlaySession() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams();
  const { show } = useToast();
  
  const [session, setSession] = useState<any>(null);
  const [tilesInPlay, setTilesInPlay] = useState<any[]>([]);
  const [tilePools, setTilePools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTileType, setSelectedTileType] = useState<string>("");

  useEffect(() => {
    loadSessionData();
  }, [sessionId]);

  const loadSessionData = async () => {
    try {
      setLoading(true);
      const sessionData = null;
      if (sessionData) {
        setSession(sessionData);
        setTilesInPlay([]);
        setTilePools([]);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTile = async (tileId: string) => {
    try {
      // await taskTileService.completeTile(tileId);
      
      // Auto-draw new tiles to maintain 3 in play
      // const newTiles = await taskTileService.autoDrawTiles(sessionId as string);
      
      // Reload data
      await loadSessionData();
      
      show({
        render: () => (
          <Toast>
            <ToastTitle>Tile completed!</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error('Failed to complete tile:', error);
      show({
        render: () => (
          <Toast>
            <ToastTitle>Failed to complete tile</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const revealTile = async () => {
    if (!selectedTileType) {
      Alert.alert('Please select a tile type');
      return;
    }

    try {
      // Check if we can draw more tiles
      const canDraw = false;
      if (!canDraw) {
        Alert.alert('Cannot draw more tiles', 'You already have 3 tiles in play or no tiles available');
        return;
      }

      // For special 7-value tiles, ask for confirmation
      const availablePoolsForType = tilePools.filter(pool => 
        pool.type === selectedTileType && pool.value === 7 && pool.remainingCount > 0
      );
      
      if (availablePoolsForType.length > 0) {
        Alert.alert(
          'Special 7 Tile Available',
          `You have a special ${selectedTileType} 7-tile available. Do you want to draw it?`,
          [
            { 
              text: 'Draw 7-tile', 
              onPress: () => drawSpecificTile(selectedTileType, 7) 
            },
            { 
              text: 'Draw Random', 
              onPress: () => drawRandomTile(selectedTileType) 
            },
            { text: 'Cancel' }
          ]
        );
      } else {
        await drawRandomTile(selectedTileType);
      }
      
    } catch (error) {
      console.error('Failed to reveal tile:', error);
      show({
        render: () => (
          <Toast>
            <ToastTitle>Failed to reveal tile</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const drawSpecificTile = async (type: string, value: number) => {
    try {
      // await tilePoolService.drawTile(sessionId as string, type as any, value as any);
      await loadSessionData();
      setSelectedTileType('');
      
      show({
        render: () => (
          <Toast>
            <ToastTitle>Tile revealed!</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error('Failed to draw tile:', error);
      show({
        render: () => (
          <Toast>
            <ToastTitle>Failed to draw tile</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const drawRandomTile = async (type: string) => {
    try {
      // await tilePoolService.getRandomAvailableTile(sessionId as string, type as any);
      await loadSessionData();
      setSelectedTileType('');
      
      show({
        render: () => (
          <Toast>
            <ToastTitle>Tile revealed!</ToastTitle>
          </Toast>
        ),
      });
    } catch (error) {
      console.error('Failed to draw tile:', error);
      show({
        render: () => (
          <Toast>
            <ToastTitle>Failed to draw tile</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const getAvailableTypes = () => {
    const typesWithTiles = new Set(
      tilePools.filter(pool => pool.remainingCount > 0).map(pool => pool.type)
    );
    return Array.from(typesWithTiles);
  };

  const getRemainingTileCount = () => {
    return tilePools.reduce((sum, pool) => sum + pool.remainingCount, 0);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Session not found</Text>
      </View>
    );
  }

  const availableTypes = getAvailableTypes();
  const remainingTiles = getRemainingTileCount();

  return (
    <VStack className="flex-1 p-4">
      <Card className="mb-4">
        <Heading>Session {session.index}</Heading>
        <Text className="text-neutral-500">
          Players: {session.players?.map((p: any) => p.name).join(', ')}
        </Text>
        <Text className="text-neutral-500">
          Remaining tiles: {remainingTiles}
        </Text>
      </Card>

      <Card className="mb-4">
        <Heading>Tiles In Play ({tilesInPlay.length}/3)</Heading>
        {tilesInPlay.length === 0 ? (
          <Text className="text-neutral-500">No tiles in play. Reveal some tiles to start!</Text>
        ) : (
          <FlatList
            data={tilesInPlay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
                <Text className="font-semibold">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {item.value}
                </Text>
                <Button
                  size="sm"
                  onPress={() => completeTile(item.id)}
                >
                  <ButtonText>Complete</ButtonText>
                </Button>
              </View>
            )}
          />
        )}
      </Card>

      {availableTypes.length > 0 && tilesInPlay.length < 3 && (
        <Card className="mb-4">
          <Heading>Reveal New Tile</Heading>
          <Select 
            onValueChange={setSelectedTileType} 
            placeholder="Select tile type to reveal"
          >
            {availableTypes.map(type => (
              <SelectItem 
                key={type} 
                value={type} 
                label={type.charAt(0).toUpperCase() + type.slice(1)} 
              />
            ))}
          </Select>
          {selectedTileType && (
            <Button onPress={revealTile} className="mt-2">
              <ButtonText>Reveal {selectedTileType} Tile</ButtonText>
            </Button>
          )}
        </Card>
      )}

      {remainingTiles === 0 && tilesInPlay.length === 0 && (
        <Card className="mb-4">
          <Text className="text-center text-green-600 font-semibold">
            All tiles completed! Session ready to score.
          </Text>
        </Card>
      )}

      <Button 
        onPress={() => router.navigate(ROUTES.SCORE.replace('[sessionId]', sessionId as string))}
        variant={remainingTiles === 0 && tilesInPlay.length === 0 ? "solid" : "outline"}
      >
        <ButtonText>
          {remainingTiles === 0 && tilesInPlay.length === 0 ? "Score Session" : "End Session Early"}
        </ButtonText>
      </Button>
    </VStack>
  );
}
