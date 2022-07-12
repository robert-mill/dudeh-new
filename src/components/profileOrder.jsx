import React, {Component} from "react";
import { saveProfileGallery,  getProfileGallerys } from "../services/profileGalleryService";
import { Link } from "react-router-dom";
//import DragSortableList from "react-drag-sortable";
import parse from "html-react-parser";
import auth from "../services/authService";
class ProfileOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
          currentNumber: [],
          _id:"",
         
        };
    }
    async componentDidMount() {
        if( !auth.getRole() || !auth.getCurrentUser()){
            window.location ="/";
        }
        const { data: currentNumber } = await getProfileGallerys();
        const _id = this.props.match.params.id
        console.log(currentNumber);
        await this.setState({_id, currentNumber });
      }
      handleDragChange = async () => {
        
        var list = document.getElementsByClassName("List")[0];
    
        for (var i = 0; i < list.getElementsByClassName("draggable").length; i++) {
          const id = list.getElementsByClassName("id")[i].value;
          const name = list.getElementsByClassName("name")[i]
            .value;
          const caption = list.getElementsByClassName("caption")[i]
            .value;
          const order = i;
          const image = list.getElementsByClassName("image")[i].value;
    
          const data = {
            _id: id,
            name: name,
            caption: caption,
            order: order,
            image: image,
          };
          document.getElementById(`ind-${i}`).style="background-color:rgba(152,118,80,0.3)";
          await saveProfileGallery(data);
          document.getElementById(`ind-${i}`).style="background-color:rgba(255,255,255,1)";
        }
      };
    render() {
        const { currentNumber: currentNumberdata } = this.state;
        let nList = [];
            Object.keys(currentNumberdata).forEach(function (key, index) {
            const image = currentNumberdata[key].image;
            nList.push({
                content: parse(
                `<input type="hidden" name="id" class="id" value=${currentNumberdata[key]._id} />
                <input type="hidden" name="name" class="name"  value="${currentNumberdata[key].name}" />
                  <div id=${`ind-${index}`} class="profilelist"><img src=${image} alt=""  style="width:50px"/><div style="width: 30px;text-align: center;float: left;margin-right: 2rem;height: 100%!important;display: table-cell;vertical-align: middle;border: 1px solid;"><i class="fa fa-chevron-up" aria-hidden="true"></i><br><i class="fa fa-chevron-down" aria-hidden="true"></i></div>Original order position: ${currentNumberdata[key].order}</div>
                <input type="hidden" name="caption" class="caption" value="${currentNumberdata[key].caption}" />
                <input type="hidden" name="order" class="order" value="${currentNumberdata[key].order}" />
                <input type="hidden" name="image" class="image" value="${currentNumberdata[key].image}" />
                 `
                ),
            });
            });
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row admin-form">
                        <div className="col"></div>
                        <div className="col-md-7">
                        {/* <DragSortableList
                            items={nList}
                            dropBackTransitionDuration={0.3}
                            onSort={this.handleDragChange}
                            type="vertical"
                         /> */}
                         <div><Link to={`/profile/`}>Back</Link></div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>        
            </React.Fragment>
        );
    }
}

export default ProfileOrder;