import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "", category: "" };
  }

  handleTextChange = (value) => {
    this.setState({...this.state, text: value });
  }
  handleTitleChange= (e) => {
    this.setState({...this.state, title: e.target.value });
  }
  handleCategoryChange= (e) => {
    this.setState({ ...this.state, category: e.target.value });
  }

  formatData = () => {
    return {
        "category": this.state.category,
        "title": this.state.title,
        "cover": null,
        "readTime": {
      "value": null,
          "unit": null
    },
      "author": {
      "name": null,
          "avatar": null
    },
      "content": this.state.text,
        "createdAt": new Date(),
    }
  }

  sendForm = async (e) => {
    e.preventDefault();
    await fetch('/posts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify( this.formatData() )
    })
  }
  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5"
              onSubmit={this.sendForm}
        >
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Title" onChange={this.handleTitleChange}/>
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" onChange={this.handleCategoryChange}>
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.text}
              onChange={this.handleTextChange}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
