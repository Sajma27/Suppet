import { UniversalBrowserRow } from "../../../../../commons/universal-browser/model/universal-browser-row";

export class DashboardCertsUtils {
  private static readonly READONLY_CERTS: string[] = ['puppet-master', 'puppet-master.home', 'puppet-db.home'];

  static isReadonlyRow(row: UniversalBrowserRow): boolean {
    return this.READONLY_CERTS.includes(row.data.name);
  }

}
