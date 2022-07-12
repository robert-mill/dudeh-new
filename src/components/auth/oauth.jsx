import url from "url";
import invariant from "invariant";
const protocol = "https";
const host = "my.pcloud.com";
const path = "/oauth2/authorize";
const oAuthOptions = {
  client_id: string,
  redirect_uri: string,
  response_type: "token" | "code",
  receiveToken: (any) => "",
};
const oAuthPollOptions = {
  client_id: string,
  response_type: "poll_token",
  receiveToken: (string = () => ""),
  onError: (Error = () => ""),
};

generateRandomString = (strlen) =>{
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < strlen; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

buildOauthUrl = (query) => {
  return url.format({
    protocol: protocol,
    hostname: host,
    pathname: path,
    query: query,
  });
};

initOauthToken = (options=this.oAuthOptions) => {

  const options = {
    client_id = null,
    redirect_uri = null,
    receiveToken = null,
    response_type = "token",
  };
  invariant(client_id, "`client_id` is required.");
  invariant(redirect_uri, "`redirect_uri` is required.");
  invariant(receiveToken, "`receiveToken` is required.");
  const oauthUrl = buildOauthUrl({
    redirect_uri: redirect_uri,
    client_id: client_id,
    response_type: response_type,
  });
  window.open(oauthUrl, "oauth", "width=680,height=700");
  window.__setPcloudToken = function (token, locationid) {
    receiveToken(token, locationid);
    delete window.__setPcloudToken;
  };
};

initOauthPollToken = (options=this.oAuthPollOptions) =>{
    const request_id =  this.generateRandomString(40);
    const { client_id = null, receiveToken = null, onError = null } = options;

}