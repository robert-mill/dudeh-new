import React, { Component } from "react";
import { getMessageStarts } from "../../services/messageStartService";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
import ReactHtmlParser from "react-html-parser";
class MessageBlock extends Component {
  state = { data: [], coloursArray: ["light", "dark"] };
  async componentDidMount() {
    const { data } = await getMessageStarts();
    console.log(data);
    this.setState({ data });
  }
  render() {
    const { data: messages, coloursArray } = this.state;
    return (
      <React.Fragment>
        <div className="row message-head">
          <h3>Message Block</h3>
        </div>
        <div className="row message-block">
          {messages &&
            messages.map((m, index) => (
              <div
                key={m._id}
                className={`${coloursArray[index % coloursArray.length]} 
                  messageBlockHead`}
              >
                {/* {<a href="" >ReactHtmlParser(m.cbeMesssageHead)</a>} */}
                {(auth.getCurrentUser() && (
                  <Link to={`messagePage/${m._id}`}>
                    {ReactHtmlParser(m.cbeMesssageHead)}
                    ...view more
                  </Link>
                )) || <div>{ReactHtmlParser(m.cbeMesssageHead)}</div>}
              </div>
            ))}
        </div>
        {(auth.getCurrentUser() && (
          <div className="row">
            <Link className="btn btn-primary" to={`/messages/new`}>
              Add message post
            </Link>
          </div>
        )) || (
          <div>
            <Link className="btn btn-primary" to="/login">
              Login to view more
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MessageBlock;
