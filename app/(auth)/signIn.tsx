// import { api } from "@/utils/api";
import { useRef } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Input } from '@/components/Input';
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { Button } from "@/components/Button";

// async function sendMessage(message: string) {
//   const response = await api.post("/api", { message });

//   return response;
// }

export default function SignIn() {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const passwordRef = useRef<TextInput>(null);

    // const handleSendMessage = async () => {
    //   if (!value) return;

    //   await sendMessage(value).then(({ data }) => {
    //     setMessage(data.message);
    //   });
    // };

    const onSubmit = (data: any) => {
        if (passwordRef.current) {
            passwordRef.current.blur();
        }
        console.log('submit:', data);
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