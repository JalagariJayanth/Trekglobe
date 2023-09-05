
import "./index.css"

const Reviews = () => {
    return (
       
        <div className="trek-reviews-background-container">
            <div className="reviews-main-container">
            <h1 className="review-heading">Reviews</h1>
                <div className="review-control-container">
                     <div className="review-container">
                        <img src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693393501/cheap_pps6yn.png" className="review-img" alt="review" />
                        <h1 className="review-card-item-heading">Budget-Friendly Bliss: Unveiling Affordable Delights</h1>
                        <p className="review-card-item-description">Discover a treasure trove of affordable experiences.From cost-effective travel destinations to savvy budget trips, explore the world of affordable enjoyment.</p>
                     </div>
                     <div className="review-container">
                        <img src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693397377/trust_yypdim.png" className="review-img" alt="review" />
                        <h1 className="review-card-item-heading">Making Informed Choices for Secure Travel</h1>
                        <p className="review-card-item-description">Prioritize trust and safety when making travel decisions. TravelGo ensure a secure and worry-free travel experience.</p>
                     </div>
                     <div className="review-container">
                        <img src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693397360/choose_laqh5y.png" className="review-img" alt="review" />
                        <h1 className="review-card-item-heading">The Joy of Variety</h1>
                        <p className="review-card-item-description">Embrace the freedom to explore diverse options, making decisions that lead to a fulfilling and vibrant journey.</p>
                     </div>
                </div>
            </div>
        </div>
    )
}
export default Reviews