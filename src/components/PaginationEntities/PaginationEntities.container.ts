import { compose, withProps } from "recompose";
import { PaginationEntities, IProps } from "./PaginationEntities.component";
import withCurrentAttributesAndEntities from "../withCurrentAttributesAndEntities";
import Store from "../../libs/Store/Store";

interface IContainerProps {}

const withLimitAndSkipProps = (props: IContainerProps) => {
  return { limit: Store.limit, skip: Store.skip };
};

export default compose<IProps, IContainerProps>(
  withCurrentAttributesAndEntities,
  withProps(withLimitAndSkipProps)
)(PaginationEntities);
