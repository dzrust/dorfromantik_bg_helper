import { Button } from "@/src/componentscomponents/ui/Button";
import { Card, CardSection, CardTitle } from "@/src/componentscomponents/ui/Card";
import { Page } from "@/src/componentscomponents/ui/Page";
import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";

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
