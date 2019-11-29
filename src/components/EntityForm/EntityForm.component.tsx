import React, { PureComponent } from "react";
import {
  IWakEntity,
  IWakAttribute
} from "../../libs/WakConnector/WakConnector.types";
import { Table } from "react-bootstrap";
import InputRouter from "./InputRouter";

export interface IProps {
  entity: Partial<IWakEntity>;
  attributes: IWakAttribute[];
  onChange: (payloads: Partial<IWakEntity>) => void;
}

export class EntityForm extends PureComponent<IProps> {
  public render() {
    const { entity } = this.props;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Type</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {this.editaleAttributes.map(attribute => (
            <tr key={attribute.name}>
              <th>{attribute.name}</th>
              <td>{attribute.type}</td>
              <td>
                <InputRouter
                  onChange={this.handleEntityChange}
                  attribute={attribute}
                  value={entity[attribute.name as keyof IWakEntity]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  private get editaleAttributes() {
    return this.props.attributes.filter(
      attribute =>
        attribute.kind === "storage" || attribute.kind === "relatedEntity"
    );
  }

  private getEntityValue(attributeName: string) {
    const { entity } = this.props;
    // @ts-ignore
    return entity[attributeName];
  }

  private handleEntityChange = (attributeName: string, value: any) => {
    const { entity, onChange } = this.props;
    onChange({ ...entity, [attributeName]: value });
  };
}
