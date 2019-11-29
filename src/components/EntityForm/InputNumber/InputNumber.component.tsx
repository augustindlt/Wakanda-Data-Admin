import React, { PureComponent } from "react";
import { Form } from "react-bootstrap";
import { IWakAttribute } from "../../../libs/WakConnector/WakConnector.types";

interface IProps {
  attribute: IWakAttribute;
  value: string;
  onChange: (attributeName: string, value: string) => void;
}

export class InputNumber extends PureComponent<IProps> {
  public render() {
    const { attribute, value } = this.props;
    return (
      <Form.Control
        type="number"
        placeholder={`Enter ${attribute.name}`}
        value={value || undefined}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    return this.props.onChange(this.props.attribute.name, value);
  };
}
