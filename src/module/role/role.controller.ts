import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/createRole.dto';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get('/')
  getAllRole() {
    return this.roleService.findAll();
  }

  @Post('/create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }
}
