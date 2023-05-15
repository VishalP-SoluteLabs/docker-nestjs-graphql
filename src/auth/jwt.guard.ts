import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserEntity } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate{


    async canActivate(context: ExecutionContext): Promise<boolean>{        
        const ctx = GqlExecutionContext.create(context).getContext()
        
        const authorizationHeader = ctx.req.headers.authorization;
        if(!authorizationHeader){
            throw new NotFoundException('Invalid Token!')
        }

        const token = authorizationHeader.split(' ')[1];

        const user = jwt.verify(token, 'secretkey');
        ctx.user = user;

        return true;
    }
   
}  