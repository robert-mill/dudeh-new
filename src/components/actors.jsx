import React, { Component } from "react";
import { Link } from "react-router-dom";
import {stripHtml} from "string-strip-html";
import {
  getActorGroups,
  deleteActorGroup,
} from "../services/actorGroupService";
import { getActors, deleteActor } from "../services/actorService";
import {getActorGallerys, deleteActorGallery} from "../services/actorGalleryService";
import auth from "../services/authService";
import { toast } from "react-toastify";
// import GallerySimple from "./common/gallerySimple";
// import Gallery3D from "./common/gallery-3d";
class Actor extends Component {
  state = {
    data: [],
    groupData: [],
    filtered: [],
    gallery:[],
    name:"",
    showGallery:false,
    imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
  };
  async componentDidMount() {
    let  filtered = this.state.filtered;
    const { data: groupData } = await getActorGroups();
    const {data: gallery} = await getActorGallerys();
    const { data } = [];
    if(filtered.length===0){

     
      filtered = await gallery.filter((m) => m.name ===gallery[0].name);

        this.setState({ filtered, gallery, name:gallery[0].name});
    


    }else{
         this.setState({ data, groupData, filtered,gallery});
    }
    let showGallery = false;
    if(data!==[]){
      showGallery = true;
    }
    
    this.setState({showGallery});
  }

  handleImage = (m) => {
    try {
      const { imgArr } = this.state;
      if (m) {
        let image = m.toLowerCase().split(".").pop();
        if (imgArr.includes(image)) {
          return m;
        } else {
          return false;
        }
      }
    } catch (err) {
      return m.image;
    }
  };
  handleClearFilter = () => {
    
    this.setState({ filtered: [] });
  };
  handleDelete = async (actor) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== actor._id);
    this.setState({ data });
    try {
      await deleteActor(actor._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };

  handleGroupItemDelete = async (actorGroup) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== actorGroup._id);
    this.setState({ data });
    try {
      await deleteActorGroup(actorGroup._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };
  handleGroupClick = async (md) => {
    const gallery = await this.state.gallery;
    const filtered = await gallery.filter((m) => m.name === md.name);
    
    this.setState({ filtered, showGallery:true, name:md.name  });
  };
  handleGalleryDelete = async (g) =>{
    const originalGallery = this.state.gallery;
    const gallery  = originalGallery.filter((m) => m._id !== g._id);
    this.setState({gallery});
    try {
      await deleteActorGallery(g._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This gallery item has already been deleted");
      this.setState({ gallery: originalGallery });
    }
  }
  handleGalleryClick = async () =>{
  
    this.setState({ filtered:[], showGallery:true });
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
    const { data, groupData, filtered, gallery, showGallery,name } = this.state;
    const newArr = this.removeDuplicates(gallery, "name");
    

    const galleryItems = Object.keys(filtered).map((key) => filtered[key]);
  

    return (
      <React.Fragment>
       
        <div className=""></div>
        <style>{`.spinner{display:none;"`}</style>
        {auth.getRole() && auth.getCurrentUser() && (
          <React.Fragment>
            <div className="row">
              <button className="btn btn-primary">
                <Link className="navbar-brand" to={`/actor/new`}>
                  New main article
                </Link>
              </button>
              <button className="btn btn-primary">
                <Link className="navbar-brand" to={`/actorGroup/new`}>
                  New sub panal
                </Link>
              </button>
              <button className="btn byn-secondary">
                <Link className="navbar-brand" to={`/actorGallery/new`}>Add gallery pic</Link>
              </button>
            </div>
          </React.Fragment>
        )}

        <div className="row about-pan">
          <div className={`col-lg-9 col-md-12`}>
            <div className="row">
              {newArr && (
                <div className="col-lg-2 col-md-12 article-index">
                  <div className="about-pan-head">Actor articles</div>
                  <img src="/image.png" alt="gallery"  onClick={this.handleGalleryClick}/>
                  {newArr &&
                    newArr.map((m) => (
                      <div className="gd-bx" key={m._id}>
                        <div className="gd-bx-in">
                          {m.name && (
                            <span className="gd-bx-hd gd-mre" onClick={() => this.handleGroupClick(m)}>
                              <h3>{stripHtml(m.name)}</h3>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                 {newArr.length >0 && <div className="cf" onClick={this.handleClearFilter}>
                    Back{" "}
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </div>}
                </div>
              )}
              <div className={`col-lg-${(groupData && "7 gallery-block")  || "9 gallery-block"} col-md-12 gallery-block`}>
                        
                {(
                  showGallery > 0 &&  filtered && 
                  (
                  <React.Fragment>
                    {/* <Gallery3D gallery={ filtered} name={name} className="gallerydesktop" page="actorGallery"/> */}
                    <div  className="gallerymobile row"><div className="col-12">
                      {/* <GallerySimple  data={filtered} name={name} onChange={this.onChange} onDelete={this.handleGalleryDelete}/> */}
                    </div></div>
                  </React.Fragment>
                  
                  ) 
                  
                     
                  )}
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Actor;
