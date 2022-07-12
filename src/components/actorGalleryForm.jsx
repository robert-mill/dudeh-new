import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveActorGallery, getActorGallery, getActorGallerys } from "../services/actorGalleryService";
import auth from "../services/authService";
import PhotoUpload from "./common/photoUpload";
import VariantSelector from "./common/VariantSelector";
class ActorGalleryForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        name:"",
        image: "",
        caption: "",
      },
      newArr:[],
      gallery:[],
      name:"",
      image: "",
      caption: "",
      errors: {},
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  schema = {
    name: Joi.string().allow("").optional().label(" Actor Name"),
    image: Joi.string().allow("").optional().label(" Actor Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateActor();
    const {data} = await getActorGallerys();
    
     
    this.setState({gallery:data});
   
  }
  async populateActor() {
    try {
      const actorId = this.props.match.params.id;
      if (!actorId) return;

      const { data: actor } = await getActorGallery(actorId);
      const _id = actorId ? actorId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(actor) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(actor) {
    return {
      _id: actor._id,
      name: actor.name,
      image: actor.image,
      caption: actor.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveActorGallery(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };


  handleImageChange = async (event) => {
    const content = document.getElementById("preview_img").src;
    const caption = document.getElementById("caption").value;
    const data = { ...this.state.data };

    data.image = content;
    data.caption = caption;
    this.setState({ data });
  };
  // handleCaptionChange = async () => {
  //   const data = { ...this.state.data };
  //   const caption = document.getElementById("caption").value;
  //   data.caption = caption;
  //   this.setState({ data });
  // };
  onClickHandler = async (e) => {
    e.preventDefault();
    const image = await document.getElementById("preview_img").src;
    const caption = await document.getElementById("caption").value;

    const data = { ...this.state.data };
    data.image = image;

    data.caption = caption;

    await this.setState({ data });
    const response = await this.doSubmit();
  };

  handleSelectChange = (e) =>{
    const data = {...this.state.data};
    document.getElementById("name").value = e.target.value;
    data.name= e.target.value;
    this.setState({name: e.target.value, data});
  }


  removeDuplicates = (originalArray, prop) =>{
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
     
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}
  render() {
    const { image, caption, name } = this.state.data;
    const { gallery } = this.state;
    const nameIn = 'name';
    let nnarr = this.removeDuplicates(gallery,nameIn);

   
console.log(nnarr);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <PhotoUpload imageIn={image} />

              <div className="mainform-elements">
                <h1>Add actor actor image</h1>

                {
                  <form>
                    <input
                      type="hidden"
                      name="_id"
                      value={this.state._id}
                      label="id"
                      onChange={this.handleChange}
                      error={this.state.errors["_id"]}
                    />
                  <div><label htmlFor="currname">Name/group select exsiting<br></br>
                  <select onChange={this.handleSelectChange} id="currentname">
                      <option value=""></option>
                      {nnarr && nnarr.map((m)=><option key={m._id} value={m.name}>{m.name}</option>)}
                  </select> OR (add new) 
                  <input type="text" id="name" name="name" value={name} onChange={this.handleChange}  error={this.state.errors["name"]}/></label></div>
                    <input
                      type="hidden"
                      name="image"
                      id="ImageEditor"
                      value={image}
                      onChange={this.handleImageChange}
                      error={this.state.errors["image"]}
                    />
                    <label htmlFor="caption">Caption</label>
                    <input
                      type="text"
                      name="caption"
                      id="caption"
                      value={caption}
                      onChange={this.handleChange}
                      error={this.state.errors["caption"]}
                    />
                    <div className="row">
                      <div className="col">
                        <input
                          type="submit"
                          value="Add article"
                          id="actor_btn"
                          onClick={this.onClickHandler}
                        />
                      </div>
                    </div>
                  </form>
                }
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ActorGalleryForm;
