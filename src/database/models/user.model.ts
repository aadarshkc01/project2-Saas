import {Table,Column,Model,DataType, PrimaryKey} from "sequelize-typescript"

@Table({
    tableName: 'users', // uta ui ma dekhiney table name
    modelName: 'User', //project bhitra mathi ko table lai access garne name
    timestamps: true,
})

class User extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id: string
    
    @Column({
        type: DataType.STRING
    })
    declare username : string

    @Column({
        type: DataType.STRING
    })
    declare password : string

    @Column({
        type : DataType.STRING
    })
    declare email : string

    @Column({
        type: DataType.ENUM('teacher','institution','super-admin','student'),
        defaultValue : 'student',
    })
    declare role: string
}

export default User