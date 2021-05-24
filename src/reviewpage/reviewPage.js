import React, { useState, useEffect, useRef } from 'react';
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import './reviewPage.css';
import './search-bar.css';
import ReviewWrite from './reviewWrite.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartActive, faSearch, faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartInactive, faEdit } from '@fortawesome/free-regular-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ReactStars from "react-rating-stars-component";
import delete_X from "./delete_X.png";

function ReviewPage(){
    const [review, setReview] = useState({
        content: '',
        like: 0,
        total: parseFloat(0),
        interest: 0,
        schedule: 0,
        hashtag: [],
        date: "0",
        active: -1
    })

    const [search, setSearch] = useState({
        hashtag: ""
    })

    const [searchContent, setSearchContent] = useState({
        hashtag: ""
    })

    // const [searchShow, setSearchShow] = useState({
    //     html: "searched:&nbsp; &nbsp; &nbsp;{searchContent.hashtag}"
    // })

    const [selAlign, setSelAlign] = useState({
        align: "date"
    })  

    

    const [viewContent, setViewContent] = useState([{
        id: 1,
        content: "It was a very special experience for me, but my weekend is gone", 
        like: 2, total: 4.0, interest: 5.0, schedule: 3.0, hashtag: ["surfing", "extreme"], date: "210525", active: -1
        },{
        id: 2,
        content: 'It was really fun :)', 
        like: 3, total: 4.5, interest: 5.0, schedule: 4.0, hashtag: ["guitar"], date: "210525", active: -1
        },{
        id: 3,
        content: "Someone who rides a skateboard with me~", 
        like: 4, total: 5.0, interest: 5.0, schedule: 5.0, hashtag: ["skateboard", "board", "friend"], date: "210524", active: -1
        },{
        id: 4,
        content: "When I was in middle school, I was in the school band. I played the guitar after a long time and I remembered that time. But it takes too long. Also purchasing new guitar is too expensive.\n Most guitar academies also require a personal guitar.", 
        like: 12, total: 5.0, interest: 5.0, schedule: 5.0, hashtag: ["guitar"], date: "210319", active: -1  
        },{
        id: 5,
        content: "hahahahahahahahahahahahahahaha\nhahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha", 
        like: 3, total: 5.0, interest: 5.0, schedule: 5.0, hashtag: ["guitar"], date: "210411", active: -1
        },{
        id: 6,
        content: "hahahahahahahahahahahahahahaha\nhahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha", 
        like: 3, total: 5.0, interest: 5.0, schedule: 5.0, hashtag: ["guitar"], date: "210411", active: -1
    }])

    const [dataContent, setDataContent] = useState([...viewContent])

    const nextId = useRef(7);

    const getValue = e => {
        const {name, value} = e.target
        setSearch({
            hashtag: value
        })
        setValSearch({
            val: value
        })
    }

    const history = useHistory()

    const goSearch = () => {
        setSearchContent({
            hashtag: search.hashtag
        })
        setValSearch({
            val: ""
        })
        // history.push('/reviewPage/'+search.hashtag)
    }

    useEffect(() => {
        var newArr = []
        if (searchContent.hashtag == ""){
            newArr = [...dataContent]
        }
        else{
            for (let i=0; i<dataContent.length; i++){
                if (dataContent[i].hashtag == searchContent.hashtag){
                newArr.push(dataContent[i])
                }
            }
        }
        setViewContent(newArr)
    }, [searchContent])

    const addLike = index => e => {
        var newArr = [...viewContent]
        newArr[index].like = newArr[index].like+1;
        newArr[index].active = newArr[index].active * -1
        setViewContent(newArr)
    }

    const delLike = index => e => {
        var newArr = [...viewContent]
        newArr[index].like = newArr[index].like-1;
        newArr[index].active = newArr[index].active * -1
        setViewContent(newArr)
    }

    const selectChange = (e) => {

        console.log(e.target.value)
        setSelAlign({
            align: e.target.value
        })
        
        
        var list = [...viewContent]
        if (e.target.value == "date"){
            list.sort(function(a, b){
                return b.date-a.date
            })
        }
        else if (e.target.value == "score"){
            list.sort(function(a, b){
                return b.total-a.total
            })
        }
        else if (e.target.value == "hearts"){
            list.sort( function(a, b) {
                return b.like-a.like
            })
        }
        
        setViewContent(list)
        
    }

    var pointlist=[0,0,0];
    var comments="";


    const ratingChanged = (index)=>(newRating) => {
    pointlist[index]=newRating;
    let newreview = review;
    newreview.total = pointlist[0];
    newreview.interest = pointlist[1];
    newreview.schedule = pointlist[2];
    setReview(newreview)
    };
    const [hastag,setss]=useState({
    items: [],
    focused: false,
    });
    const [Dayday, setdayday] = useState([{ day:"MON", yes: false, time:[0,0,0,0]},{day:'TUE',yes: false, time:[0,0,0,0] },
    {day:"WED", yes: false,time:[0,0,0,0] },{day:'THU',yes: false, time:[0,0,0,0] },{day:'FRI', yes: false,time:[0,0,0,0] },{day:'SAT', yes: false,time:[0,0,0,0] },
    {day:'SUN',yes: false, time:[0,0,0,0] }])

    const Submit = (evt)=>{
        console.log(review)
        var newArr = [...dataContent]
        newArr.push(review)
        setDataContent(newArr)
        setViewContent(newArr)
    }

    const handleInputChange=(evt)=> {
    let newVal = hastag
    newVal.input = evt.target.value
    setss(newVal);
    }

    const handleInputKeyDown=(evt)=> {
    if ( evt.keyCode === 13 ) {
    const {value} = evt.target;
    
    let newreview = review;
    newreview.hashtag = [...hastag.items,value]
    setReview(newreview)

    setss({
        items: [...hastag.items, value],
    });
    evt.target.value="";

    }
    /*
    if ( hastag.items.length && evt.keyCode === 8 && !hastag.input.length ) {
    setss(hastag => ({
        items: hastag.items.slice(0, hastag.items.length - 1)
    }));
    }*/
    }

    const handleRemoveItem =(index)=> {
    return () => {
    let newreview = review;
    newreview.hashtag = hastag.items.filter((item, i) => i !== index);
    setReview(newreview)
    setss(hastag => ({
        items: hastag.items.filter((item, i) => i !== index)
    }));

    }
    }


    const updateClick= index=>e=> {
    let newArr = [...Dayday];
    newArr[index].yes = !newArr[index].yes;
    setdayday(newArr);
    }

    const updateTime= (index1,index2)=>e=> {
    let newArr = [...Dayday];
    newArr[index1].time[index2] = e.value;
    setdayday(newArr);
    }
    const updatecomment = e=>{
    comments=e.target.value;
    let newreview = review;
    newreview.content = comments;
    setReview(newreview)
    }

    const [searchShow, setSearchShow] = useState({
        show: 0
    })

    const showDel = () => {
        setSearchShow({
            show: 1
        })
    }

    const hideDel = () => {
        setSearchShow({
            show: 0
        })
    }

    const endSearch = () => {
        setSearchContent({
            hashtag: ""
        })
    }

    const [valSearch, setValSearch] = useState({
        val: ""
    })

    const onKeyPress = (e) => {
        if (e.key=='Enter'){
            goSearch()
        }
    }

    return(
        
        <div className="review-body">
            <div className="header">
                <div className="title">Hobby Net</div>
                <input type="search" className="search" placeholder="search" onChange={getValue} value={valSearch.val} onKeyPress={onKeyPress}></input>
                <div ><FontAwesomeIcon icon={faSearch} id="icon" className="search-icon" onClick={goSearch}/></div>
            </div>
            
            <div className="review-container">
                <div className="review-header">
                    <div className="search-hashtag" onMouseOver={showDel} onMouseLeave={hideDel}>searched:&nbsp;&nbsp;&nbsp;{searchContent.hashtag}&nbsp;&nbsp;&nbsp;
                    { searchShow.show ? <FontAwesomeIcon icon={faTimes} onClick={endSearch}/> : <FontAwesomeIcon icon={faTimes} style={{visibility: 'hidden'}}/>}
                    </div>
                    <select className="select" onChange={selectChange}>
                        <option value="date">Upload Date</option>
                        <option value="score">High Score</option>
                        <option value="hearts">Hearts</option>
                    </select>
                </div>
            
                {viewContent.length == 0 ? <div className="noResult">no result</div> : viewContent.map( (element, index) => 
                    <div className="review-each">
                        <div className="date">{String(element.date).substring(0, 2)}/{String(element.date).substring(2, 4)}/{String(element.date).substring(4, 6)}</div>
                        <div className="review-content" >{element.content}</div>
                        <div className="hashtag-container">
                            {element.hashtag.map( (e) => <span className="hashtag">#{e}</span>)}

                        </div>
                        <div className="review-footer">
                            <div className="score">total score: 
                                {element.total %1 == 0 ? <span>{element.total}.0</span> : <span>{element.total}</span>}
                            </div>
                            <div className="score">interest: 
                                {element.total %1 == 0 ? <span>{element.interest}.0</span> : <span>{element.interest}</span>}
                            </div>
                            <div className="score">schedule: 
                                {element.total %1 == 0 ? <span>{element.schedule}.0</span> : <span>{element.schedule}</span>}
                            </div>
                        
                            
                            {element.active == -1 ? 
                                
                                    <div className="like"><FontAwesomeIcon icon={faHeartInactive} id="icon" onClick={addLike(index)}/>{element.like}</div>:
                                    
                                    <div className="like"><FontAwesomeIcon icon={faHeartActive} id="icon" onClick={delLike(index)} style={{color: "#f60000"}}/>{element.like}</div>
                                                    
                            }
                        </div>
                        
                    </div>
                )}
            
            </div>
            <Popup trigger={<button className="button-write"><FontAwesomeIcon icon={faEdit} id="icon"/>write</button>} modal nested>
            {close => (
      <div className="modal1">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Share your hobby experience </div>
        <div className="content">
        <div className="bigwrapper"> 
      <div className = "wrapper">    
        <div className="full"> 
        <h1 id="titlewrite">
          <FontAwesomeIcon icon={faCircle} />  HOBBY REVIEW  <FontAwesomeIcon icon={faCircle} />
        </h1>
        <div>
          <table>
          <tbody>
              <tr>
    <td>Add categories:
      <label>
          <ul className="container1">
            {(hastag.items).map((item, i) => 
              <li key={i} className="items" onClick={handleRemoveItem(i)}>
                {item}
                <span>   <FontAwesomeIcon icon={faTimes}/>    </span>
              </li>
            )}
            <input
              value={hastag.input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown} />
          </ul>
        </label>
      </td>
    </tr><tr>
              <td>Comments:<textarea id="hashtagbox" onInput={updatecomment} cols="40" rows="3" charswidth="30" ></textarea></td>
              </tr>
              </tbody>
              </table>
        </div>
 
        <div id="starbox">
            <table>
              <tbody>
              <tr>
                  <td>Total</td>
                  <td>
    <ReactStars
      count={5}
      onChange={ratingChanged(0)}
      size={24}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
            </td>
              </tr>
              <tr>
                  <td>Interest</td>
                  <td>    <ReactStars
      count={5}
      onChange={ratingChanged(1)}
      size={24}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    /></td>
              </tr>
              <tr>
                  <td>Schedule</td>
                  <td><ReactStars
      count={5}
      onChange={ratingChanged(2)}
      size={24}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    /></td>
              </tr>
              </tbody>
            </table>
        </div>
        <div id ="hashtag box">
            <table> 
              <tbody>
            {Dayday.map( (element, index) => <tr>
            <td>{element.day}</td>
            <td><button type="button" onClick={updateClick(index)} className={element.yes?"emptycirbtn":"fullcirbtn"}></button></td>
            <td>No</td> 
            <td><button onClick={updateClick(index)} className={element.yes ? "fullcirbtn":"emptycirbtn"}></button></td>
            <td>Yes</td>  
            <td>from  <input type ="number" onInput={updateTime(index,0)} id="hour" min={0} max={24} step={1} className={element.yes?"happy":"greyback"}/> :  
            <input type ="number" onInput={updateTime(index,1)} min={0} max={50} step={10}  className={element.yes?"happy":"greyback"} /> 
             to  <input type ="number" onInput={updateTime(index,2)} min={0} max={24} step={1}  className={element.yes?"happy":"greyback"}/> : 
             <input type ="number" onInput={updateTime(index,3)} min={0} max={50} step={10}  className={element.yes?"happy":"greyback"}/>                
             </td>
                </tr>)}
                </tbody>
            </table>
        </div>
      </div>
      </div>
      </div>
        </div>
        <div className="actions">
        <button
            className="button"
            onClick={() => {
                setReview({
                    content: '',
                    like: 0,
                    total: parseFloat(0),
                    interest: 0,
                    schedule: 0,
                    hashtag: [],
                    date: "0",
                    active: -1
                })
                setdayday([{ day:"MON", yes: false, time:[0,0,0,0]},{day:'TUE',yes: false, time:[0,0,0,0] },
  {day:"WED", yes: false,time:[0,0,0,0] },{day:'THU',yes: false, time:[0,0,0,0] },{day:'FRI', yes: false,time:[0,0,0,0] },{day:'SAT', yes: false,time:[0,0,0,0] },
  {day:'SUN',yes: false, time:[0,0,0,0] }])
                setss({
                    items: [],
                    focused: false,
                    })
              console.log('Cancel');
              close();
            }}
          >
            close
          </button>
          <button
            className="button"
            onClick={() =>{
              Submit()
              console.log('Accept');
              close();
            }}
          >
            Accept
          </button>
        </div>
      </div>
    )}
  </Popup>
        </div>
    )
}

export default ReviewPage;