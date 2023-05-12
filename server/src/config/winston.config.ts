import { Injectable } from "@nestjs/common";
import { WinstonModule, WinstonModuleOptions, WinstonModuleOptionsFactory, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';

@Injectable()
export class WinstonConfig implements WinstonModuleOptionsFactory {
    private readonly custom_format = winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike('ioblog', { prettyPrint: true }),
    );
    private readonly PRODUCT_LEVEL = "verbose";
    private readonly DEV_LEVEL = "debug";

    constructor() { }
    createWinstonModuleOptions(): WinstonModuleOptions {
        return {
            transports: [
                +process.env.PRODUCTION ?
                    new winston.transports.Console({
                        level: this.PRODUCT_LEVEL,
                        format: this.custom_format,
                    }) : new winston.transports.Console({
                        level: this.DEV_LEVEL,
                        format: this.custom_format,
                    }),
                +process.env.PRODUCTION ?
                    new winston.transports.File({
                        dirname: `./${moment(new Date()).format('YYYY_MM_DD_HH_mm_ss')}`,
                        filename: 'history.log',
                        level: this.PRODUCT_LEVEL,
                        format: this.custom_format,
                    }) : new winston.transports.File({
                        dirname: `./test_log`,
                        filename: 'history.log',
                        level: this.DEV_LEVEL,
                        format: this.custom_format,
                    }),
            ]
        }
    }
}