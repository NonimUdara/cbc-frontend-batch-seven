import "./productCard.css";

export default function ProductCard(props) {

    console.log(props);

    console.log("ProductCard Rendered");

    return (
        <div className="productCard">
            <h1>
                name: {props.name}
            </h1>
            <p>
                price: {props.price}
            </p>
            <img className="productImage" src={props.image} alt="" />
            <button>
                Add to Cart
            </button>
        </div>
    )

} 