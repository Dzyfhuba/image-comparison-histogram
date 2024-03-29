import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    let route: typeof ziggyRoute;
    let ziggy: ZiggyConfig;
}


declare module 'konsta/react' {
    export function myFunction(arg1: string, arg2: number): void;
  }