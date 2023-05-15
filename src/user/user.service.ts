import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) public readonly userRepo: Repository<UserEntity>){}


    async findUserByEmail(email: string): Promise<UserEntity>{
        const user: UserEntity = await this.userRepo.findOne({where: {email: email}})
        return user;
    }

}