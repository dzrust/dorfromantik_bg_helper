import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormInput } from "@/components/ui/FormInput";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/models/route";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function EndSession() {
  const { sessionId } = useLocalSearchParams();
  const navigation = useNavigation<any>();
  const [flags, setFlags] = useState({ grain: "", city: "", forest: "" });
  const [longest, setLongest] = useState({ railroad: "", river: "" });

  return (
    <VStack>
      <Card>
        <Heading>Scoring</Heading>
        <Heading>Flags</Heading>
        <FormInput
          label="Grains"
          inputProps={{ placeholder: "Grain" }}
          name="flags.grain"
        />
        <FormInput
          label="City"
          inputProps={{ placeholder: "City" }}
          name="flags.city"
        />
        <FormInput
          label="Forest"
          inputProps={{ placeholder: "Forest" }}
          name="flags.forest"
        />
        <FormInput
          label="Longest Railroad"
          inputProps={{ placeholder: "Longest Railroad" }}
          name="longestRailroad"
        />
        <FormInput
          label="Longest River"
          inputProps={{ placeholder: "Longest River" }}
          name="longestRiver"
        />
        <Button
          onPress={() => navigation.navigate(ROUTES.DETAILS, { sessionId })}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </Card>
    </VStack>
  );
}
