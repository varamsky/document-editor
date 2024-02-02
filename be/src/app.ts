import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import * as socketio from 'socket.io';
import { DB, PORT } from './config';
import logger from './logger';
import { errorHandler } from './middleware/errorHanlder';
import documentRoute from './routes/documentRoutes';
import askAIRoute from './routes/askAIRoutes';
import { getDocumentById, updateDocumentById } from './services/socketServices';
import { TUpdateDocumentBySocket } from './types';

const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
};

dotenv.config();
const app = express();
app.use(cors(corsOpts));
// Adjust the payload size limit (e.g., 100MB)
app.use(express.json({ limit: '100mb' }));
app.use(morgan('tiny'));

app.use('/api/v1/', documentRoute);
app.use('/api/v1/askai/', askAIRoute);

app.use(() => {
  throw createHttpError(404, 'Route not found');
});

app.use(errorHandler);

mongoose.set('strictQuery', false);
mongoose
  .connect(DB)
  .then(() => {
    logger.info('Connected to db');
    const server = http.createServer(app);
    const io = new socketio.Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      maxHttpBufferSize: 1e8, // Set to a larger value (e.g., 100 MB)
    });
    io.on('connection', (socket) => {
      logger.info('socket : ', socket.id);

      socket.on('get-document', async (documentId) => {
        if (!documentId) return;
        const response = await getDocumentById(documentId);
        if (response.status) {
          const data = response.data;
          socket.join(documentId);
          socket.emit('load-document', data);
          socket.on('send-changes', (content) => {
            socket.broadcast.to(documentId).emit('receive-changes', content);
          });
          socket.on(
            'save-document',
            async (content: TUpdateDocumentBySocket) => {
              console.log(`==>`, JSON.stringify(content));
              updateDocumentById(content);
            }
          );
        }
      });
    });

    server.listen(PORT, () => {
      logger.info(`Listening On PORT ${PORT}`);
    });
  })
  .catch(() => {
    throw createHttpError(501, 'Unable to connect database');
  });
