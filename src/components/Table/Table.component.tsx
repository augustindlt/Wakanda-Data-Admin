import React, { PureComponent } from "react";
import { Table as BTable } from "react-bootstrap";
import {
  IWakAttribute,
  IWakEntity
} from "../../libs/WakConnector/WakConnector.types";
import EntityRow from "../EntityRow";
import AttributCell from "../AttributCell";
import EditEntity from "../EditEntity";

export interface IProps {
  attributes: IWakAttribute[];
  entities: IWakEntity[];
}

export class Table extends PureComponent<IProps> {
  public render() {
    const { attributes, entities } = this.props;
    return (
      <BTable striped bordered hover className="table-scroll">
        <thead>
          <tr>
            {!!attributes.length && (
              <th className="text-center">
                <EditEntity attributes={attributes} action="create" />
              </th>
            )}
            {attributes.map(attr => (
              <AttributCell key={attr.name} attribute={attr} />
            ))}
          </tr>
          {entities.map(entity => (
            <EntityRow
              key={entity.ID}
              entity={entity}
              attributes={attributes}
            />
          ))}
        </thead>
        <tbody></tbody>
      </BTable>
    );
  }
}
