import { InjectionToken } from '@angular/core';
import { IAwdRestConfig } from './models/awd-rest.model';

export const CONFIG_TOKEN = new InjectionToken<IAwdRestConfig>('CONFIG');
