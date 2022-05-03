export class DashboardToggledButtons {
  private _menu: boolean = true;
  private _agents: boolean = false;
  private _certs: boolean = false;
  private _catalogs: boolean = false;
  private _tasks: boolean = false;
  private _modules: boolean = false;
  private _classes: boolean = false;
  private _manifests: boolean = false;

  get menu(): boolean {
    return this._menu;
  }

  toggleMenu() {
    this.resetAll();
    this._menu = true;
  }

  get agents(): boolean {
    return this._agents;
  }

  toggleAgents() {
    this.resetAll();
    this._agents = true;
  }

  get certs(): boolean {
    return this._certs;
  }

  toggleCerts() {
    this.resetAll();
    this._certs = true;
  }

  get catalogs(): boolean {
    return this._catalogs;
  }

  toggleCatalogs() {
    this.resetAll();
    this._catalogs = true;
  }

  get tasks(): boolean {
    return this._tasks;
  }

  toggleTasks() {
    this.resetAll();
    this._tasks = true;
  }

  get modules(): boolean {
    return this._modules;
  }

  toggleModules() {
    this.resetAll();
    this._modules = true;
  }

  get classes(): boolean {
    return this._classes;
  }

  toggleClasses() {
    this.resetAll();
    this._classes = true;
  }

  get manifests(): boolean {
    return this._manifests;
  }

  toggleManifests() {
    this.resetAll();
    this._manifests = true;
  }

  private resetAll(): void {
    this._menu = false;
    this._agents = false;
    this._certs = false;
    this._catalogs = false;
    this._tasks = false;
    this._modules = false;
    this._classes = false;
    this._manifests = false;
  }
}
