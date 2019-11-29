import React, { Component } from "react";
import { ListGroup, ListGroupItem, Form } from "react-bootstrap";
import Store from "../../libs/Store/Store";

interface IProps {}

export class QueryForm extends Component<IProps> {
  public state = {
    query: Store.filter
  };

  public render() {
    const { query } = this.state;
    return (
      <ListGroup>
        <Form onSubmit={this.applyQuery}>
          <ListGroupItem disabled>Query</ListGroupItem>
          <ListGroupItem>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter query"
                onChange={this.handleChange}
                value={query}
              />
            </Form.Group>
          </ListGroupItem>
        </Form>
      </ListGroup>
    );
  }

  private handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: value });
  };

  private applyQuery = (e: any) => {
    e.preventDefault();
    Store.filter = this.state.query;
    Store.apply();
  };
}
