import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    preview_popup:any;
    success_insert_popup:any;
    failed_insert_popup:any;
  }
}

export {};
