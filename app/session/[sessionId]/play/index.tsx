import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Select, SelectItem } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { ROUTES } from "../../../../models/route";

export default function PlaySession() {
  const navigation = useNavigation<any>();
  const { sessionId } = useLocalSearchParams();
  const [tilesInPlay, setTilesInPlay] = useState<any[]>([]);

  return (
    <VStack>
      <Card>
        <Heading>Tiles In Play</Heading>
        <FlatList
          data={tilesInPlay}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <>
              <Text>
                {item.type} {item.value}
              </Text>
              <Button onPress={() => {}}>
                <ButtonText>Complete</ButtonText>
              </Button>
            </>
          )}
        />
        <Select onValueChange={(type) => {}} placeholder="Reveal Tile Type">
          <SelectItem value="grain" label="Grain" />
          <SelectItem value="city" label="City" />
          <SelectItem value="railroad" label="Railroad" />
          <SelectItem value="river" label="River" />
          <SelectItem value="forest" label="Forest" />
        </Select>
      </Card>
      <Button onPress={() => navigation.navigate(ROUTES.SCORE, { sessionId })}>
        <ButtonText>End Session</ButtonText>
      </Button>
    </VStack>
  );
}
