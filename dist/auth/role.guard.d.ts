import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare const Roles: {
    admin: string;
    normal_user: string;
};
export declare class RoleGuard implements CanActivate {
    role: string;
    constructor(role: string);
    canActivate(context: ExecutionContext): boolean;
}
