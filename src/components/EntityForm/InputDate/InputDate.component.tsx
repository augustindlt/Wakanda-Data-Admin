import React, { PureComponent } from "react";
import { IWakAttribute } from "../../../libs/WakConnector/WakConnector.types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface IProps {
  attribute: IWakAttribute;
  value: string;
  onChange: (attributeName: string, value: string | null) => void;
}

export class InputDate extends PureComponent<IProps> {
  public render() {
    const { value, attribute } = this.props;
    const date = moment(value).isValid() ? moment(value).toDate() : undefined;
    return (
      <DatePicker
        selected={date}
        onChange={this.handleChange}
        showTimeSelect
        className="form-control"
        dateFormat="dd/MM/yyyy hh:mm:ss"
        placeholderText={`Enter ${attribute.name}`}
      />
    );
  }

  private handleChange = (date: Date) => {
    const { onChange, attribute } = this.props;
    if (!moment(date).isValid()) {
      return onChange(attribute.name, null);
    }
    onChange(attribute.name, moment(date).toISOString());
  };
}
