import { useRef } from "react";
import { Text, View, TextInput } from "react-native";
import { Input } from '@/components/Input';
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { Button } from "@/components/Button";
import { api } from "@/utils/api";
import { UserData } from "@/types/user";
import { useAuth } from "@/contexts/SessionContext";

async function signIn(email: string, password: string): Promise<{ data: UserData; token: string }> {
    const {
        data: { data },
        headers: { authorization: token }
    } = await api.get(`/user/auth?email=${email}&password=${password}`);

    return { token, data };
}

export default function SignIn() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();

    const passwordRef = useRef<TextInput>(null);

    const onSubmit = async (data: any) => {
        if (passwordRef.current) {
            passwordRef.current.blur();
        }

        const { email, password } = data.user;

        const { data: user, token } = await signIn(email, password);

        if (login(token, user)) {
            router.navigate("/(app)/home");
        }
    }

    return (
        <View className="w-full flex flex-1 h-screen justify-center items-center">
            <View className="w-4/5">
                <Text className="text-3xl mb-12 font-semibold text-slate-950">
                    Faça seu login
                </Text>
                <Input
                    name="user.email"
                    control={control}
                    placeholder="E-mail"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    // @ts-ignore
                    error={errors.user?.email?.message}
                    required="E-mail é obrigatório"
                    typeField="email"
                />
                <Input
                    ref={passwordRef}
                    name="user.password"
                    control={control}
                    placeholder="Senha"
                    className="mt-3"
                    // @ts-ignore
                    error={errors.user?.password?.message}
                    required="Senha é obrigatória"
                />

                <Button
                    className="mt-6"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-white text-2xl font-semibold text-center">
                        Entrar
                    </Text>
                </Button>

                <View className="w-full border-t border-zinc-400 my-5" />

                <Link href="/signUp">
                    <Text className="text-zinc-500 text-xl text-center">
                        Não tem uma conta ainda? <Text className="underline">Crie uma.</Text>
                    </Text>
                </Link>
            </View>
        </View>
    );
}