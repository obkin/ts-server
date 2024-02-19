import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

interface IUsersService {
	createUser(dto: UserRegisterDto): Promise<UserModel | null | void>;
	validateUser(dto: UserLoginDto): Promise<boolean | void>;
	findUser(email: string): Promise<UserModel | null | void>;

	changeUserName(userId: number, newName: string): Promise<void>;
	changeUserEmail(userId: number, newEmail: string): Promise<void | boolean>;
	changeUserPass(userId: number, newPass: string): Promise<void | boolean>;
}

export { IUsersService };
