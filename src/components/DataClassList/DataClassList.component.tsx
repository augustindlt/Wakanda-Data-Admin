import React, { PureComponent } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { IWakDataclass } from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";

export interface IProps {
  dataClasses: IWakDataclass[];
  currentDataClass: string;
}

export class DataClassList extends PureComponent<IProps> {
  public render() {
    const { dataClasses, currentDataClass } = this.props;
    return (
      <ListGroup>
        <ListGroupItem disabled>Liste des tables</ListGroupItem>
        {dataClasses.map(dc => (
          <ListGroupItem
            key={dc.name}
            active={currentDataClass === dc.name}
            onClick={() => this.navigateTo(dc.name)}
            action
          >
            {dc.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  private navigateTo = (dataClassName: string) => {
    Store.table = dataClassName;
    Store.apply();
  };
}
