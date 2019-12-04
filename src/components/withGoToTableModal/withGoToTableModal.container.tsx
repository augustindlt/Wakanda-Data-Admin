import React, { ComponentType, PureComponent } from "react";
import GotToTableModal from "./GotToTableModal";
import { compose, withState, lifecycle } from "recompose";

export interface IWithGoToTableModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const withGotToTableModal = <P extends object>(
  WrapComponent: ComponentType<P>
) =>
  class ComponentWithGoToTableModal extends PureComponent<
    P & IWithGoToTableModalProps
  > {
    public render() {
      const { showModal } = this.props;
      return (
        <>
          <WrapComponent {...(this.props as P)} />
          <GotToTableModal showModal={showModal} onHide={this.handleOnHide} />
        </>
      );
    }

    private handleOnHide = () => this.props.setShowModal(false);
  };

// Open the modal when : alt + ;
const withShortCut = lifecycle<IWithGoToTableModalProps, {}>({
  componentDidMount() {
    document.onkeyup = e => {
      e = e || window.event;
      if (e.altKey && e.which == 186) {
        this.props.setShowModal(true);
        return false;
      }
    };
  }
});

export default compose(
  withState("showModal", "setShowModal", false),
  withGotToTableModal,
  withShortCut
);
