import { NgModule } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment, Environment } from '@app/env';
import { NATIVE_STORAGE_TOKEN, RouterParamsService } from '@app/shared/services';
import { noop } from '@app/shared/+state';

import { RoutingEffects, CoreEffects } from './+state';
import { GraphQLModule } from './graphql.module';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  imports: [
    StoreModule.forRoot({
      router: routerReducer,
    }),
    EffectsModule.forRoot([RoutingEffects, CoreEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      actionsBlocklist: [noop.type]
    }),
    GraphQLModule,
  ],
  providers: [
    {
      provide: Environment,
      useValue: environment,
    },
    {
      provide: NATIVE_STORAGE_TOKEN,
      useValue: localStorage,
    },
    {
      provide: RouterParamsService,
      useFactory: (router: Router) => new RouterParamsService(router),
      deps: [Router],
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
  ]
})
export class CoreModule {
  constructor() {}
}
