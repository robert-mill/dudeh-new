import React, { Component } from "react";


import { toast } from "react-toastify";
class About extends Component {
  state = {
    data: [],
    groupData: [],
    filtered: [],
    imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
  };
  async componentDidMount() {
    let filtered=this.state.filtered;
    const { data: groupData } = await getAboutGroups();
    if(filtered.length===0){
      filtered = groupData[0];
      this.setState({groupData, filtered});
    }
    
    this.setState({  groupData });
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
  handleDelete = async (about) => {
    const originaldata = this.state.data;

    const data = originaldata.filter((m) => m._id !== about._id);
    this.setState({ data });
    try {
      await deleteAbout(about._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };

  handleGroupItemDelete = async (aboutGroup) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== aboutGroup._id);
    this.setState({ data });
    try {
      await deleteAboutGroup(aboutGroup._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };
  handleGroupClick = async (md) => {
    const groupData = await this.state.groupData;
    const filtered = await groupData.filter((m) => m._id === md._id);
    console.log("............."+filtered[0]._id);
    this.setState({ filtered:filtered[0] });
  };

  render() {
    const { data, groupData, filtered } = this.state;
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <React.Fragment>
        <div className=""></div>
        <style>{`.spinner{display:none;"`}</style>
       

        <div className="row about-pan">
          <div className={`col-lg-9 col-md-12`}>
            <div className="row">
             
               
                <div className="col-lg-2 col-md-12 article-index">
                  <div className="about-pan-head">About articles</div>
                 
                      <div className="gd-bx">
                        <div className="gd-bx-in">
                         
                            <span className="gd-bx-hd">
                              <h3>About Dennis Udeh</h3>
                            </span>
                         
                         
                        </div>
                      </div>
                
                

                  
                </div>
                 <div className="col-lg-7  col-md-12 article-index ">
                          <p>This has been disabled at this time</p>
                </div>
                
              
             
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
