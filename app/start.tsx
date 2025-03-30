import { Typography } from '@/components/ui/Typography';
import { styles } from '@/styles/screens/startStyle';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function StartScreen() {
    return (
        <>
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Typography variant='body1' style={styles.authored}>
                        Criado por{" "}
                        <Typography f='semiBold' style={styles.author}>
                            Helder Martins {/* Describes author */}
                        </Typography>
                    </Typography>
                    <Typography
                        variant='h3'
                        style={styles.title}
                    >
                        Aplicativo de Gerenciamento de Finanças
                    </Typography>
                </View>

                <Link href="/sign-in" style={styles.linkContainer}>
                    <Typography
                        variant='button'
                        style={styles.linkText}
                    >
                        Começar
                    </Typography>
                </Link>

                <Typography
                    variant='body1'
                    style={styles.credits}
                >
                    QRID © {new Date().getFullYear()}
                </Typography>
            </View>

            <StatusBar style="light" />
        </>
    );
}
