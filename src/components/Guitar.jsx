// Guitar.js
export default function Guitar({ guitar, addToCart }) {
    const { id, name, description, image, price } = guitar;
  
    return (
      <div className="col-md-6 col-lg-4 my-4">
        <div className="guitar-card d-flex">
          <div className="guitar-card-img flex-shrink-0" style={{ width: "40%" }}>
            <img
              src={`img/${image}.jpg`}
              alt={`Imagen de ${name}`}
              className="img-fluid"
            />
          </div>
          <div
            className="guitar-card-body d-flex flex-column justify-content-between ps-3"
            style={{ width: "60%" }}
          >
            <div className="guitar-card-content">
              <h3 className="guitar-card-title text-uppercase">{name}</h3>
              <p className="guitar-card-description">{description}</p>
              <p className="guitar-card-price fw-black">${price}</p>
            </div>
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={() => addToCart(guitar)}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    );
  }
  