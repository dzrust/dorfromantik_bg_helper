import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/ui/Button";
import { Card, CardSection } from "../components/ui/Card";
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Input } from "../components/ui/Input";
import DatePicker from "react-native-date-picker";
import { useToast } from "../components/ui/Toast";
import { Player } from "../models/temp";
import { Badge } from "../components/ui/Badge";
import { Header } from "../components/ui/Header";
import { Body, Subtitle } from "../components/ui/TextVariants";
import { Page } from "../components/ui/Page";

export default function NewCampaign() {
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState(new Date());
  const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const { show } = useToast();
  const [name, setName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = () => {
    const n = playerName.trim();
    if (!n) return;
    setPlayers((p) => [...p, { id: Math.random().toString(36).slice(2), name: n }]);
    setPlayerName("");
  };

  const removePlayer = (id: string) => setPlayers((p) => p.filter((x) => x.id !== id));

  const save = () => {
    if (!name.trim()) {
      show("Add a campaign name");
      return;
    }
    if (!players.length) {
      show("Add at least one player");
      return;
    }
    const payload = {
      name: name.trim(),
      startDate: startDate.toISOString(),
      players: players.map((p) => ({ name: p.name })),
    };
    show("Campaign created");
    navigation.goBack?.();
  };
  return (
    <Page>
      <Header title="Let's get your Dorfromantik campaign setup!" />
      <Card>
        <CardSection>
          <Subtitle>First let's name it</Subtitle>
          <Input placeholder="Campaign name" value={name} onChangeText={setName} />
        </CardSection>
        <CardSection>
          <Subtitle>When did it start?</Subtitle>
          <View className="flex-row gap-2">
            <Button variant="ghost" onPress={() => setStartDatePickerOpen(true)}>
              {startDate.toISOString()}
            </Button>
            <DatePicker
              modal
              open={isStartDatePickerOpen}
              date={startDate}
              onConfirm={(date) => {
                setStartDatePickerOpen(false);
                setStartDate(date);
              }}
              onCancel={() => {
                setStartDatePickerOpen(false);
              }}
            />
          </View>
        </CardSection>
        <CardSection>
          <Subtitle>Finally who all is playing?</Subtitle>
          <View className="flex-row gap-2">
            <View className="flex-1">
              <Input placeholder="Player Name" value={playerName} onChangeText={setPlayerName} />
            </View>
            <Button className="flex-2" onPress={addPlayer}>
              Add
            </Button>
          </View>

          <FlatList
            data={players}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between py-2">
                <Body className="text-base text-black">{item.name}</Body>
                <Button variant="outline" onPress={() => removePlayer(item.id)}>
                  Remove
                </Button>
              </View>
            )}
            ListEmptyComponent={<Body>Please add a player</Body>}
          />
          {!!players.length && (
            <View className="flex-row flex-wrap gap-2">
              {players.map((p) => (
                <Badge key={p.id}>{p.name[0]}</Badge>
              ))}
            </View>
          )}
        </CardSection>
        <CardSection>
          <Button onPress={save}>Create Campaign</Button>
        </CardSection>
      </Card>
    </Page>
  );
}
