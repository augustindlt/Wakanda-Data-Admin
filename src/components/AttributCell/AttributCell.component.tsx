import React, { PureComponent } from "react";
import { IWakAttribute } from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  attribute: IWakAttribute;
}

export class AttributCell extends PureComponent<IProps> {
  public render() {
    const { attribute } = this.props;
    if (attribute.kind === "relatedEntities") {
      return (
        <th style={{ cursor: "not-allowed" }}>
          {attribute.name} {this.renderIcon()}
        </th>
      );
    }
    return (
      <th
        key={attribute.name}
        onClick={this.handleSort}
        style={{ cursor: "pointer" }}
      >
        {attribute.name} {this.renderIcon()}
      </th>
    );
  }

  private renderIcon = () => {
    const { attribute } = this.props;
    if (!Store.orderby || Store.orderby.by !== attribute.name) return;
    const icon = Store.orderby.direction === "desc" ? faArrowDown : faArrowUp;
    return (
      <FontAwesomeIcon
        icon={icon}
        size="xs"
        style={{ position: "absolute", right: 5, top: 5 }}
      />
    );
  };

  private handleSort = () => {
    const { attribute } = this.props;

    if (!Store.orderby || Store.orderby.by !== attribute.name) {
      Store.orderby = { by: attribute.name, direction: "asc" };
    } else {
      const direction = Store.orderby.direction === "asc" ? "desc" : "asc";
      Store.orderby = { by: attribute.name, direction };
    }

    Store.apply();
  };
}
