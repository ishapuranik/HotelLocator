import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ConfigurationService {
    public static readonly appVersion: string = "1.0.0";

    public baseUrl = environment.baseUrl;

}
