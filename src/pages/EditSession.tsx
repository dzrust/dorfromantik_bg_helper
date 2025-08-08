import { Card, CardTitle, CardSection } from "../components/ui/Card";
import React from "react";
import { View, Text, Pressable } from "react-native";

export default function EditSession({ route, navigation }: any) {
  const { id } = route.params;
  return (
    <View className="flex-1 bg-neutral-50 p-4">
      <Card>
        <CardTitle>Edit Session {id}</CardTitle>
        <CardSection>
          <Text>Allow editing tiles & scores here</Text>
        </CardSection>
        <Pressable onPress={() => navigation.goBack()}>Done</Pressable>
      </Card>
    </View>
  );
}
