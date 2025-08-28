import Text from '@/components/ui/text';
import VStack from '@/components/ui/vstack';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <VStack>
        <Text>This screen does not exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </VStack>
    </>
  );
}
