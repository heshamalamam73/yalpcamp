import { useSelector } from "react-redux";
import { useEffect } from "react";
import ClusterMap from './ClusterMap'
function Home(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuhenticated } = currentUser;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/campgrounds";
  useEffect(() => {
    if (isAuhenticated) {
      props.history.push(redirect);
    } else {
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [isAuhenticated, props.history, redirect, currentUser]);
  return (
    <div className="home">

      <div className="content">
        <h1>Welcome to yalp Camp</h1>
        <a className="buttonA" href="/campgrounds">
          All Campgrounds
        </a>

        <a className="buttonA" href="/signin">
          Sign in
        </a>
      </div>
    </div>
  );
}
export default Home;
