import axios, { AxiosInstance } from "axios";
import env from "../../env";
import {
  IWakDataclass,
  IWakDatas,
  IWakAttribute,
  IWakEntity
} from "./WakConnector.types";

class WakConnector {
  private request: AxiosInstance;

  constructor() {
    this.request = axios.create({
      baseURL: `${env.url}rest`,
      timeout: 100000,
      auth: {
        username: env.login,
        password: env.password
      }
    });
  }

  public async getAllCatalogs(): Promise<{ dataClasses: IWakDataclass[] }> {
    const { data } = await this.request.get<{ dataClasses: IWakDataclass[] }>(
      "$catalog/$all"
    );
    return data;
  }

  public async getCatalog(dataClassName: string): Promise<IWakDataclass> {
    const { data } = await this.request.get<{ dataClasses: IWakDataclass[] }>(
      `$catalog/${dataClassName}`
    );
    const attributes = await this.getCatalogAttributesWithRelatedDataClass(
      data.dataClasses[0].attributes
    );
    return { ...data.dataClasses[0], attributes };
  }

  public async getCatalogAttributesWithRelatedDataClass(
    attributes: IWakAttribute[]
  ): Promise<IWakAttribute[]> {
    let catalogs = await this.getAllCatalogs();
    return attributes.map(attribut => {
      if (attribut.kind !== "relatedEntities") return attribut;
      const dc = catalogs.dataClasses.find(
        dc => dc.collectionName === attribut.type
      );
      if (dc) {
        return { ...attribut, relatedDataClass: dc.className };
      }
      return attribut;
    });
  }

  public async getDatas(url: string) {
    const { data } = await this.request.get<IWakDatas>(url);
    return data;
  }

  public async createUpdateEntity(
    dataClassName: string,
    payloads: Partial<IWakEntity>
  ) {
    try {
      const { data } = await this.request.post<IWakDatas>(
        `${dataClassName}?$method=update`,
        payloads
      );
      return data;
    } catch (e) {
      alert(e);
      throw new Error("Request Failed");
    }
  }

  public async deleteEntity(dataClassName: string, id: number) {
    if (!dataClassName || !id) {
      alert("You must provide valid data !!");
      return;
    }
    try {
      const { data } = await this.request.post<IWakDatas>(
        `${dataClassName}(${id})?$method=delete`
      );
      return data;
    } catch (e) {
      alert(e);
      throw new Error("Request Failed");
    }
  }
}

export default new WakConnector();
