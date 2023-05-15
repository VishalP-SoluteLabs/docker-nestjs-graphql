import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user/entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import  * as jwt from 'jsonwebtoken';
import { JwtGuard } from './auth/jwt.guard';
import { RoleGuard, Roles } from './auth/role.guard';

@Resolver(of => String)
export class AppResolver {
     
    @Query(returns => String)
    index(): string {
        return 'NestJs GraphQL Server'
    }

    
    @Query(returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.admin))
    securedAdminResource(@Context('user') user: any): string {
        return 'This is a secured data for Admin!' + user.email
    }
    
    @Query(returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.normal_user))
    securedNormalUserResource(@Context('user') user: any): string {
        return 'This is a secured data for Normal User!' + user.email
    }

    @Query(returns => String)
    @UseGuards(AuthGuard)
    login(@Args({name: 'email', type: () => String}) email: string, 
    @Args({name: 'password', type: () => String}) password: string,
    @Context('user') user: UserEntity
    ){
        let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role

        }

        return jwt.sign(payload, 'secretkey', { expiresIn: '1h'})
    }
}