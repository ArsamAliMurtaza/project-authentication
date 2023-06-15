// auth/auth.service.spec.ts

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { User } from '../users/entitis/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest
              .fn()
              .mockImplementation(
                (payload: string | object | Buffer) => 'mocked-token',
              ),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: 'password',
            }),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('login', () => {
    it('should return a JWT token when provided with valid credentials', async () => {
      const token = await authService.login('johndoe@example.com', 'password');
      expect(token).toBe('mocked-token');
      expect(jwtService.sign).toBeCalledWith({ sub: 1 });
    });

    it('should throw an error when provided with invalid credentials', async () => {
      (usersService.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        authService.login('johndoe@example.com', 'password'),
      ).rejects.toThrow();
      expect(jwtService.sign).not.toBeCalled();
    });
  });
});
