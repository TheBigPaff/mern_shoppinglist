function Item(props){
    return (
        <div>
            <li>{props.item}</li>
            <button>Edit</button>
        </div>
    );
}

export default Item;