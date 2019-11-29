import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ButtonProps } from "react-bootstrap";
import {
  IWakEntity,
  IWakAttribute
} from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";
import EntityForm from "../EntityForm";
import WakConnector from "../../libs/WakConnector/WakConnector";

const BUTTON_STYLE = {
  update: { colorClassName: "warning", icon: faPen, size: undefined },
  create: { colorClassName: "success", icon: faPlus, size: "sm" }
};

export interface IProps {
  entity?: IWakEntity;
  attributes: IWakAttribute[];
  action: "update" | "create";
}

interface IState {
  showModal: boolean;
  payloads: Partial<IWakEntity>;
  loading: boolean;
}

export class EditEntity extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const payloads: Partial<IWakEntity> = props.entity || {};
    props.attributes.forEach(atttibute => {
      if (
        atttibute.kind === "relatedEntity" &&
        payloads[atttibute.name as keyof IWakEntity]
      ) {
        // @ts-ignore
        payloads[atttibute.name] = payloads[atttibute.name].__deferred.__KEY;
      }
    });

    this.state = {
      showModal: false,
      loading: false,
      payloads
    };
  }

  public render() {
    const { showModal, loading, payloads } = this.state;
    const { attributes } = this.props;
    const { colorClassName, icon, size } = BUTTON_STYLE[this.props.action];
    return (
      <>
        <Button
          size={size as ButtonProps["size"]}
          variant={colorClassName as ButtonProps["variant"]}
          className="mr-1"
          onClick={this.handleToogleModal}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <Modal
          size="lg"
          scrollable
          show={showModal}
          onHide={this.handleToogleModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {payloads.ID
                ? `Update ${Store.table}(${payloads.ID})`
                : `Create ${Store.table}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EntityForm
              entity={payloads}
              attributes={attributes}
              onChange={this.handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToogleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              {loading ? "Loading..." : "Save changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  private handleToogleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  private handleChange = (payloads: Partial<IWakEntity>) => {
    this.setState({ payloads: { ...payloads } } as { payloads: IWakEntity });
  };

  private get payloadsToUpdate() {
    const { attributes, action } = this.props;
    const permittedAttributes = attributes.filter(
      attribute =>
        attribute.kind === "storage" || attribute.kind === "relatedEntity"
    );
    const payloads: Partial<IWakEntity> = {};
    permittedAttributes.forEach(
      attribute =>
        //@ts-ignore
        (payloads[attribute.name] = this.state.payloads[attribute.name])
    );
    if (action === "update") {
      payloads.__KEY = this.state.payloads.__KEY;
      payloads.__STAMP = this.state.payloads.__STAMP;
    }
    return payloads;
  }

  private handleSubmit = async () => {
    this.setState({ loading: true });
    try {
      const payloads = this.payloadsToUpdate;
      await WakConnector.createUpdateEntity(Store.table!, payloads);
      Store.apply();
    } catch {
      this.setState({ loading: false });
    }
  };
}
