/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

  describe('UserService', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;
    let userRepository: Repository<User>;
  
    beforeEach(async () => {   
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService, AuthService, JwtService, 
        
          {
            provide: JwtService,
            
            useValue: {
              sign: jest.fn(),
            },
          },
          {
            provide: UserService,
            useValue: {},
           
          },
          {
            provide: AuthService,
            useValue: {},
           
          },


        ],
      }).compile();  
      
      authService = module.get<AuthService>(AuthService);
      userService = module.get<UserService>(UserService);
      jwtService = module.get<JwtService>(JwtService);
      // userRepository=module.get<Repository<User>>(getRepositoryToken(User));
     
    });
  
    it('should return Invalid password', async () => {
      
      const get_input = {
        "email": "sara@gmail.com",
        "password": "12222"
    }
      const result_expected = {
        "response_message": "password Invalid"
    }
      expect(await userService.login(get_input)).toEqual(result_expected)

    // const tt = expect(await userService.findByEmail('',''))

    // console.log('11111111',tt)

    }); 


    
  // describe('Find By Email', () => {
  //   it('should return users record based on email', async () => {
         
  //     const get_input = {
  //       "email": "sara@gmail.com",
  //       "password": "12222"
  //   }
  //     //jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(get_input)
  //     expect(await userService.findByEmail('harismith001567@gmail.com','')).toEqual(get_input);
  //   });
  // });

  });
    
