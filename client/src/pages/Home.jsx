import UserProfilePicture from '../components/userProfilePicture';
import FriendReview from '../components/friendReviews';
import UserReviews from '../components/UserReviews';

function Home() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
      <div>
        <aside>
          <h1>Hello, Mack </h1>
          {/* <UserProfilePicture /> */}
          <table>
            <tr>
              <th>Friends</th>
              <th>Badges</th>
            </tr>
            <tr>
              <th>5</th>
              <th>3</th>
            </tr>
            <tr>
              <th>Reviews</th>
              <th>Likes</th>
            </tr>
            <tr>
              <th>8</th>
              <th>7</th>
            </tr>
          </table>
        </aside>
      </div>
        {/* <div>
          <h2>Your Reviews</h2>
            {/* <UserReviews
              // key={reviews.id}
              type= "reviews"
              reviews={userReviews}
              // isFriendsReviews={true}
              // username={reviews.username}
            /> 
        </div> */}
        <div>
          <h2>What Your Friends are Drinking:</h2>
            <FriendReview
              key={reviews.id}
              type= "reviews"
              reviews={userReviews}
              isFriendsReviews={true}
              username={reviews.username}
            />
        </div>
      </div>
    </div>
  );
}

export default Home;
