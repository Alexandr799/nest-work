import { ConfigService } from "@nestjs/config";

export default (config: ConfigService) => {
    return {
        // uri: 'mongodb://localhost/work',
        uri: config.get('MONGO_URI'),
        // uri: `mongodb://${config.get('MONGO_USER')}:${config.get('MONGO_PASSWORD')}@${config.get('MONGO_HOST')}:${config.get('MONGO_PORT')}/${config.get('MONGO_DB')}`,
    }
}