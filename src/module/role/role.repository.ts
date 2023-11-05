import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/createRole.dto';

export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,
  ) {}

  async findRoleAll(): Promise<Role[]> {
    return await this.RoleRepository.find();
  }

  async createRole(data: CreateRoleDto): Promise<Role> {
    //check role duplication
    const checkRole = await this.RoleRepository.findOne({
      where: {
        code: data.code,
      },
    });

    console.log(checkRole);

    if (checkRole) {
      throw new Error('Vai trò đã tồn tại');
    }

    const newRole = this.RoleRepository.create({
      ...data,
    });
    return await this.RoleRepository.save(newRole);
  }
}
