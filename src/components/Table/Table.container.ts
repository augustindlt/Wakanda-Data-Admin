import { compose } from "recompose";
import { Table, IProps } from "./Table.component";
import withCurrentAttributesAndEntities from "../withCurrentAttributesAndEntities";

interface IContainerProps {
  dataClass?: string;
}

export default compose<IProps, IContainerProps>(
  withCurrentAttributesAndEntities
)(Table);
