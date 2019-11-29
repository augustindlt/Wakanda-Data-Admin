import React, { PureComponent } from "react";
import { Form } from "react-bootstrap";
import { IWakAttribute } from "../../../libs/WakConnector/WakConnector.types";

type TRelatedValue = {
  __deferred: {
    uri: string;
    __KEY: string;
  };
};

interface IProps {
  attribute: IWakAttribute;
  value: string | TRelatedValue | null;
  onChange: (attributeName: string, value: string | null) => void;
}

export class InputRelatedEntity extends PureComponent<IProps> {
  public render() {
    const { attribute, value } = this.props;
    if (typeof value === "object" && value !== null)
      return <pre>{JSON.stringify(value)}</pre>;

    return (
      <Form.Control
        type="text"
        className="bg-info text-white"
        value={value || undefined}
        onChange={this.handleChange}
        placeholder={`Enter ID of ${attribute.type}`}
      />
    );
  }

  private handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(this.props.attribute.name, value);
  };
}
