import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            dropSchema: true,
            entities: [config.getCartSrcPath() + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            database: ':memory'
        })
    ]
})