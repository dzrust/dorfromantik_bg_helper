import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { FieldArray, Formik } from "formik";
import { DateTime } from "luxon";
import React from "react";
import { FlatList, View } from "react-native";

import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormInput } from "@/components/ui/FormInput";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { createCampaign } from "@/db/campaign";
import { NewCampaignDB } from "@/db/schema";
import { CampaignSchema } from "@/models/campaign";

type Player = { name: string };

export default function NewCampaign() {
  const router = useRouter();
  const { show } = useToast();

  return (
    <Formik
      initialValues={{
        name: "",
        startDate: DateTime.now().toJSDate(),
        players: [] as string[],
        newPlayerName: "",
      }}
      validationSchema={CampaignSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const campaignData: NewCampaignDB = {
            name: values.name.trim(),
            startDate:
              DateTime.fromJSDate(values.startDate).toISO() ??
              DateTime.now().toISO(),
          };

          await createCampaign(
            campaignData,
            values.players.map((p) => p.trim())
          );

          show({
            render: () => (
              <Toast>
                <ToastTitle>Campaign created successfully!</ToastTitle>
              </Toast>
            ),
          });

          router.back();
        } catch (error) {
          console.error("Failed to create campaign:", error);
          show({
            render: () => (
              <Toast>
                <ToastTitle>Failed to create campaign</ToastTitle>
              </Toast>
            ),
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
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
              <DateTimePicker
                testID="dateTimePicker"
                value={values.startDate}
                mode="date"
                is24Hour={false}
                onChange={(event, selectedDate) =>
                  setFieldValue("startDate", selectedDate ?? "")
                }
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
                        isDisabled={values.players.length === 4}
                      />
                    </View>
                    <Button
                      onPress={() => {
                        const name = values.newPlayerName.trim();
                        if (!name) return;
                        if (values.players.length >= 4) return;
                        if (
                          values.players.some(
                            (p) => p.toLowerCase() === name.toLowerCase()
                          )
                        )
                          return;
                        arrayHelpers.push({ name });
                        setFieldValue("newPlayerName", "");
                      }}
                      disabled={values.players.length >= 4}
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
                            <Text>{item}</Text>
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
                        {(values.players ?? []).map((p, i) => (
                          <Avatar key={i}>
                            <AvatarFallbackText>{p}</AvatarFallbackText>
                          </Avatar>
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
