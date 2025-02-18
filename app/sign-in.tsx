import { useRef } from "react";
import { Text, View, TextInput } from "react-native";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { api } from "@/utils/api";
import { UserData } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";
import RHFControlReturn from "@/utils/RHFControlReturn";
import React from "react";
import { useSnackbar } from "@/contexts/ui/SnackbarContext";
// import { Feather } from "@expo/vector-icons";
import { Loading } from "@/components/Loading";

async function signIn(email: string, password: string): Promise<{
    data: UserData & { error?: string };
    token: string;
}> {
    const {
        data,
        headers: { authorization: token },
    } = await api.get(`/user/auth?email=${email}&password=${password}`);

    return { token, data };
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
            const { data, token } = await signIn(email, password);

            if (!login(token, data)) {
                console.log("Erro ao fazer login");
                throw new Error(JSON.stringify(data));
            }

            router.replace("/");
        } catch (e: any) {
            const { error, status } = JSON.parse(String(e.message));
            // console.log(`(status ${status}) ${error}`);
            show({
                message: error,
                type: "error",
            });
        }
    };

    return (
        <View className="w-full flex flex-1 h-screen justify-center items-center">
            <View className="w-4/5">
                <Text className="text-3xl mb-12 font-semibold text-slate-950">
                    Faça seu login
                </Text>
                <Input
                    control={RHFControlReturn(control)}
                    name="email"
                    placeholder="E-mail"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    error={errors.email?.message}
                    required="E-mail é obrigatório"
                    typeField="email"
                />
                <Input
                    ref={passwordRef}
                    control={RHFControlReturn(control)}
                    name="password"
                    placeholder="Senha"
                    className="mt-3"
                    error={errors.password?.message}
                    required="Senha é obrigatória"
                    typeField="password"
                />

                <Button className="mt-6" onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white text-2xl font-semibold text-center">
                        {!isLoading ? "Entrar" : (
                            <Loading type="spinner" />
                        )}
                    </Text>
                </Button>

                <View className="w-full border-t border-zinc-400 my-5" />

                <Link href="/sign-up">
                    <Text className="text-zinc-500 text-xl text-center">
                        Não tem uma conta ainda? <Text className="underline">Crie uma.</Text>
                    </Text>
                </Link>
            </View>
        </View>
    );
}
