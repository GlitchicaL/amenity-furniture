// <i class="fas fa-star"></i>
// <i class="fas fa-star-half"></i>

const Rating = ({ value, reviews }) => {
    const color = "#E6E665";

    return (
        <div className="flex rating">
            <span className="star">
                <i style={{ color }} className={
                    value >= 1
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>

                </i>
            </span>

            <span className="star">
                <i style={{ color }} className={
                    value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>

                </i>
            </span>

            <span className="star">
                <i style={{ color }} className={
                    value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>

                </i>
            </span>

            <span className="star">
                <i style={{ color }} className={
                    value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>

                </i>
            </span>

            <span className="star">
                <i style={{ color }} className={
                    value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>

                </i>
            </span>

            <p style={{ marginLeft: '0.25em' }}>{reviews && reviews}</p>
        </div>
    );
}

export default Rating;