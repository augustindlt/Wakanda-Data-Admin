import React, { Component } from "react";
import { ListGroup, ListGroupItem, Form } from "react-bootstrap";
import Store from "../../libs/Store/Store";
import Pagination from "../PaginationEntities";

interface IProps {}

export class LimitForm extends Component<IProps> {
  public state = {
    limit: (Store.limit && Store.limit.toString()) || undefined
  };

  public render() {
    const { limit } = this.state;
    return (
      <ListGroup>
        <ListGroupItem disabled>Limit</ListGroupItem>
        <ListGroupItem>
          <Form onSubmit={this.applyQuery}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter limit"
                onChange={this.handleChange}
                value={limit}
              />
            </Form.Group>
          </Form>
          <Pagination />
        </ListGroupItem>
      </ListGroup>
    );
  }

  private handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value !== "" && isNaN(parseInt(value))) return;
    return this.setState({ limit: value });
  };

  private applyQuery = (e: any) => {
    e.preventDefault();
    Store.limit = parseInt(this.state.limit!);
    Store.apply();
  };
}
