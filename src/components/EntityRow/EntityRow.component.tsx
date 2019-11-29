import React, { PureComponent } from "react";
import {
  IWakEntity,
  IWakAttribute
} from "../../libs/WakConnector/WakConnector.types";
import EntityCell from "../EntityCell";
import EditEntity from "../EditEntity";
import DeleteEntity from "../DeleteEntity";

interface IProps {
  entity: IWakEntity;
  attributes: IWakAttribute[];
}

export class EntityRow extends PureComponent<IProps> {
  public render() {
    const { attributes, entity } = this.props;
    return (
      <tr>
        <td className="text-center" style={{ minWidth: 110 }}>
          <EditEntity attributes={attributes} entity={entity} action="update" />
          <DeleteEntity entity={entity} />
        </td>
        {attributes.map(attr => (
          <EntityCell
            key={attr.name}
            entityId={this.getEntityValue("ID")}
            attribut={attr}
            value={this.getEntityValue(attr.name)}
          />
        ))}
      </tr>
    );
  }

  private getEntityValue(attribut: string) {
    const { entity } = this.props;
    // @ts-ignore
    return entity[attribut];
  }
}
