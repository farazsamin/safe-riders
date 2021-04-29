import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import allData from '../Data/data.json'
import Map from '../Map/GoogleMap';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [img, setImg] = useState({})
    const [click, setClick] = useState(false)

    const { type } = useParams();

    useEffect(() => {
        const matchedItem = allData.filter(data => data.name === type)
        const vehicleImg = (matchedItem[0].img)
        setImg(vehicleImg);
    }, [img])




    return (

        <div className="row ml-5">
            <div className="col-md-4">
                <p>From</p>
                <input className="form-control mb-3" type="text" placeholder="Your current location" required />
                <p>To</p>
                <input className="form-control " type="text" placeholder="Where yo want to go" required></input>
                <p>Date</p>
                <input type="date" name="begin"
                    placeholder="dd-mm-yyyy" value=""
                    min="2021-03-20" max="2030-12-31" required />


                <button onClick={() => setClick(true)} className="btn btn-primary mt-3 d-block mb-5">Search</button>
                {

                    click ?
                        <div className="border border-secondary rounded p-5">
                            <div className="mb-5"> <img src={img} className="w-25 d-inline" alt="" />
                                <p className="d-inline ml-5">2 <FontAwesomeIcon className="ml-3" icon={faUserFriends}></FontAwesomeIcon></p>
                                <h6 className="d-inline ml-5 pl-5">Cost : $10</h6></div>

                            <div> <img src={img} className="w-25 d-inline" alt="" />
                                <p className="d-inline ml-5">2 <FontAwesomeIcon className="ml-3" icon={faUserFriends}></FontAwesomeIcon></p>
                                <h6 className="d-inline ml-5 pl-5">Cost : $20</h6></div>

                        </div>

                        : <div></div>

                }

            </div>

            <div className="col-md-7">
                {
                    click ? <Map></Map> : <div></div>
                }

            </div>



        </div>
    );
};

export default Book;