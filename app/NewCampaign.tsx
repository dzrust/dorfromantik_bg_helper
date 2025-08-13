import { useNavigation } from "@react-navigation/native";
import { FieldArray, Formik } from "formik";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import DatePicker from "react-native-date-picker";

import { CampaignSchema } from "@/models/campaign";
import { FormInput } from "@/src/components/ui/FormInput";
import { Badge } from "@/src/componentscomponents/ui/Badge";
import { Button } from "@/src/componentscomponents/ui/Button";
import { Card, CardSection } from "@/src/componentscomponents/ui/Card";
import { Header } from "@/src/componentscomponents/ui/Header";
import { Page } from "@/src/componentscomponents/ui/Page";
import { Body, Subtitle } from "@/src/componentscomponents/ui/TextVariants";
import { useToast } from "@/src/componentscomponents/ui/Toast";

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
        show("Campaign created");
        navigation.goBack?.();
      }}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Page>
          <Header
            title="Create Campaign"
            subtitle="Name it, set a start date, add players."
          />
          <Card>
            <CardSection>
              <Subtitle>Campaign name</Subtitle>
              <FormInput name="name" placeholder="Campaign name" />
            </CardSection>

            <CardSection>
              <Subtitle>Start date</Subtitle>
              <View className="flex-row gap-2">
                <Button
                  variant="ghost"
                  onPress={() => setStartDatePickerOpen(true)}
                >
                  {DateTime.fromJSDate(values.startDate).toFormat(
                    "MMM dd, yyyy"
                  )}
                </Button>
                <DatePicker
                  modal
                  open={isStartDatePickerOpen}
                  date={values.startDate}
                  mode="date"
                  onConfirm={(date) => {
                    setStartDatePickerOpen(false);
                    setFieldValue("startDate", date);
                  }}
                  onCancel={() => setStartDatePickerOpen(false)}
                />
              </View>
            </CardSection>

            <FieldArray
              name="players"
              render={(arrayHelpers) => (
                <CardSection>
                  <Subtitle>Players</Subtitle>
                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <FormInput
                        name="newPlayerName"
                        placeholder="Player name"
                        editable={values.players.length < 4}
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
                      Add
                    </Button>
                  </View>

                  {values.players.length > 0 && (
                    <View className="mt-3">
                      <FlatList
                        data={values.players}
                        keyExtractor={(_, i) => String(i)}
                        renderItem={({ item, index }) => (
                          <View className="flex-row items-center justify-between py-2">
                            <Body>{item.name}</Body>
                            <Button
                              variant="outline"
                              onPress={() => arrayHelpers.remove(index)}
                            >
                              Remove
                            </Button>
                          </View>
                        )}
                      />
                      <View className="flex-row flex-wrap gap-2 mt-2">
                        {values.players.map((p, i) => (
                          <Badge key={i}>{p.name[0]?.toUpperCase()}</Badge>
                        ))}
                      </View>
                    </View>
                  )}

                  {values.players.length === 0 && (
                    <View className="mt-3">
                      <Body className="text-neutral-500">
                        Please add at least one player
                      </Body>
                    </View>
                  )}
                </CardSection>
              )}
            />

            <CardSection>
              <Button onPress={handleSubmit as any} disabled={isSubmitting}>
                Create Campaign
              </Button>
            </CardSection>
          </Card>
        </Page>
      )}
    </Formik>
  );
}
