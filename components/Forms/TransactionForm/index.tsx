import { transactionFormStyles } from "./style";

import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/ui/Typography";
import { RHFDateTimePicker } from "@/components/ui/forms/RHFDateTimePicker";
import { RHFSelect } from "@/components/ui/forms/RHFSelect";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/forms/Input";

import RHFControlReturn from "@/utils/RHFControlReturn";
import { api } from "@/utils/api";

import API_RESPONSES from "@/types/responses.api.";
import { Category } from "@/types/transactions";
import { Wallet } from "@/types/wallets";

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

    /** TODO: Refactor this function to use a more generic type for the options */
    const selectOptionsParser = (
        options: { id: number; name: string; icon?: string; color?: string; }[]
    ) => options.map(option => ({
        label: option.name,
        value: option.id,
        icon: option.icon || undefined,
        color: option.color || undefined,
    }));

    useEffect(() => {
        getCategories()
            .then(categories =>
                setCategoriesOptions(selectOptionsParser(categories))
            );
    }, []);

    useEffect(() => {
        getWallets()
            .then(wallets =>
                setWalletsOptions(selectOptionsParser(wallets))
            );
    }, []);

    return (
        <ScrollView style={transactionFormStyles.container}>
            <View className="w-full flex pb-6">
                <Typography variant='h6' f="medium" style={transactionFormStyles.title}>
                    nova{" "}
                    <Typography
                        variant="h6"
                        style={StyleSheet.flatten([
                            transactionFormStyles[`${type}Title`]
                        ])}
                    >
                        {
                            type === 'income' ? 'Receita'
                                : type === 'expense' ? 'Despesa'
                                    : 'Movimentação'
                        }
                    </Typography>
                </Typography>
                <View style={transactionFormStyles.formContainer}>
                    <Input
                        ref={ref => setRef('title', ref!)}
                        name="title"
                        control={RHFControlReturn(control)}
                        title="Título"
                        placeholder="ex. Salário da Empresa XXX"
                        onSubmitEditing={() => focusNext('description')}
                        returnKeyType="next"
                    // error={errors.title?.message}
                    // required="Nome é obrigatório."
                    />
                    <Input
                        ref={ref => setRef('description', ref!)}
                        name="description"
                        control={RHFControlReturn(control)}
                        title="Descrição"
                        placeholder="ex. Rec. ref. ao pagamento do mês de janeiro"
                        onSubmitEditing={() => focusNext('amount')}
                        returnKeyType="next"
                    />
                    <Input
                        ref={ref => setRef('amount', ref!)}
                        name="amount"
                        control={RHFControlReturn(control)}
                        title="Valor"
                        placeholder="ex. R$ 3500,00"
                        // onSubmitEditing={() => focusNext('password')}
                        returnKeyType="next"
                    // error={errors.email?.message}
                    // required="E-mail é obrigatório."
                    // typeField="currency"
                    />
                    <RHFSelect
                        name="payment_method"
                        control={RHFControlReturn(control)}
                        options={[
                            { label: 'Dinheiro', value: 'CASH' },
                            { label: 'Cartão de Crédito', value: 'CREDIT-CARD' },
                            { label: 'Cartão de Débito', value: 'DEBIT-CARD' },
                            { label: 'Transferência Bancária', value: 'BANK-TRANSFER' },
                            { label: 'PayPal', value: 'PAYPAL' },
                            { label: 'PIX', value: 'PIX' },
                            { label: 'Outro', value: 'OTHER' },
                        ]}
                        title="Método de Pagamento"
                        placeholder="Selecione um método de pagamento"
                    />

                    <RHFSelect
                        name="category_id"
                        control={RHFControlReturn(control)}
                        options={categoriesOptions}
                        title="Categoria"
                        placeholder="ex. Serviço, Produto, Aluguel, etc."
                    />

                    <RHFSelect
                        name="wallet_id"
                        control={RHFControlReturn(control)}
                        options={walletsOptions}
                        title="Carteira"
                        placeholder="ex. Carteira, Banco XYZ, etc."
                    />

                    <RHFDateTimePicker
                        name="scheduled_date"
                        control={RHFControlReturn(control)}
                        mode="date"
                        title="Data"
                    />

                    <Button
                        title="Adicionar"
                        style={StyleSheet.flatten([
                            { backgroundColor: transactionFormStyles[`${type}Title`].color }
                        ])}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}