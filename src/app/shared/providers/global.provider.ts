import { InjectionToken } from '@angular/core';

export const GLOBAL = new InjectionToken('GlobalObject', { providedIn: 'root', factory: () => window });
