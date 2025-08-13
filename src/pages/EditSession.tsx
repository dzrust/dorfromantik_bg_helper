import { Card, CardTitle, CardSection } from "../components/ui/Card";
import React from "react";
import { Text } from "react-native";
import { Button } from "../components/ui/Button";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import { Page } from "../components/ui/Page";

type Props = StaticScreenProps<{
  id: string;
}>;

export default function EditSession({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation<any>();
  return (
    <Page>
      <Card>
        <CardTitle>Edit Session {id}</CardTitle>
        <CardSection>
          <Text>Allow editing tiles & scores here</Text>
        </CardSection>
        <Button onPress={() => navigation.goBack()}>Done</Button>
      </Card>
    </Page>
  );
}
