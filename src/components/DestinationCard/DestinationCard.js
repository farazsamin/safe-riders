import { useHistory } from 'react-router';

const DestinationCard = (props) => {
    const history = useHistory();
    const {name,img} =props.name;
    const handlebook=(name)=>{
        history.push(`/destination/${name}`) 
    }
    return (
        <div className="col-md-3">
             <div className="card text-center">
             <img className="mx-auto w-50 p-2" src={img} alt="Card  cap"/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <button className="btn btn-primary" onClick={()=>handlebook(name)}>Book now</button>
                </div>
             </div>
        </div>
    );
};

export default DestinationCard;