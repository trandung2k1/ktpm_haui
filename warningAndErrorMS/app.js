const amqp = require('amqplib');
async function consumeMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('logExchange', 'direct');
    const q = await channel.assertQueue('WarningAndErrorQueue');
    await channel.bindQueue(q.queue, 'logExchange', 'Warning');
    await channel.bindQueue(q.queue, 'logExchange', 'Error');
    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    });
}

consumeMessages();
