import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormInput } from "@/components/ui/FormInput";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { ROUTES } from "@/models/route";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as yup from "yup";

const scoringSchema = yup.object({
  grainFlags: yup.number().min(0, 'Must be 0 or greater').required('Required'),
  cityFlags: yup.number().min(0, 'Must be 0 or greater').required('Required'),
  forestFlags: yup.number().min(0, 'Must be 0 or greater').required('Required'),
  longestRailroad: yup.number().min(0, 'Must be 0 or greater').required('Required'),
  longestRiver: yup.number().min(0, 'Must be 0 or greater').required('Required'),
});

export default function SessionScore() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams();
  const { show } = useToast();
  
  const [session, setSession] = useState<any>(null);
  const [completedTiles, setCompletedTiles] = useState<any[]>([]);
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentScore, setCurrentScore] = useState<any>(null);

  useEffect(() => {
    loadSessionData();
  }, [sessionId]);

  const loadSessionData = async () => {
    try {
      setLoading(true);
      const sessionData = null;
      if (sessionData) {
        setSession(sessionData);
        const campaignData = null;
        setCampaign(campaignData);
        
        const completed = null;
        setCompletedTiles([]);
        
        const score = null;
        setCurrentScore(score);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTaskTileScore = () => {
    return completedTiles.reduce((sum, tile) => sum + tile.value, 0);
  };

  const getAchievementScoreFields = () => {
    if (!campaign?.achievements) return {};
    
    const fields: any = {};
    campaign.achievements.forEach((achievement: any) => {
      fields[achievement.achievementKey] = yup.number().min(0, 'Must be 0 or greater').default(0);
    });
    return fields;
  };

  const getInitialAchievementScores = () => {
    if (!campaign?.achievements) return {};
    
    const scores: any = {};
    campaign.achievements.forEach((achievement: any) => {
      scores[achievement.achievementKey] = currentScore?.achievementScores 
        ? JSON.parse(currentScore.achievementScores)[achievement.achievementKey] || 0
        : 0;
    });
    return scores;
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Session not found</Text>
      </View>
    );
  }

  const taskTileScore = calculateTaskTileScore();

  return (
    <VStack className="flex-1 p-4">
      <Card className="mb-4">
        <Heading>Session {session.index} - Final Score</Heading>
        <Text className="text-neutral-500">
          Players: {session.players?.map((p: any) => p.name).join(', ')}
        </Text>
      </Card>

      <Formik
        initialValues={{
          grainFlags: currentScore?.grainFlags || 0,
          cityFlags: currentScore?.cityFlags || 0,
          forestFlags: currentScore?.forestFlags || 0,
          longestRailroad: currentScore?.longestRailroad || 0,
          longestRiver: currentScore?.longestRiver || 0,
          ...getInitialAchievementScores(),
        }}
        validationSchema={scoringSchema.shape(getAchievementScoreFields())}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            
            // Prepare achievement scores
            const achievementScores: any = {};
            campaign?.achievements?.forEach((achievement: any) => {
              achievementScores[achievement.achievementKey] = values[achievement.achievementKey as keyof typeof values] || 0;
            });

            // Update the score
            // await scoreService.updateScore(sessionId as string, {
            //   taskTileScore,
            //   grainFlags: values.grainFlags,
            //   cityFlags: values.cityFlags,
            //   forestFlags: values.forestFlags,
            //   longestRailroad: values.longestRailroad,
            //   longestRiver: values.longestRiver,
            //   achievementScores: JSON.stringify(achievementScores),
            // });

            show({
              render: () => (
                <Toast>
                  <ToastTitle>Score saved successfully!</ToastTitle>
                </Toast>
              ),
            });

            // Navigate back to campaign detail
            router.navigate(ROUTES.DETAILS.replace('[campaignId]', session.campaignId.toString()));
          } catch (error) {
            console.error('Failed to save score:', error);
            show({
              render: () => (
                <Toast>
                  <ToastTitle>Failed to save score</ToastTitle>
                </Toast>
              ),
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleSubmit, isSubmitting }) => {
          const section1Score = taskTileScore;
          const section2Score = values.grainFlags + values.cityFlags + values.forestFlags + 
                              values.longestRailroad + values.longestRiver;
          const section3Score = campaign?.achievements?.reduce((sum: number, achievement: any) => {
            return sum + (values[achievement.achievementKey as keyof typeof values] as number || 0);
          }, 0) || 0;
          const totalScore = section1Score + section2Score + section3Score;

          return (
            <VStack className="flex-1">
              {/* Section 1: Task Tiles */}
              <Card className="mb-4">
                <Heading>Section 1: Task Tiles</Heading>
                <Text className="text-lg font-semibold mb-2">
                  Score: {section1Score} points
                </Text>
                <Text className="text-neutral-500">
                  {completedTiles.length} tiles completed
                </Text>
                {completedTiles.map((tile, index) => (
                  <Text key={tile.id} className="text-sm">
                    {tile.type.charAt(0).toUpperCase() + tile.type.slice(1)} {tile.value}
                  </Text>
                ))}
              </Card>

              {/* Section 2: Flags and Longest Paths */}
              <Card className="mb-4">
                <Heading>Section 2: Flags & Longest Paths</Heading>
                <Text className="text-lg font-semibold mb-2">
                  Score: {section2Score} points
                </Text>
                
                <Heading size="sm" className="mt-2 mb-1">Flags</Heading>
                <FormInput
                  name="grainFlags"
                  label="Grain Flags"
                  inputProps={{ 
                    placeholder: "0",
                    keyboardType: "numeric" as const
                  }}
                />
                <FormInput
                  name="cityFlags"
                  label="City Flags"
                  inputProps={{ 
                    placeholder: "0",
                    keyboardType: "numeric" as const
                  }}
                />
                <FormInput
                  name="forestFlags"
                  label="Forest Flags"
                  inputProps={{ 
                    placeholder: "0",
                    keyboardType: "numeric" as const
                  }}
                />

                <Heading size="sm" className="mt-2 mb-1">Longest Paths</Heading>
                <FormInput
                  name="longestRailroad"
                  label="Longest Railroad"
                  inputProps={{ 
                    placeholder: "0",
                    keyboardType: "numeric" as const
                  }}
                />
                <FormInput
                  name="longestRiver"
                  label="Longest River"
                  inputProps={{ 
                    placeholder: "0",
                    keyboardType: "numeric" as const
                  }}
                />
              </Card>

              {/* Section 3: Achievements */}
              {campaign?.achievements && campaign.achievements.length > 0 && (
                <Card className="mb-4">
                  <Heading>Section 3: Achievements</Heading>
                  <Text className="text-lg font-semibold mb-2">
                    Score: {section3Score} points
                  </Text>
                  
                  {campaign.achievements.map((achievement: any) => (
                    <FormInput
                      key={achievement.id}
                      name={achievement.achievementKey}
                      label={achievement.name}
                      inputProps={{ 
                        placeholder: "0",
                        keyboardType: "numeric" as const
                      }}
                    />
                  ))}
                </Card>
              )}

              {/* Total Score */}
              <Card className="mb-4">
                <Heading>Total Score</Heading>
                <Text className="text-2xl font-bold text-center">
                  {totalScore} points
                </Text>
                <View className="mt-2">
                  <Text>Section 1 (Task Tiles): {section1Score}</Text>
                  <Text>Section 2 (Flags & Paths): {section2Score}</Text>
                  <Text>Section 3 (Achievements): {section3Score}</Text>
                </View>
              </Card>

              <Button 
                onPress={handleSubmit as any} 
                disabled={isSubmitting}
                className="mb-4"
              >
                <ButtonText>
                  {isSubmitting ? 'Saving...' : 'Save Score & Finish Session'}
                </ButtonText>
              </Button>
            </VStack>
          );
        }}
      </Formik>
    </VStack>
  );
}
