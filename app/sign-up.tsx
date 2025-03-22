import { useRef, useCallback } from "react";
import { Link, router } from "expo-router";
import { Text, View, TextInput } from "react-native";
import { Input } from '@/components/ui/Input';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import RHFControlReturn from "@/utils/RHFControlReturn";
import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import { api } from "@/utils/api";
import { UserData } from "@/types/user";
import API_RESPONSES from "@/types/responses.api.";

async function signUp(submittedData: SignUpFormData): Promise<UserData> {
    const { data } = await api.post(`user/register/`, submittedData);

    return data;
}

interface SignUpFormData {
    first_name: string;
    last_name?: string;

    email: string;

    password: string;
    confirmPassword: string;
}

export default function SignUp() {

    const { show } = useSnackbar();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormData>();

    const inputRefs = useRef<{ [key: string]: TextInput | null }>({});

    const setRef = useCallback((name: string, input: TextInput) => {
        if (input) {
            inputRefs.current[name] = input;
        }
    }, [])

    const focusNext = (field: keyof SignUpFormData) => {
        if (inputRefs.current[field]) {
            inputRefs.current[field]?.focus();
        }
    }

    const onSubmit = async (formData: SignUpFormData) => {
        if (!formData) return;

        if (inputRefs.current['confirmPassword']) {
            inputRefs.current['confirmPassword']?.blur();
        }

        try {

            await signUp(formData).then(() => {
                show({
                    message: "Cadastro realizado com sucesso!",
                    type: "success",
                });

                router.navigate('/sign-in');
            });
        } catch (e) {

            const { message, status, response } = e as API_RESPONSES.RequestError;

            console.log(`(status ${status}) ${message}`);
            show({
                message: response?.data?.detail || message,
                type: "error",
            });
        }
    }

    return (
        <View className="w-full flex flex-1 h-screen justify-center items-center">
            <View className="w-4/5">
                <Text className="text-3xl mb-12 font-semibold text-slate-950">
                    Faça seu Cadastro
                </Text>
                <Input
                    ref={ref => setRef('first_name', ref!)}
                    name="first_name"
                    control={RHFControlReturn(control)}
                    placeholder="Nome"
                    onSubmitEditing={() => focusNext('last_name')}
                    returnKeyType="next"
                    error={errors.first_name?.message}
                    required="Nome é obrigatório."
                />
                <Input
                    ref={ref => setRef('last_name', ref!)}
                    name="last_name"
                    control={RHFControlReturn(control)}
                    className="mt-3"
                    placeholder="Sobrenome"
                    onSubmitEditing={() => focusNext('email')}
                    returnKeyType="next"
                />
                <Input
                    ref={ref => setRef('email', ref!)}
                    name="email"
                    control={RHFControlReturn(control)}
                    className="mt-3"
                    placeholder="E-mail"
                    onSubmitEditing={() => focusNext('password')}
                    returnKeyType="next"
                    error={errors.email?.message}
                    required="E-mail é obrigatório."
                    typeField="email"
                />
                <Input
                    ref={ref => setRef('password', ref!)}
                    name="password"
                    control={RHFControlReturn(control)}
                    placeholder="Senha"
                    onSubmitEditing={() => focusNext('confirmPassword')}
                    className="mt-3"
                    error={errors.password?.message}
                    required="Senha é obrigatória."
                />
                <Input
                    ref={ref => setRef('confirmPassword', ref!)}
                    name="confirmPassword"
                    control={RHFControlReturn(control)}
                    placeholder="Confirme a Senha"
                    className="mt-3"
                    error={errors.confirmPassword?.message}
                    required="Confirmar Senha é obrigatória."
                    rules={{
                        validate: value =>
                            value === watch('password') || "As senhas não coincidem."
                    }}
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