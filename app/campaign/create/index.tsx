import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { FieldArray, Formik } from "formik";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

import { AvatarFallbackText, AvatarGroup } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormInput } from "@/components/ui/FormInput";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { CampaignSchema } from "@/models/campaign";

type Player = { name: string };

export default function NewCampaign() {
  const navigation = useNavigation<any>();
  const { show } = useToast();
  const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        startDate: DateTime.now().toJSDate(),
        players: [] as Player[],
        newPlayerName: "",
      }}
      validationSchema={CampaignSchema}
      onSubmit={(values) => {
        // TODO: Save campaign data to database
        console.log("Campaign data:", {
          name: values.name.trim(),
          startDate: DateTime.fromJSDate(values.startDate).toISO(),
          players: values.players.map((p) => ({ name: p.name.trim() })),
        });
        show({
          render: () => (
            <Toast>
              <ToastTitle>Campaign created</ToastTitle>
            </Toast>
          ),
        });
        navigation.goBack?.();
      }}
    >
      {({
        values,
        handleBlur,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <VStack>
          <Heading>Create Campaign</Heading>
          <Card>
            <FormInput
              name="name"
              label="Campaign Name"
              inputProps={{ placeholder: "Campaign name" }}
            />

            <Heading>Start date</Heading>
            <View className="flex-row gap-2">
              {/* <Button
                variant="link"
                onPress={() => {
                  setStartDatePickerOpen(true);
                  handleBlur("startDate");
                }}
              >
                <ButtonText>
                  {DateTime.fromJSDate(values.startDate).toFormat(
                    "MMM dd, yyyy"
                  )}
                </ButtonText>
              </Button> */}
              <DateTimePicker
                testID="dateTimePicker"
                value={values.startDate}
                mode="date"
                is24Hour={false}
                onChange={(event, selectedDate) => setFieldValue("startDate", selectedDate ?? "")}
              />
            </View>

            <FieldArray
              name="players"
              render={(arrayHelpers) => (
                <>
                  <Heading>Players</Heading>
                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <FormInput
                        label="Player Name"
                        name="newPlayerName"
                        inputProps={{
                          placeholder: "Player name",
                        }}
                        isDisabled={values.players.length < 4}
                      />
                    </View>
                    <Button
                      onPress={() => {
                        const name = values.newPlayerName.trim();
                        if (!name) return;
                        if (values.players.length >= 4) return;
                        if (
                          values.players.some(
                            (p) => p.name.toLowerCase() === name.toLowerCase()
                          )
                        )
                          return;
                        arrayHelpers.push({ name });
                        setFieldValue("newPlayerName", "");
                      }}
                      disabled={
                        values.players.length >= 4 ||
                        !values.newPlayerName.trim()
                      }
                    >
                      <ButtonText>Add</ButtonText>
                    </Button>
                  </View>

                  {values.players.length > 0 && (
                    <View className="mt-3">
                      <FlatList
                        data={values.players}
                        keyExtractor={(_, i) => String(i)}
                        renderItem={({ item, index }) => (
                          <View className="flex-row items-center justify-between py-2">
                            <Text>{item.name}</Text>
                            <Button
                              variant="outline"
                              onPress={() => arrayHelpers.remove(index)}
                            >
                              <ButtonText>Remove</ButtonText>
                            </Button>
                          </View>
                        )}
                      />
                      <View className="flex-row flex-wrap gap-2 mt-2">
                        {values.players.map((p, i) => (
                          <AvatarGroup key={i}>
                            <AvatarFallbackText>{p.name}</AvatarFallbackText>
                          </AvatarGroup>
                        ))}
                      </View>
                    </View>
                  )}

                  {values.players.length === 0 && (
                    <View className="mt-3">
                      <Text className="text-neutral-500">
                        Please add at least one player
                      </Text>
                    </View>
                  )}
                </>
              )}
            />

            <Button onPress={handleSubmit as any} disabled={isSubmitting}>
              <ButtonText>Create Campaign</ButtonText>
            </Button>
          </Card>
        </VStack>
      )}
    </Formik>
  );
}
