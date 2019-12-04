import WakConnector from "../../libs/WakConnector/WakConnector";
import { IWakDataclass } from "../../libs/WakConnector/WakConnector.types";
import { lifecycle, compose, withState } from "recompose";

interface IInnerProps {}
interface IOutterProps {
  dataClasses: IWakDataclass[];
}

interface IConnectedProps extends IInnerProps {
  setDataClasses: (dataClasses: IWakDataclass[]) => void;
}

const fetchDataClasses = async (props: IConnectedProps) => {
  const { dataClasses } = await WakConnector.getAllCatalogs();
  props.setDataClasses(dataClasses);
};

const withInit = lifecycle<IConnectedProps, {}>({
  componentDidMount() {
    fetchDataClasses(this.props);
  }
});

export default compose<IOutterProps, IInnerProps>(
  withState("dataClasses", "setDataClasses", []),
  withInit
);
