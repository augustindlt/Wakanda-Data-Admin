import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import Store from "../../libs/Store/Store";

export interface IProps {
  totalEntities: number;
  limit: number;
  skip: number;
}

interface IState {
  offset: number;
}

const NUMBER_ITEMS = 5;

export class PaginationEntities extends Component<IProps, IState> {
  public state = {
    offset: 0
  };

  public componentDidMount() {
    if (!Store.skip || !Store.limit) return;
    this.setState({
      offset: Math.floor(this.currentPageNumber / NUMBER_ITEMS) * NUMBER_ITEMS
    });
  }

  public render() {
    const { offset } = this.state;
    if (this.numberOfPages > 1)
      return (
        <p>
          <Pagination size="sm" className="text-center">
            {this.currentPageNumber > 0 && (
              <Pagination.First onClick={this.changeToPrevPage} />
            )}
            {offset > 0 && <Pagination.Prev onClick={this.decrementOffset} />}
            {this.renderPaginationItems()}
            {this.numberOfPages > NUMBER_ITEMS + offset && (
              <Pagination.Next onClick={this.incrementOffset} />
            )}
            {this.currentPageNumber + 1 < this.numberOfPages && (
              <Pagination.Last onClick={this.changeToNextPage} />
            )}
          </Pagination>
        </p>
      );

    return <></>;
  }

  private renderPaginationItems = () => {
    const { offset } = this.state;

    const numberOfPages =
      NUMBER_ITEMS + offset > this.numberOfPages
        ? NUMBER_ITEMS - (NUMBER_ITEMS + offset - this.numberOfPages)
        : NUMBER_ITEMS;

    // @ts-ignore
    return [...Array(numberOfPages).keys()].map(numberPage => (
      <Pagination.Item
        key={numberPage}
        active={numberPage + offset === this.currentPageNumber}
        onClick={() => this.handleChangePage(numberPage + offset)}
      >
        {numberPage + offset}
      </Pagination.Item>
    ));
  };

  private get numberOfPages() {
    const { totalEntities, limit } = this.props;
    return Math.ceil(totalEntities / limit);
  }

  private get currentPageNumber() {
    return Store.skip! / Store.limit!;
  }

  private incrementOffset = () => {
    this.setState(({ offset }) => ({ offset: offset + NUMBER_ITEMS }));
  };

  private decrementOffset = () => {
    this.setState(({ offset }) => ({ offset: offset - NUMBER_ITEMS }));
  };

  private changeToPrevPage = () => {
    this.handleChangePage(this.currentPageNumber - 1);
  };

  private changeToNextPage = () => {
    this.handleChangePage(this.currentPageNumber + 1);
  };

  private handleChangePage = (numberPage: number) => {
    Store.skip = Store.limit! * numberPage;
    Store.apply();
  };
}
