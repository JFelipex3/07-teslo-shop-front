import type { User } from "@/interfaces/user.interface";

// valido para Login, Register, CheckStatus
export interface AuthResponse {
    user:  User;
    token: string;
}
