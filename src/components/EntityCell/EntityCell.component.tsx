import React, { PureComponent } from "react";
import { IWakAttribute } from "../../libs/WakConnector/WakConnector.types";
import { Button } from "react-bootstrap";
import Store from "../../libs/Store/Store";

interface IProps {
  entityId: number;
  attribut: IWakAttribute;
  value: any;
}

export class EntityCell extends PureComponent<IProps> {
  public render() {
    const { attribut, value } = this.props;
    if (!value) {
      return <td></td>;
    }

    if (
      attribut.kind === "relatedEntity" ||
      attribut.kind === "relatedEntities"
    ) {
      return (
        <td className="text-center">
          <Button
            variant={attribut.kind === "relatedEntity" ? "info" : "warning"}
            onClick={this.goToRelated}
            size="sm"
          >
            {this.relatedParamsToGo!.table}({this.relatedParamsToGo!.filter}){" "}
            {/* <FontAwesomeIcon icon={faSearch} /> */}
          </Button>
        </td>
      );
    }

    if (attribut.type === "object") {
      return <td>{JSON.stringify(value)}</td>;
    }

    return <td>{value}</td>;
  }

  private get relatedParamsToGo() {
    const { attribut, value, entityId } = this.props;
    if (attribut.kind === "relatedEntity")
      return {
        table: attribut.path,
        filter: `"ID === ${value.__deferred["__KEY"]}"`
      };
    if (attribut.kind === "relatedEntities")
      return {
        table: attribut.relatedDataClass,
        filter: `"${attribut.path} === ${entityId}"`
      };
    return null;
  }

  private goToRelated = () => {
    const { table, filter } = this.relatedParamsToGo!;
    Store.table = table;
    Store.filter = filter;
    Store.apply();
  };
}
