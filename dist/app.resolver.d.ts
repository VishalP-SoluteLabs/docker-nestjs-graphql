import { UserEntity } from './user/entity/user.entity';
export declare class AppResolver {
    index(): string;
    securedAdminResource(user: any): string;
    securedNormalUserResource(user: any): string;
    login(email: string, password: string, user: UserEntity): string;
}
