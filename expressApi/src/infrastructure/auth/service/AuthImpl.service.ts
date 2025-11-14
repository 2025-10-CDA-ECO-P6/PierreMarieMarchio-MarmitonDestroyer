import bcrypt from 'bcryptjs';
import {
  AuthRepository,
  AuthService,
  JWTService,
} from '../../../core/domain/features/auth/interfaces';
import { User } from '../../../core/domain/common/entities';

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JWTService,
  ) {}

  async login(request: {
    password: string;
    email: string;
  }): Promise<{ token: string; user: User }> {
    const user = await this.authRepo.findByEmail(request.email);
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(request.password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = this.jwtService.sign({ userId: user.id });

    return { token, user };
  }

  async register(request: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ token: string; user: User }> {
    const existing = await this.authRepo.findByEmail(request.email);
    if (existing) throw new Error('Email already used');

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const user = new User(
      crypto.randomUUID(),
      request.name,
      request.email,
      hashedPassword,
      new Date(),
      new Date(),
    );

    await this.authRepo.add(user);

    const token = this.jwtService.sign({ userId: user.id });
    return { token, user };
  }
}
