import fastify from 'fastify';
import { createConnection } from 'typeorm';
import ormconfig from './ormconfig';
import UserRouteJSON from './routes/json/user.route';
import UserRouteXML from './routes/xml/user.route';

const PORT = parseInt(process.env.API_PORT ?? '3000', 10);

async function bootstrap(): Promise<void> {
  await createConnection(ormconfig);

  const server = fastify({
    logger: {
      level: 'info',
      prettyPrint: {
        levelFirst: true,
        translateTime: true
      }
    }
  });

  server.register(UserRouteXML, { prefix: '/xml/user' });
  server.register(UserRouteJSON, { prefix: '/json/user' });

  server.listen(PORT, (err: Error | null, address: string) => {
    if (err !== null) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`server listening on ${address}`);
  });
}

bootstrap().catch(console.error);
