import { ServiceAddons, Params } from '@feathersjs/feathers';
import {
  AuthenticationService,
  JWTStrategy,
  AuthenticationResult,
} from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth, OAuthProfile } from '@feathersjs/authentication-oauth';
import { OAuthStrategy } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class MyAuthenticationService extends AuthenticationService {
  async getPayload(authResult: AuthenticationResult, params: Params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    return Object.assign(payload, {
      userId: user.id,
      role: user.role,
      roles: user.role,
    });
  }
}

class GoogleStrategy extends OAuthStrategy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    params.provider = undefined;
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile, existing, params);

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      profilePicture: profile.picture,
      email: profile.email,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getEntityQuery(profile: OAuthProfile, params: Params) {
    const query = {
      $or: [
        { [`${this.name}Id`]: profile.sub || profile.id },
        { email: profile.email },
      ],
    };
    return query;
  }
}

export default function (app: Application): void {
  const authentication = new MyAuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('google', new GoogleStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
