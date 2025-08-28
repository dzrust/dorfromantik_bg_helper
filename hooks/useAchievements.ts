import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACHIEVEMENT_KEY, AchievementList, Achievement } from '../models/achievement';

const ACHIEVEMENTS_STORAGE_KEY = 'unlocked_achievements';

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<ACHIEVEMENT_KEY[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load unlocked achievements from storage on mount
  useEffect(() => {
    loadUnlockedAchievements();
  }, []);

  const loadUnlockedAchievements = async () => {
    try {
      setIsLoading(true);
      const storedAchievements = await AsyncStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (storedAchievements) {
        const parsed: ACHIEVEMENT_KEY[] = JSON.parse(storedAchievements);
        setUnlockedAchievements(parsed);
      }
    } catch (error) {
      console.error('Failed to load unlocked achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUnlockedAchievements = async (achievements: ACHIEVEMENT_KEY[]) => {
    try {
      await AsyncStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
    } catch (error) {
      console.error('Failed to save unlocked achievements:', error);
    }
  };

  const unlock = useCallback(async (achievementId: ACHIEVEMENT_KEY) => {
    try {
      setIsLoading(true);
      setUnlockedAchievements(prev => {
        if (!prev.includes(achievementId)) {
          const updated = [...prev, achievementId];
          saveUnlockedAchievements(updated);
          return updated;
        }
        return prev;
      });
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const lock = useCallback(async (achievementId: ACHIEVEMENT_KEY) => {
    try {
      setIsLoading(true);
      setUnlockedAchievements(prev => {
        const filtered = prev.filter(id => id !== achievementId);
        saveUnlockedAchievements(filtered);
        return filtered;
      });
    } catch (error) {
      console.error('Failed to lock achievement:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isUnlocked = useCallback((achievementId: ACHIEVEMENT_KEY): boolean => {
    return unlockedAchievements.includes(achievementId);
  }, [unlockedAchievements]);

  // Get all achievements with unlock status
  const allAchievements: Achievement[] = AchievementList.map(item => ({
    id: item.value,
    name: item.label,
    type: item.type,
    unlockedAt: unlockedAchievements.includes(item.value) 
      ? new Date().toISOString() 
      : undefined,
  }));

  // Get only unlocked achievements
  const unlockedAchievementDetails: Achievement[] = allAchievements.filter(
    achievement => achievement.unlockedAt !== undefined
  );

  return {
    allAchievements,
    unlockedAchievements: unlockedAchievementDetails,
    unlockedAchievementIds: unlockedAchievements,
    unlock,
    lock,
    isUnlocked,
    isLoading,
    refresh: loadUnlockedAchievements,
  };
}