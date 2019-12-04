import { compose, withProps } from "recompose";
import { DataClassList, IProps } from "./DataClassList.component";
import { IWakDataclass } from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";
import withDataClasses from "../withDataClasses";

interface IContainerProps {}

interface IConnectedProps extends IContainerProps {
  dataClasses: IWakDataclass[];
}

const withCurrentDataClassProp = (props: IConnectedProps) => {
  if (!Store.table && props.dataClasses.length) {
    Store.table = props.dataClasses[0].name;
    Store.apply();
  }
  return { currentDataClass: Store.table };
};

export default compose<IProps, IContainerProps>(
  withDataClasses,
  withProps(withCurrentDataClassProp)
)(DataClassList);
