import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
    @Column
    userId: number;
    @Column
    goodId: number;
    @Column
    name: string;
    @Column({ defaultValue: 0 }) // Установка значения по умолчанию
    price: number;
    @Column({ defaultValue: 'XL' }) // Установка значения по умолчанию
    size: string;
    @Column
    image: string;
    @Column
    category: string;
    @Column
    subcategory: string;
    @Column({ defaultValue: 0 })
    quantity: number;
    @Column({ defaultValue: 1 }) //*потому что пользователь не может добавить в корзину 0 товара
    count: number;
    @Column({ defaultValue: 0 })
    totalPrice: number;
}
