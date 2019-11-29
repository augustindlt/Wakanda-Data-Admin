import { compose, withState, withProps, lifecycle } from "recompose";
import {
  IWakAttribute,
  IWakEntity
} from "../../libs/WakConnector/WakConnector.types";
import Store from "../../libs/Store/Store";
import WakConnector from "../../libs/WakConnector/WakConnector";

interface IInnerProps {
  dataClass?: string;
}

interface IOuterProps {
  attributes: IWakAttribute[];
  entities: IWakEntity[];
  totalEntities: number;
}

let storesAttributes: IWakAttribute[] = [];
let storedEntities: IWakEntity[] = [];
let storedTotalEntities = 0;

interface IConnectedProps extends IInnerProps {
  setAttributes: (attributes: IWakAttribute[]) => void;
  setEntities: (entities: IWakEntity[]) => void;
  setTotalEntities: (total: number) => void;
  dataClass: string;
}

const withParamsProp = (props: IConnectedProps) => {
  return { dataClass: props.dataClass || Store.table };
};

const fetchAttributesAndEntities = async (dataClass: string) => {
  const { attributes } = await WakConnector.getCatalog(dataClass);
  const { __ENTITIES, __COUNT } = await WakConnector.getDatas(
    Store.currentStateToWakUrl()
  );
  return {
    attributes,
    entities: __ENTITIES,
    totalEntities: __COUNT
  };
};

const setAttributesAndEntities = async (props: IConnectedProps) => {
  const {
    attributes,
    entities,
    totalEntities
  } = await fetchAttributesAndEntities(props.dataClass);
  props.setAttributes(attributes);
  props.setEntities(entities);
  props.setTotalEntities(totalEntities);
};

const withInit = lifecycle<IConnectedProps, {}>({
  componentDidMount() {
    setAttributesAndEntities(this.props);
  }
});

export default compose<IOuterProps, IInnerProps>(
  withState("attributes", "setAttributes", storesAttributes),
  withState("entities", "setEntities", storedEntities),
  withState("totalEntities", "setTotalEntities", storedTotalEntities),
  withProps(withParamsProp),
  withInit
);
