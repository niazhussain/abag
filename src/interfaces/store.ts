import { initializeStore } from '../store';

export type IStore = ReturnType<ReturnType<typeof initializeStore>['getState']>;
