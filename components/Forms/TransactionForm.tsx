import { ScrollView, TextInput, View } from "react-native";
import { Button } from "../ui/Button";
import { Input } from "../ui/forms/Input";
import RHFControlReturn from "@/utils/RHFControlReturn";
import API_RESPONSES from "@/types/responses.api.";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { Typography } from "../ui/Typography";
import { Select } from '../ui/forms/Select';
import clsx from "clsx";
import { DateTimePicker } from "../ui/forms/DateTimePicker";
import { Category } from "@/types/transactions";
import { api } from "@/utils/api";
import { Wallet } from "@/types/wallets";

// import { colors } from "@/styles/colors";

type TransactionFormData = {
    title?: string;
    description?: string;
    tags: string[];
    payment_method: "CASH" | "CREDIT-CARD" | "DEBIT-CARD" | "BANK-TRANSFER" | "PAYPAL" | "PIX" | "OTHER";
    amount: number;
    scheduled_date: `${number}-${number}-${number}`;
    category_id: number;
    wallet_monthly_id: number;
};

interface TransactionFormProps {
    type: Category['type'];
};

async function getCategories(): Promise<Category[]> {
    const { data } = await api.get('categories/');
    return data;
}

async function getWallets(): Promise<Wallet[]> {
    const { data } = await api.get('wallets/');
    return data;
}

export const TransactionForm = ({ type }: TransactionFormProps) => {
    const {
        control,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<TransactionFormData>();

    const [categoriesOptions, setCategoriesOptions] = useState<{ label: string; value: number; }[]>([]);
    const [walletsOptions, setWalletsOptions] = useState<{ label: string; value: number; }[]>([]);

    const inputRefs = useRef<{ [key: string]: TextInput | null }>({});

    const setRef = useCallback((name: keyof TransactionFormData, input: TextInput) => {
        if (input) {
            inputRefs.current[name] = input;
        }
    }, [])

    const focusNext = (field: keyof TransactionFormData) => {
        if (inputRefs.current[field]) {
            inputRefs.current[field]?.focus();
        }
    }

    const onSubmit = async (formData: TransactionFormData) => {
        if (!formData) return;

        //   if (inputRefs.current['confirmPassword']) {
        //       inputRefs.current['confirmPassword']?.blur();
        //   }

        try {

            console.log('trans. \n', formData);

            //   await signUp(formData).then(() => {
            //       show({
            //           message: "Cadastro realizado com sucesso!",
            //           type: "success",
            //       });

            //       router.navigate('/sign-in');
            //   });
        } catch (e) {

            const { message, status, response } = e as API_RESPONSES.RequestError;

            console.log(`(status ${status}) ${message}`);
            //   show({
            //       message: response?.data?.detail || message,
            //       type: "error",
            //   });
        }
    }

    const selectOptionsParser = (options: { id: number; name: string; }[]) => {
        return options.map(option => ({ label: option.name, value: option.id }));
    };

    useEffect(() => {
        getCategories().then(categories =>
            setCategoriesOptions(selectOptionsParser(categories))
        )
    }, []);

    useEffect(() => {
        getWallets().then(wallets =>
            setWalletsOptions(selectOptionsParser(wallets))
        );
    }, []);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View className="w-full flex pb-6">
                <Typography
                    variant='h3'
                    className='!text-center mt-4 mb-6'
                >
                    Criar uma <Typography variant='h3' className={clsx({
                        'text-green-500': type === 'income',
                        'text-red-500': type === 'expense',
                        'text-blue-500': type === 'transfer',
                    })}>{
                            type === 'income' ? 'Receita'
                                : type === 'expense' ? 'Despesa'
                                    : 'Movimentação'
                        }</Typography>
                </Typography>
                <View className="flex-1 gap-2 px-4">
                    <Input
                        ref={ref => setRef('title', ref!)}
                        name="title"
                        control={RHFControlReturn(control)}
                        title="Título"
                        placeholder="Ex. Salário da Empresa XXX"
                        onSubmitEditing={() => focusNext('description')}
                        returnKeyType="next"
                        className="!py-5 text-xl"
                    // error={errors.title?.message}
                    // required="Nome é obrigatório."
                    />
                    <Input
                        ref={ref => setRef('description', ref!)}
                        name="description"
                        control={RHFControlReturn(control)}
                        className="!py-5 text-xl"
                        title="Descrição"
                        placeholder="Rec. ref. ao pagamento do mês de janeiro"
                        onSubmitEditing={() => focusNext('amount')}
                        returnKeyType="next"
                        mt={15}
                    />
                    <Input
                        ref={ref => setRef('amount', ref!)}
                        name="amount"
                        control={RHFControlReturn(control)}
                        className="!py-5 text-xl"
                        title="Valor"
                        placeholder="Ex. R$ 3500,00"
                        // onSubmitEditing={() => focusNext('password')}
                        returnKeyType="next"
                        mt={15}
                    // error={errors.email?.message}
                    // required="E-mail é obrigatório."
                    // typeField="currency"
                    />
                    <Select
                        name="payment_method"
                        control={control}
                        options={[
                            { label: 'Dinheiro', value: 'CASH' },
                            { label: 'Cartão de Crédito', value: 'CREDIT-CARD' },
                            { label: 'Cartão de Débito', value: 'DEBIT-CARD' },
                            { label: 'Transferência Bancária', value: 'BANK-TRANSFER' },
                            { label: 'PayPal', value: 'PAYPAL' },
                            { label: 'PIX', value: 'PIX' },
                            { label: 'Outro', value: 'OTHER' },
                        ]}
                        className="!py-1"
                        placeholder="Método de Pagamento"
                        mt={15}
                    />

                    <Select
                        name="category_id"
                        control={control}
                        options={categoriesOptions}
                        className="!py-1"
                        title="Categoria"
                        placeholder="Em qual categoria se encaixa?"
                        mt={15}
                    />

                    <Select
                        name="wallet_id"
                        control={control}
                        options={walletsOptions}
                        className="!py-1"
                        placeholder="Qual carteira deseja movimentar?"
                        mt={15}
                    />

                    <DateTimePicker
                        name="scheduled_date"
                        control={control}
                        mode="date"
                        className="!py-5 text-xl"
                        title="Data"
                        mt={15}
                    />

                    <Button
                        title="Adicionar"
                        className={clsx("mt-6 !py-4", {
                            'bg-green-600': type === 'income',
                            'bg-red-600': type === 'expense',
                            'bg-blue-600': type === 'transfer',
                        })}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}