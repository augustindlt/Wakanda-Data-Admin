import React, { PureComponent } from "react";
import { Modal } from "react-bootstrap";
import Select, { ValueType } from "react-select";
import { IWakDataclass } from "../../../libs/WakConnector/WakConnector.types";
import Store from "../../../libs/Store/Store";

export interface IProps {
  showModal?: boolean;
  onHide?: () => void;
  dataClasses: IWakDataclass[];
}

export class GotToTableModal extends PureComponent<IProps> {
  private selectRef = React.createRef<Select>();

  public componentDidMount() {
    this.selectRef.current && this.selectRef.current.focus();
  }

  public render() {
    const { showModal, onHide } = this.props;
    return (
      <Modal show={showModal} onHide={onHide} animation={false}>
        <Select
          ref={this.selectRef}
          options={this.options}
          autoFocus
          onChange={this.handleChange}
        />
      </Modal>
    );
  }

  private get options() {
    return this.props.dataClasses.map(dc => ({
      label: dc.name,
      value: dc.name
    }));
  }

  private handleChange = (
    option: ValueType<{ label: string; value: string }>
  ) => {
    // @ts-ignore
    const { value: dataClassName } = option;
    if (!this.props.dataClasses.find(dc => dc.name === dataClassName)) return;
    Store.table = dataClassName;
    Store.apply();
  };
}
