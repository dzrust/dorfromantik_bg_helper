import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Checkbox from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import Text from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAchievements } from '@/hooks/useAchievements';
import { ACHIEVEMENT_KEY } from '@/models/achievement';
import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function CampaignList() {
  const router = useRouter();
  const { allAchievements, isUnlocked, unlock, lock, isLoading } = useAchievements();

  const onAchievementCheckedChanged = (achievementId: ACHIEVEMENT_KEY) => (checked: boolean) =>
    checked ? unlock(achievementId) : lock(achievementId);
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      {children}
    </>
  );

  if (isLoading) {
    return (
      <Wrapper>
        <VStack className="flex-1 items-center justify-center p-4">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="mt-4">Loading achievements...</Text>
        </VStack>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ScrollView>
        <VStack className="flex-1 p-4">
          <Heading>Dorfromantik Board Game Helper</Heading>
          <Button onPress={() => router.navigate('/session/new/play')} disabled={isLoading}>
            Play Game
          </Button>
          <Card className="mb-4">
            <Heading size="md" className="mb-4">
              Achievements
            </Heading>
            <Text variant="caption" className="mb-3">
              Unlocked: {allAchievements.filter((a) => a.unlockedAt).length} /{' '}
              {allAchievements.length}
            </Text>
            <VStack space="sm">
              {allAchievements.map((achievement) => (
                <Checkbox
                  key={achievement.id}
                  label={achievement?.name}
                  defaultChecked={isUnlocked(achievement.id)}
                  onCheckedChange={onAchievementCheckedChanged(achievement.id)}
                  disabled={isLoading}
                />
              ))}
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </Wrapper>
  );
}
