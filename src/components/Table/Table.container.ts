import { compose } from "recompose";
import { Table, IProps } from "./Table.component";
import withCurrentAttributesAndEntities from "../withCurrentAttributesAndEntities";
import withGotToTableModal from "../withGoToTableModal";

interface IContainerProps {
  dataClass?: string;
}

export default compose<IProps, IContainerProps>(
  withGotToTableModal,
  withCurrentAttributesAndEntities
)(Table);
