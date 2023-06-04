const amqp = require('amqplib');
const config = require('./config');

class Producer {
    channel;
    async createChannel() {
        const connection = await amqp.connect(config);
        this.channel = await connection.createChannel();
    }
    async publishMessage(routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }
        await this.channel.assertExchange(config.rabbitMQ.exchangeName, 'direct');
        await this.channel.publish(
            config.rabbitMQ.exchangeName,
            routingKey,
            Buffer.from(JSON.stringify({ logType: routingKey, message, dateTime: new Date() })),
        );
        console.log(`The message ${message} is sent to exchange ${config.rabbitMQ.exchangeName}`);
    }
}
module.exports = Producer;
