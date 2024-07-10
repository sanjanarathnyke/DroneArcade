import { IpcMainEvent } from 'electron';

export const loadingProgress = async (
  event: IpcMainEvent,
  inProgress: boolean,
  screen: string,
) => {
  event.reply('ipc-progress', inProgress, screen);
};
