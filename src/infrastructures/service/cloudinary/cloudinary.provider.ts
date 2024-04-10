import { CLOUDINARY } from '@/application/common/constants/constants';
import { ConfigService } from '@nestjs/config';
import { v2, ConfigOptions } from 'cloudinary';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: (configService: ConfigService): ConfigOptions => {
        return v2.config({
            cloud_name: configService.get('cloud_name'),
            api_key: configService.get('cloud_api_key'),
            api_secret: configService.get('dloud_api_secret'),
        });
    },
    inject: [ConfigService],
};
