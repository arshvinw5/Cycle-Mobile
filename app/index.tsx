import { Redirect } from 'expo-router';

export default function Home() {
  return <Redirect href="./(auth)/welcome" />;
}

// <Stack.Screen options={{ title: 'Home' }} />
// <Container>
//   <ScreenContent path="app/index.tsx" title="Cycle" />
//   <Link href={{ pathname: './explore', params: { name: 'Explore' } }} asChild>
//     <Button title="Let's Explore" />
//   </Link>
// </Container>
