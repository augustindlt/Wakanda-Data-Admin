import { compose, withState, lifecycle, withProps } from "recompose";
import { DataClassList, IProps } from "./DataClassList.component";
import WakConnector from "../../libs/WakConnector/WakConnector";
import { IWakDataclass } from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";

interface IContainerProps {}

interface IConnectedProps extends IContainerProps {
  setDataClasses: (dataClasses: IWakDataclass[]) => void;
}

const fetchDataClasses = async (props: IConnectedProps) => {
  const { dataClasses } = await WakConnector.getAllCatalogs();
  if (!Store.table) {
    Store.table = dataClasses[0].name;
    Store.apply();
  }
  props.setDataClasses(dataClasses);
};

const withCurrentDataClassProp = (props: IConnectedProps) => {
  return { currentDataClass: Store.table };
};

const withInit = lifecycle<IConnectedProps, {}>({
  componentDidMount() {
    fetchDataClasses(this.props);
  }
});

export default compose<IProps, IContainerProps>(
  withState("dataClasses", "setDataClasses", []),
  withProps(withCurrentDataClassProp),
  withInit
)(DataClassList);
