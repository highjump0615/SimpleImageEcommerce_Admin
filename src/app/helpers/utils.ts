import * as moment from 'moment';

export class Utils {
  private static instance: Utils;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Utils();
    }

    return this.instance;
  }

  static timeToStringFromat(timestamp, format) {
    const time = moment(timestamp);
    return time.format(format);
  }
}
