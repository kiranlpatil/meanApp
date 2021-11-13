import { throwError as observableThrowError } from 'rxjs';
import { SessionStorageService } from './session.service';
import {Constants} from '../shared/constants';

export class BaseService {
  extractData(body: any) {
    if (body && body.hasOwnProperty(Constants.accessToken)) {
      SessionStorageService.setSessionValue(Constants.accessToken, body.access_token);
      if (body?.data?._id) {
        SessionStorageService.setSessionValue('user_id', body.data._id);
      }
    }
    return body || {};
  }

  extractDataWithoutToken(body: any) {
    return body || {};
  }

  handleError(error: any) {
    return observableThrowError(error);
  }
}
