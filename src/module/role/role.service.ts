import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dtos/createRole.dto';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.findRoleAll();
  }

  createRole(data: CreateRoleDto): Promise<Role> {
    return this.roleRepository.createRole(data);
  }
}
