import * as Minio from 'minio';

class MinIOServiceInstance {
  public client: Minio.Client;

  constructor() {
    this.client = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT, 10) : 9000,
      useSSL: process.env.MINIO_ENABLE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
  }
}

const MinIOService = new MinIOServiceInstance();

export default MinIOService;
