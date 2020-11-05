import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { IOrder } from "../types/orders-interfaces";

const TableBody = ({ data }: { data: IOrder[] }): JSX.Element => {

  // useEffect()

  return (
    <tbody>
      {data.map((item: IOrder) => (
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.createdAt!.toLocaleString().substring(0, 10)}</td>
          <td>{item.totalPrice}</td>
          <td>
            {item.isPaid ? (
              item.paidAt
            ) : (
              <i className="fas fa-times" style={{ color: "red" }}></i>
            )}
          </td>
          <td>
            {item.isDelivered ? (
              item.deliveredAt
            ) : (
              <i className="fas fa-times" style={{ color: "red" }}></i>
            )}
          </td>
          <td>
            <LinkContainer to={`/order/${item._id}`}>
              <Button className="btn-sm" variant="light">
                Details
              </Button>
            </LinkContainer>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
