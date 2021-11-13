import { throwError as observableThrowError } from "rxjs";
import { SessionStorageService } from "./session.service";

export class BaseService {
  extractData(body: any) {
    if (body && body.hasOwnProperty("access_token")) {
      SessionStorageService.setSessionValue("access_token", body.access_token);
      if (body?.data?._id) {
        SessionStorageService.setSessionValue("user_id", body.data._id);
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
