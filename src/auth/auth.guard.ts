import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserEntity } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{        
        const ctx = GqlExecutionContext.create(context).getContext()
        
        const {email, password} = ctx.req.body.variables;
        const user: UserEntity = await this.userService.findUserByEmail(email)

        if(!user){
            throw new NotFoundException('User with this email not found!');
        }

        if(user.password !== password){
            throw new BadRequestException('Password not correct!')
        }

        ctx.user = user;
        return true;
    }
   
}  