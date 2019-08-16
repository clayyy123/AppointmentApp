import React from 'react';

const UserCard = ({ user, bookUser }) => {
  const { image, email, company, name, title } = user;
  return (
    <div className="UserC">
      <div className="UserC__wrapper">
        <div className="UserC__img-wrapper">
          <img src={image} alt="profile" className="UserC__image" />
        </div>
        <div className="UserC__info-wrapper">
          <h1 className="UserC__name">{name}</h1>
          <h2 className="UserC__company">{company}</h2>
          <p className="UserC__title">{title}</p>
          <h3 className="UserC__contact">Contact:</h3>
          <p className="UserC__email">{email}</p>
          <button className="UserC__book-btn" onClick={() => bookUser(user)}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
