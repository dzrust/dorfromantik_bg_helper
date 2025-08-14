import { AchievementDB } from "@/db/schema";
import {
    ACHIEVEMENT_KEY,
    ACHIEVEMENT_TYPE,
    AchievementList,
    AchievementListItem,
} from "@/models/achievement";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button, ButtonText } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export type AchievementSectionProps = {
  boxType: ACHIEVEMENT_TYPE;
  achievements: AchievementListItem[];
  unlockedAchievements: AchievementDB[];
  onAchievementToggle: (
    achievementKey: ACHIEVEMENT_KEY,
    unlock: boolean
  ) => Promise<void>;
  isLoading?: boolean;
};
export const AchievementSection = ({
  boxType,
  achievements,
  unlockedAchievements,
  isLoading,
  onAchievementToggle,
}: AchievementSectionProps) => {
  const [processingAchievement, setProcessingAchievement] =
    useState<ACHIEVEMENT_KEY | null>(null);

  // Group achievements by box type

  const isAchievementUnlocked = (achievementKey: ACHIEVEMENT_KEY) => {
    return unlockedAchievements.some((ua) => ua.id === achievementKey);
  };

  const handleAchievementPress = async (achievementKey: ACHIEVEMENT_KEY) => {
    if (processingAchievement || isLoading) return;

    const isCurrentlyUnlocked = isAchievementUnlocked(achievementKey);
    const achievement = AchievementList.find((a) => a.value === achievementKey);

    if (isCurrentlyUnlocked) {
      // Show confirmation dialog for unmarking
      Alert.alert(
        "Remove Achievement",
        `Are you sure you want to remove "${achievement?.label}" from unlocked achievements?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
              setProcessingAchievement(achievementKey);
              try {
                await onAchievementToggle(achievementKey, false);
              } catch (error) {
                console.error("Failed to remove achievement:", error);
                Alert.alert(
                  "Error",
                  "Failed to remove achievement. Please try again."
                );
              } finally {
                setProcessingAchievement(null);
              }
            },
          },
        ]
      );
    } else {
      // Mark as unlocked without confirmation
      setProcessingAchievement(achievementKey);
      try {
        await onAchievementToggle(achievementKey, true);
      } catch (error) {
        console.error("Failed to unlock achievement:", error);
        Alert.alert("Error", "Failed to unlock achievement. Please try again.");
      } finally {
        setProcessingAchievement(null);
      }
    }
  };
  const getUnlockedCount = (boxType: ACHIEVEMENT_TYPE) =>
    achievements.filter((a) => isAchievementUnlocked(a.value)).length;

  if (!achievements || achievements.length === 0) return null;

  const unlockedCount = getUnlockedCount(boxType);
  const totalCount = achievements.length;

  return (
    <Card key={boxType} className="mb-4">
      <View className="flex-row justify-between items-center mb-3">
        <Heading size="md">{boxType}</Heading>
        <Text className="text-neutral-500">
          {unlockedCount}/{totalCount} unlocked
        </Text>
      </View>

      <VStack className="gap-2">
        {achievements.map((achievement) => {
          const isUnlocked = isAchievementUnlocked(achievement.value);
          const isProcessing = processingAchievement === achievement.value;

          return (
            <View
              key={achievement.value}
              className="flex-row justify-between items-center py-2 px-3 rounded-md border border-gray-200"
              style={{
                backgroundColor: isUnlocked ? "#f0f9ff" : "#ffffff",
                borderColor: isUnlocked ? "#0ea5e9" : "#e5e7eb",
              }}
            >
              <View className="flex-1">
                <Text
                  className={`font-medium ${
                    isUnlocked ? "text-sky-700" : "text-gray-900"
                  }`}
                >
                  {achievement.label}
                </Text>
                {isUnlocked && (
                  <Text className="text-xs text-sky-600 mt-1">Unlocked</Text>
                )}
              </View>

              <Button
                size="sm"
                variant={isUnlocked ? "outline" : "solid"}
                onPress={() => handleAchievementPress(achievement.value)}
                disabled={isProcessing || isLoading}
                className={isUnlocked ? "border-sky-500" : ""}
              >
                <ButtonText
                  className={`text-xs ${
                    isUnlocked ? "text-sky-600" : "text-white"
                  }`}
                >
                  {isProcessing ? "..." : isUnlocked ? "Remove" : "Unlock"}
                </ButtonText>
              </Button>
            </View>
          );
        })}
      </VStack>
    </Card>
  );
};
