import withDataClasses from "../../withDataClasses";
import { GotToTableModal, IProps } from "./GotToTableModal.component";
import { compose } from "recompose";

interface IContainerProps extends Omit<IProps, "dataClasses"> {}

export default compose<IProps, IContainerProps>(withDataClasses)(
  GotToTableModal
);
