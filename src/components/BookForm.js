import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const BookForm = (props) => {
  console.log(props);

  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : "",
      author: props.book ? props.book.author : "",
      quantity: props.book ? props.book.quantity : "",
      price: props.book ? props.book.price : "",
      date: props.book ? props.book.date : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { bookname, author, price, quantity } = book;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const values = [bookname, author, price, quantity];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        price,
        quantity,
        date: new Date(),
      };

      props.handleOnSubmit(book);
    } else {
      errorMsg = "Please Fill out all the fields!";
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "quantity":
        if (value === "" || parseInt(value) === +value) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      case "price":
        if (value === "" || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  return (
    <div className="main-form">
      <Form onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            placeholder="Enter Name of Book"
            value={bookname}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            placeholder="Enter Name of Author"
            value={author}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            placeholder="Enter available Quantity"
            value={quantity}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            placeholder="Enter Price of Book"
            value={price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
