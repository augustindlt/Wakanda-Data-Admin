import { IWakQueryParams } from "../WakConnector/WakConnector.types";

class Store {
  private dataClass: string | null = null;
  private queryParams: IWakQueryParams = { limit: 50 };
  private urlSearchParams: URLSearchParams = new URLSearchParams(
    window.location.search
  );

  constructor() {
    const limitInUrlParams = this.urlSearchParams.get("limit");
    const skipInUrlParams = this.urlSearchParams.get("skip");
    this.queryParams = {
      filter: this.urlSearchParams.get("filter") || undefined,
      orderby: this.urlSearchParams.get("orderby") || undefined,
      limit: (limitInUrlParams && parseInt(limitInUrlParams)) || 50,
      skip: (skipInUrlParams && parseInt(skipInUrlParams)) || 0
    };
  }

  public get table(): string | null {
    if (!this.dataClass) this.dataClass = this.urlSearchParams.get("dataclass");
    return this.dataClass;
  }

  public set table(dataClass: string | null) {
    this.dataClass = dataClass;
    this.queryParams.filter = undefined;
    this.queryParams.skip = undefined;
    this.queryParams.orderby = undefined;
  }

  public get filter() {
    return this.queryParams.filter;
  }

  public set filter(filter: string | undefined) {
    this.queryParams.filter = filter;
  }

  public get limit() {
    return this.queryParams.limit;
  }

  public set limit(limit: number | undefined) {
    this.queryParams.limit = limit;
  }

  public get skip() {
    return this.queryParams.skip;
  }

  public set skip(skip: number | undefined) {
    this.queryParams.skip = skip;
  }

  public get orderby() {
    if (!this.queryParams.orderby) return undefined;
    const [by, direction] = this.queryParams.orderby.split(" ");
    // @ts-ignore
    return { by, direction };
  }

  public set orderby(
    order: { by: string; direction: "asc" | "desc" } | undefined
  ) {
    this.queryParams.orderby = `${order!.by} ${order!.direction}`;
  }

  public apply() {
    // @ts-ignore
    window.location = `${window.location.origin}?dataclass=${
      this.dataClass
    }&${this.getQueryParamsToUrl()}`;
  }

  public currentStateToWakUrl(): string {
    return `${this.dataClass}?${this.getQueryParamsToUrl("$")}`;
  }

  private getQueryParamsToUrl(prefixParam?: string): string {
    const paramsStr = [];
    for (const paramName in this.queryParams) {
      const paramValue = this.queryParams[paramName as keyof IWakQueryParams];
      if (paramValue) {
        paramsStr.push(`${prefixParam || ""}${paramName}=${paramValue}`);
      }
    }
    return paramsStr.join("&");
  }
}

export default new Store();
