export interface IQuery {
    index(): string | Promise<string>;
    securedAdminResource(): string | Promise<string>;
    securedNormalUserResource(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
}
