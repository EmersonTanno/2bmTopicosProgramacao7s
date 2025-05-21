import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByName(username);


    if (!user || !(await bcrypt.compare(pass, user.password))) {
        throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = {
        sub: user.id,
        username: user.name,
        roles: user.roles,
    };

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
  }
}
