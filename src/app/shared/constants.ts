export class Constants {
  // tslint:disable-next-line:max-line-length
  public static regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // token
  public static accessToken = 'access_token';
  public static token = 'token';
  public static file = 'file';

  // warnings
  public static firstName = 'Please enter first name.';
  public static lastName = 'Please enter last name.';
  public static mobileNo = 'Please enter valid mobile no.';
  public static email = 'Please enter a valid email id.';
  public static city = 'Please enter city.';
  public static password = 'Please enter a valid password.';
  public static momentAdded = 'Moment Added Successfully';
  public static title = 'Please enter title.';
  public static tags = 'Please add tags';
  public static image = 'Please upload image.';
  public static loginFirst = 'Please login first';

  // navigate
  public static home = '/home';
  public static login = '/login';

  // response
  public static success = 'success';
  public static failed = 'Failed';

  public static validateEmail(email: string): boolean {
    const re = Constants.regex;
    return re.test(String(email).toLowerCase());
  }
}
