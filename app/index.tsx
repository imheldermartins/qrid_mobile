import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.authorDescription}>Criado por <Text style={{ fontWeight: 'bold' }}>Helder Martins</Text></Text>
        <Text style={styles.mainTitle}>Aplicativo de Gerenciamento de Finanças</Text>
        <Link href="/(auth)/signIn" style={styles.redirect}>
          <Text>Fazer Login</Text>
        </Link>
      </View>
      <StatusBar style='dark' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10
  },
  authorDescription: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#333'
  },
  authorStrong: {
    fontWeight: 'bold',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111'
  },
  redirect: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    color: '#fff',
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
