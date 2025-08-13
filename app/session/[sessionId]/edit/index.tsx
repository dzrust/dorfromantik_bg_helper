import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function EditSession() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation<any>();
  return (
    <VStack>
      <Card>
        <Heading>Edit Session {id}</Heading>
        <Text>Allow editing tiles & scores here</Text>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Done</ButtonText>
        </Button>
      </Card>
    </VStack>
  );
}
