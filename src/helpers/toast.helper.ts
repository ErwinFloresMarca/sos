import { toastController } from '@ionic/vue';
import type { Color } from '@ionic/core/dist/types/interface';

export async function showToast(config: { message: string; closable?: boolean; type?: Color; duration?: number }) {
  const toast = await toastController.create({
    message: config.message,
    duration: config.duration || 3000,
    color: config.type,
    buttons: config.closable
      ? [
          {
            text: 'Dismiss',
            role: 'cancel',
          },
        ]
      : undefined,
  });

  await toast.present();
}
