import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AchievementDB } from "@/db/schema";
import {
    ACHIEVEMENT_KEY,
    ACHIEVEMENT_TYPE,
    AchievementListItem,
    AchievementList as AllAchievements,
} from "@/models/achievement";
import React from "react";
import { View } from "react-native";
import { AchievementSection } from "./AchievementSection";

interface AchievementListProps {
  unlockedAchievements: AchievementDB[];
  onAchievementToggle: (
    achievementKey: ACHIEVEMENT_KEY,
    unlock: boolean
  ) => Promise<void>;
  isLoading?: boolean;
}

export function AchievementList({
  unlockedAchievements,
  onAchievementToggle,
  isLoading = false,
}: AchievementListProps) {
  const achievementsByBox = AllAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.type]) {
      acc[achievement.type] = [];
    }
    acc[achievement.type].push(achievement);
    return acc;
  }, {} as Record<ACHIEVEMENT_TYPE, AchievementListItem[]>);

  // Get box types in order
  const boxOrder = [
    ACHIEVEMENT_TYPE.BOX_1,
    ACHIEVEMENT_TYPE.BOX_2,
    ACHIEVEMENT_TYPE.BOX_3,
    ACHIEVEMENT_TYPE.BOX_4,
    ACHIEVEMENT_TYPE.BOX_5,
  ];

  const totalUnlocked = unlockedAchievements.length;
  const totalAchievements = AllAchievements.length;

  return (
    <VStack className="gap-4">
      {/* Summary Header */}
      <Card>
        <View className="text-center">
          <Heading size="lg">Campaign Achievements</Heading>
          <Text className="text-neutral-500 mt-1">
            {totalUnlocked}/{totalAchievements} total achievements unlocked
          </Text>
          {totalUnlocked > 0 && (
            <View className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <View
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(totalUnlocked / totalAchievements) * 100}%`,
                }}
              />
            </View>
          )}
        </View>
      </Card>

      {/* Achievement Boxes */}
      {boxOrder.map((boxType) => (
        <AchievementSection
          boxType={boxType}
          achievements={achievementsByBox[boxType]}
          unlockedAchievements={unlockedAchievements}
          isLoading={isLoading}
          onAchievementToggle={onAchievementToggle}
        />
      ))}
    </VStack>
  );
}
