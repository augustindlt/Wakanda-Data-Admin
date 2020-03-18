export interface IWakQueryParams {
  filter?: string;
  limit?: number;
  skip?: number;
  orderby?: string;
}

export interface IWakDataclass {
  name: string;
  className: string;
  collectionName: string;
  scope: string;
  dataURI: string;
  attributes: IWakAttribute[];
}

export interface IWakAttribute {
  name: string;
  kind:
    | "storage"
    | "calculated"
    | "relatedEntity"
    | "relatedEntities"
    | "alias";
  scope: string;
  indexed: boolean;
  type:
    | "boolean"
    | "blob"
    | "byte"
    | "date"
    | "duration"
    | "image"
    | "long"
    | "long64"
    | "number"
    | "string"
    | "uuid"
    | "word"
    | "object";
  minLength: number;
  maxLength: number;
  autoComplete: boolean;
  identifying: boolean;
  multiLine: boolean;
  path: string;
  readOnly: boolean;
  relatedDataClass: string;
}

export interface IWakDatas {
  __entityModel: string;
  __COUNT: number;
  __SENT: number;
  __FIRST: number;
  __ENTITIES: IWakEntity[];
}

export interface IWakEntity {
  ID: number;
  __KEY: string;
  __STAMP: string;
}
