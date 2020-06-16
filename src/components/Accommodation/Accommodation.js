import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Rating from 'react-rating';

const Accommodation = ({
  id,
  name,
  location,
  imageUrl,
  description,
  likes,
  rooms,
  rating
}) => {
  const largeUrl = imageUrl[0].replace('load/', 'load/w_auto,h_200,c_scale/');
  return (
    <Container className="my-2 card-container">
      <a href={`/accommodation/${id}`}>
        <Card className="acc-card">
          <Row>
            <Col className="col-5">
              <Card.Img
                className="image"
                style={{ background: `url(${largeUrl})` }}
              />
            </Col>
            <Col className="col-7">
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <div className="acc-text">
                  <Card.Text>{location}</Card.Text>
                  <Rating
                    readonly
                    className="rating-container"
                    emptySymbol="fa fa-star-o fa-lg"
                    fullSymbol="fa fa-star fa-lg"
                    initialRating={rating === undefined ? 0 : rating}
                  />
                  <Card.Text>{rating === undefined ? 0 : rating}</Card.Text>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: `${description.substring(0, 160)}...`
                    }}
                  />
                  <div className="mt-1">
                    {likes} <i className="fa fa-thumbs-up"></i>
                  </div>
                  <div className="mt-1">{rooms} rooms</div>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </a>
    </Container>
  );
};

Accommodation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  imageUrl: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  rooms: PropTypes.string.isRequired
};

export default Accommodation;
