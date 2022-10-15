import { toastController } from '@ionic/vue';

export async function showToast(config: { message: string; closable?: boolean; type?: string; duration?: number }) {
  const toast = await toastController.create({
    message: config.message,
    duration: config.duration || 3000,
    color: config.type || 'primary',
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
