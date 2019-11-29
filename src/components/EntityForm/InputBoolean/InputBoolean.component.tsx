import React, { PureComponent } from "react";
import { IWakAttribute } from "../../../libs/WakConnector/WakConnector.types";
import { Form } from "react-bootstrap";

interface IProps {
  attribute: IWakAttribute;
  value: boolean;
  onChange: (attributeName: string, value: boolean) => void;
}

export class InputBoolean extends PureComponent<IProps> {
  public render() {
    const { attribute, value } = this.props;
    return (
      <Form.Check
        type="checkbox"
        label={attribute.name}
        checked={value}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = () => {
    this.props.onChange(this.props.attribute.name, !this.props.value);
  };
}
