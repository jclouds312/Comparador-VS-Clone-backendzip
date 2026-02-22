import { BleClient, NumberToUUID } from '@capacitor-community/bluetooth-le';

const HEART_RATE_SERVICE = NumberToUUID(0x180d);
const HEART_RATE_MEASUREMENT_CHARACTERISTIC = NumberToUUID(0x2a37);

export class ScaleService {
  async initialize() {
    await BleClient.initialize();
  }

  async scanAndConnect() {
    try {
      const device = await BleClient.requestDevice({
        services: [HEART_RATE_SERVICE], // Placeholder for generic scale services
      });

      await BleClient.connect(device.deviceId);
      console.log('Conectado a la báscula:', device.name);
      return device;
    } catch (error) {
      console.error('Error de conexión Bluetooth:', error);
      throw error;
    }
  }

  async startNotifications(deviceId, callback) {
    await BleClient.startNotifications(
      deviceId,
      HEART_RATE_SERVICE,
      HEART_RATE_MEASUREMENT_CHARACTERISTIC,
      (value) => {
        const weight = this.parseWeight(value);
        callback(weight);
      }
    );
  }

  parseWeight(value) {
    // Lógica de conversión de bytes a peso exacto para SOFTGAN
    return value.getUint8(1); 
  }
}