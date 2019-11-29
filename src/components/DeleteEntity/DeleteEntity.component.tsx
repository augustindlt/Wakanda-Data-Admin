import React, { PureComponent } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IWakEntity } from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";
import WakConnector from "../../libs/WakConnector/WakConnector";

interface IProps {
  entity: IWakEntity;
}

export class DeleteEntity extends PureComponent<IProps> {
  public render() {
    return (
      <Button variant="danger" onClick={this.handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    );
  }

  private handleDelete = async () => {
    const { entity } = this.props;
    if (
      !window.confirm(`Are you sure to delete ${Store.table}(${entity.ID}) ??`)
    )
      return;

    try {
      await WakConnector.deleteEntity(Store.table!, entity.ID);
      Store.apply();
    } catch {}
  };
}
