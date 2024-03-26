import React from 'react'

export const Carousel = () => {
  return<>
     <div id="carouselExampleControls" className="carousel slide mb-5" data-bs-ride="carousel" style={{ maxWidth: '900px', height: '150px', margin: 'auto' }}>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://lh5.googleusercontent.com/p/AF1QipNeqHIesl8548Od80f3BvN-0DUsl_L9VbPlyk5P=w594-h343-n-k-no" className="d-block w-100" alt="Slide 1" height={150} width={900}/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Ooty</h5>
            <p>Queen of hills</p>
          </div>
        </div>
        <div className="carousel-item">
       <img src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 1" height={150} width={900}/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Tokyo, Japan</h5>
            <p>Experience the Blend of Tradition and Modernity</p>
          </div>
        </div>
        {/* Add more carousel items for additional destinations */}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </>
}
