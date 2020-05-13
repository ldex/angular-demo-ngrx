import { RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

export interface RouterStateUrl {
  url: string;
  params: Params;
}

@Injectable()
export class CustomRouterSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    // Select all the params available from current state.
    const params = routerState.root.children.map(c => c.params).reduce(
      (acc, p) => ({
        ...acc,
        ...p,
      }),
      {}
    );
    return {
      url: routerState.url,
      // Collect params from all levels
      params,
    };
  }
}
