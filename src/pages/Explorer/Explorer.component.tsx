import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Table from "../../components/Table";
import DataClassList from "../../components/DataClassList";
import QueryForm from "../../components/QueryForm";
import LimitForm from "../../components/LimitForm";

interface IProps {}

interface IState {}

export class Explorer extends Component<IProps, IState> {
  public state: IState = {};

  public render() {
    return (
      <Row className="no-gutters">
        <Col sm="3" className="pr-sm-1">
          <QueryForm />
          <br />
          <LimitForm />
          <br />
          <DataClassList />
        </Col>
        <Col sm="9">
          <Table />
        </Col>
      </Row>
    );
  }
}
