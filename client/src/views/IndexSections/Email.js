import React from "react";
import classnames from "classnames";
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

class Inputs extends React.Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleSubmit = (e, subscribe) => {
    e.preventDefault();
    subscribe({ EMAIL: this.state.email });
    this.setState({ email: '' });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };



  render() {
    return (
      <>
        <section className="section pb-0 section-components">
          <Container className="mb-5">
            {/* Inputs */}
            <h3 className="text-center text_black font-weight-bold mb-4">
              Elevate Your Business Journey with Our Newsletter!
            </h3>
            <div className="mb-3">
              <span style={{ fontSize: "24px" }} className="text_black text-left Eina01-Regular">
                Subscribe to our exclusive newsletter for a powerhouse of business insights, insider tips, and venture opportunities delivered directly to your inbox. From expert advice and strategic guidance to emerging ventures and special offers, we've got your entrepreneurial needs covered.
              </span>
            </div>
            <Row className="pt-4">
              <Col lg="3" sm="6">

              </Col>
              <Col lg="6" sm="6">

                <FormGroup
                  className={classnames({
                    focused: this.state.birthdayFocused,
                  })}
                >
                  <MailchimpSubscribe
                    url="https://hotmail.us18.list-manage.com/subscribe/post?u=736b287c2bd3bcaa990179035&amp;id=0fe626cf3c&amp;f_id=0090c2e1f0"
                    render={({ subscribe, status, message }) => (
                      <div>
                        <form onSubmit={(e) => this.handleSubmit(e, subscribe)}>
                          <InputGroup className="mb-4">
                            <Input
                              type="email"
                              value={this.state.email}
                              onChange={this.handleEmailChange}
                              placeholder="Enter your email"
                              onFocus={(e) => this.setState({ birthdayFocused: true })}
                              onBlur={(e) => this.setState({ birthdayFocused: false })}
                            />
                            <Button color="primary" className="h-100 mt-0 mb-0" type="submit">Subscribe</ Button>
                          </InputGroup>
                        </form>
                        {status === 'sending' && <div>Sending...</div>}
                        {status === 'error' && (
                          <div>
                            <div > {message}</div>
                          </div>
                        )}
                        {status === 'success' && <div>{message}!</div>}
                      </div>
                    )}
                  />
                </FormGroup>
              </Col>
              <Col lg="3" sm="6">

              </Col>
            </Row>
          </Container>

        </section>
      </>
    );
  }
}

export default Inputs;
