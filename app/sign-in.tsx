import { useRef } from "react";
import { View, TextInput } from "react-native";
import { Input } from "@/components/ui/forms/Input";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { api } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import RHFControlReturn from "@/utils/RHFControlReturn";
import React from "react";
import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import API_RESPONSES from "@/types/responses.api.";
import { Typography } from "@/components/ui/Typography";
import { styles } from "@/styles/screens/signInStyle";
import { Divider } from "@/components/ui/Divider";

async function signIn(
    email: string,
    password: string
): Promise<API_RESPONSES.JWTResponse> {
    const { data } = await api.post(`user/login/`, {
        email,
        password,
    });

    return data;
}

interface SignInFormData {
    email: string;
    password: string;
}

export default function SignIn() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>();

    const { login, isLoading } = useAuth();
    const passwordRef = useRef<TextInput>(null);

    const { show } = useSnackbar();

    const onSubmit = async (formData: SignInFormData) => {
        if (passwordRef.current) {
            passwordRef.current.blur();
        }

        try {
            const { email, password } = formData;
            const response = await signIn(email, password);

            if (!login(response)) throw new Error(JSON.stringify(response));

            router.dismissAll();
            router.replace("/");
        } catch (e) {

            const { message, status, response } = e as API_RESPONSES.RequestError;

            console.log(`(status ${status}) ${message}`);
            show({
                message: response?.data?.detail || message,
                type: "error",
            });
        }
    };

    return (
        <View style={styles.screen}>
            <Typography variant="h5" style={styles.title}>
                Faça seu login
            </Typography>
            <View style={styles.container}>
                <Input
                    control={RHFControlReturn(control)}
                    name="email"
                    title="E-mail"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    error={errors.email?.message}
                    required="E-mail é obrigatório"
                    typeField="email"
                    fullWidth
                />
                <Input
                    ref={passwordRef}
                    control={RHFControlReturn(control)}
                    name="password"
                    title="Senha"
                    error={errors.password?.message}
                    required="Senha é obrigatória"
                    typeField="password"
                    fullWidth
                />

                <Button title={!isLoading ? "Entrar" : "Carregando..."} style={styles.button} onPress={handleSubmit(onSubmit)} />

                <Divider style={{
                    marginVertical: 20,
                }} />

                <Link href="/sign-up">
                    <Typography variant="body1" style={styles.linkText}>
                        Não tem uma conta ainda? <Typography style={styles.link}>Crie uma.</Typography>
                    </Typography>
                </Link>
            </View>
        </View>
    );
}
