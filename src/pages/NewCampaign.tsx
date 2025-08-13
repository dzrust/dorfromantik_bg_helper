import React, { useState } from "react";
import { View, FlatList } from "react-native";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { Formik, FieldArray } from "formik";


import { Page } from "../components/ui/Page";
import { Header } from "../components/ui/Header";
import { Card, CardSection } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Subtitle, Body, Small } from "../components/ui/TextVariants";
import { Badge } from "../components/ui/Badge";
import { useToast } from "../components/ui/Toast";
import { CampaignSchema } from "../models/campaign";

type Player = { name: string };

export default function NewCampaign() {
  const navigation = useNavigation<any>();
  const { show } = useToast();
  const [isStartDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");

  return (
    <Formik
      initialValues={{ name: "", startDate: new Date(), players: [] as Player[] }}
      validationSchema={CampaignSchema}
      onSubmit={(values) => {
        const payload = {
          name: values.name.trim(),
          startDate: values.startDate.toISOString(),
          players: values.players.map((p) => ({ name: p.name.trim() })),
        };
        show("Campaign created");
        navigation.goBack?.();
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
        <Page>
          <Header title="Create Campaign" subtitle="Name it, set a start date, add players." />
          <Card>
            <CardSection>
              <Subtitle>Campaign name</Subtitle>
              <Input
                placeholder="Campaign name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name") as any}
              />
              {touched.name && errors.name ? <Small className="text-red-600">{String(errors.name)}</Small> : null}
            </CardSection>

            <CardSection>
              <Subtitle>Start date</Subtitle>
              <View className="flex-row gap-2">
                <Button variant="ghost" onPress={() => setStartDatePickerOpen(true)}>
                  {fmt(values.startDate)}
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
                <>
                  <CardSection>
                    <Subtitle>Players</Subtitle>
                    <View className="flex-row gap-2">
                      <View className="flex-1">
                        <Input
                          placeholder="Player name"
                          value={playerName}
                          onChangeText={setPlayerName}
                          editable={(values.players?.length ?? 0) < 4}
                        />
                      </View>
                      <Button
                        onPress={() => {
                          const n = playerName.trim();
                          if (!n) return;
                          if ((values.players?.length ?? 0) >= 4) return;
                          arrayHelpers.push({ name: n });
                          setPlayerName("");
                        }}
                        disabled={(values.players?.length ?? 0) >= 4}
                      >
                        Add
                      </Button>
                    </View>

                    <FlatList
                      data={values.players}
                      keyExtractor={(_, i) => String(i)}
                      renderItem={({ item, index }) => (
                        <View className="flex-row items-center justify-between py-2">
                          <Body>{item.name}</Body>
                          <Button variant="outline" onPress={() => arrayHelpers.remove(index)}>Remove</Button>
                        </View>
                      )}
                      ListEmptyComponent={<Body>Please add a player</Body>}
                    />
                    {touched.players && typeof errors.players === "string" ? (
                      <Small className="text-red-600">{errors.players}</Small>
                    ) : null}
                    {!!values.players.length && (
                      <View className="flex-row flex-wrap gap-2">
                        {values.players.map((p, i) => (
                          <Badge key={i}>{p.name[0]}</Badge>
                        ))}
                      </View>
                    )}
                  </CardSection>
                </>
              )}
            />

            <CardSection>
              <Button onPress={handleSubmit as any} disabled={isSubmitting}>Create Campaign</Button>
            </CardSection>
          </Card>
        </Page>
      )}
    </Formik>
  );
}
