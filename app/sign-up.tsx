import { useRef } from "react";
import { Link, router } from "expo-router";
import { Text, View, TextInput } from "react-native";
import { Input } from '@/components/ui/Input';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";

export default function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const onSubmit = (data: any) => {
        if (!data) return;

        if (passwordRef.current) {
            passwordRef.current.blur();
        }
        console.log('submit:', data);

        router.navigate('/sign-in');
    }

    return (
        <View className="w-full flex flex-1 h-screen justify-center items-center">
            <View className="w-4/5">
                <Text className="text-3xl mb-12 font-semibold text-slate-950">
                    Faça seu Cadastro
                </Text>
                <Input
                    name="user.name"
                    control={control}
                    placeholder="Nome de Usuário"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                />
                <Input
                    name="user.email"
                    control={control}
                    className="mt-3"
                    placeholder="E-mail"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    // @ts-ignore
                    error={errors.user?.email?.message}
                    required="E-mail é obrigatório."
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
                    required="Senha é obrigatória."
                />
                <Input
                    ref={confirmPasswordRef}
                    name="user.confirmPassword"
                    control={control}
                    placeholder="Confirme a Senha"
                    className="mt-3"
                    // @ts-ignore
                    error={errors.user?.confirmPassword?.message}
                    required="Confirmar Senha é obrigatória."
                />

                <Button
                    className="mt-6"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-white text-2xl font-semibold text-center">
                        Cadastrar
                    </Text>
                </Button>

                <View className="w-full border-t border-zinc-400 my-5" />

                <Link href="/sign-in">
                    <Text className="text-zinc-500 text-xl text-center">
                        Já tem uma conta? <Text className="underline">Entrar.</Text>
                    </Text>
                </Link>
            </View>
        </View>
    );
}