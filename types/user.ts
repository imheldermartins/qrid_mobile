export type UserData = {
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    balance: number;
    tags: string[];
};