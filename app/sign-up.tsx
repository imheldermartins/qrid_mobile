import { useRef, useCallback } from "react";
import { Link, router } from "expo-router";
import { Text, View, TextInput } from "react-native";
import { Input } from '@/components/ui/forms/Input';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import RHFControlReturn from "@/utils/RHFControlReturn";
import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import { api } from "@/utils/api";
import { UserData } from "@/types/user";
import API_RESPONSES from "@/types/responses.api.";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { styles } from "@/styles/screens/signUpStyle";

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

                setTimeout(() => {
                    router.navigate('/sign-in');
                }, 1000);
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
        <View style={styles.screen}>
            <Typography variant="h5" style={styles.title}>
                Faça seu cadastro
            </Typography>
            <View style={styles.container}>
                <Input
                    ref={ref => setRef('first_name', ref!)}
                    name="first_name"
                    control={RHFControlReturn(control)}
                    title="Nome"
                    placeholder="ex. João"
                    onSubmitEditing={() => focusNext('last_name')}
                    returnKeyType="next"
                    error={errors.first_name?.message}
                    required="Nome é obrigatório."
                    fullWidth
                />
                <Input
                    ref={ref => setRef('last_name', ref!)}
                    name="last_name"
                    control={RHFControlReturn(control)}
                    title="Sobrenome"
                    placeholder="ex. da Silva"
                    onSubmitEditing={() => focusNext('email')}
                    returnKeyType="next"
                    fullWidth
                />
                <Input
                    ref={ref => setRef('email', ref!)}
                    name="email"
                    control={RHFControlReturn(control)}
                    title="E-mail"
                    placeholder="ex. seu_email@endereço.domínio"
                    onSubmitEditing={() => focusNext('password')}
                    returnKeyType="next"
                    error={errors.email?.message}
                    required="E-mail é obrigatório."
                    typeField="email"
                    fullWidth
                />
                <Input
                    ref={ref => setRef('password', ref!)}
                    name="password"
                    control={RHFControlReturn(control)}
                    title="Senha"
                    onSubmitEditing={() => focusNext('confirmPassword')}
                    error={errors.password?.message}
                    required="Senha é obrigatória."
                    fullWidth
                />
                <Input
                    ref={ref => setRef('confirmPassword', ref!)}
                    name="confirmPassword"
                    control={RHFControlReturn(control)}
                    title="Confirme a Senha"
                    error={errors.confirmPassword?.message}
                    required="Confirmar Senha é obrigatória."
                    rules={{
                        validate: value =>
                            value === watch('password') || "As senhas não coincidem."
                    }}
                    fullWidth
                />

                <Button
                    title="Cadastrar"
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    Cadastrar
                </Button>

                <Divider style={{ marginVertical: 20 }} />

                <Link href="/sign-in">
                    <Typography variant="body1" className="text-zinc-500 text-xl !text-center">
                        Já tem uma conta? <Text className="underline">Entrar.</Text>
                    </Typography>
                </Link>
            </View>
        </View>
    );
}