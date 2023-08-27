import winston from 'winston';
import path from 'path';

class Logger {
    constructor() {
        const logPath = './logs'; // Change this path if needed
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            ),
            transports: [
                new winston.transports.File({
                    filename: path.join(logPath, 'app.log'),
                    maxsize: 5242880, // 5MB
                    maxFiles: 5,
                }),
            ],
        });
    }

    log(message) {
        this.logger.info(message);
        console.log(message);
    }

    error(message) {
        this.logger.error(message);
        console.log(message);
    }

    warn(message) {
        this.logger.warn(message);
        console.log(message);
    }
}

export default new Logger();