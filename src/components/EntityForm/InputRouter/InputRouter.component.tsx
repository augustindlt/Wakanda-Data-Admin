import React, { PureComponent } from "react";
import { IWakAttribute } from "../../../libs/WakConnector/WakConnector.types";
import InputText from "../InputText";
import InputNumber from "../InputNumber";
import InputBoolean from "../InputBoolean";
import InputDate from "../InputDate";
import InputRelatedEntity from "../InputRelatedEntity";

const INPUT_TYPE = {
  bool: InputBoolean,
  // blob: Form,
  // byte: Form,
  date: InputDate,
  duration: InputText,
  // image: Form,
  long: InputNumber,
  long64: InputNumber,
  number: InputNumber,
  string: InputText,
  uuid: InputText,
  word: InputText,
  relatedEntity: InputRelatedEntity
};

interface IProps {
  attribute: IWakAttribute;
  value: any;
  onChange: (attributeName: string, value: any) => void;
}

export class InputRouter extends PureComponent<IProps> {
  public render() {
    const { attribute } = this.props;
    // @ts-ignore
    const Input = INPUT_TYPE[attribute.type] || INPUT_TYPE[attribute.kind];
    if (!Input) {
      return <></>;
    }
    return <Input {...this.props} />;
  }
}
