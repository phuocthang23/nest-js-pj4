// import { Address } from 'src/module/address/entities/address.entity';
import { OrderItem } from 'src/module/order-item/entities/orderItem.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  // ManyToOne,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  status: number;

  @Column({ type: 'int', nullable: true })
  subTotal: number;

  @Column({ type: 'int', nullable: true })
  total: number;

  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Column({ type: 'varchar', nullable: true })
  districtName: string;

  @Column({ type: 'varchar', nullable: true })
  wardName: string;

  @Column({ type: 'int', nullable: true })
  ship: number;

  @Column({ type: 'int', nullable: true })
  code: number;

  @Column({ type: 'int', nullable: false })
  payment: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true })
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders) // Thay đổi tên của trường users thành user
  user: User;
}
