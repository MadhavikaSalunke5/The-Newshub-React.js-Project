import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url } = this.props;

    // Fallbacks
    title = title ? title : "No Title Available";
    description = description ? description : "No Description Available";
    imageUrl = imageUrl ? imageUrl : "https://via.placeholder.com/400x225?text=No+Image"; // 16:9 ratio
    url = url ? url : "#";

    return (
      <div className='my-3'>
        <div className="card h-100 shadow-sm">
          <div style={{ width: "100%", height: 0, paddingBottom: "56.25%", position: "relative" }}>
            <img
              src={imageUrl}
              alt="News"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "0.25rem",
                borderTopRightRadius: "0.25rem"
              }}
            />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              {title.length > 35 ? title.slice(0, 35) + "..." : title}
            </h5>
            <p className="card-text flex-grow-1">
              {description.length > 88 ? description.slice(0, 88) + "..." : description}
            </p>
            <a href={url} className="btn btn-primary mt-auto" target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
