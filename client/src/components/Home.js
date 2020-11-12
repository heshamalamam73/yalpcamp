import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/campgrounds";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    } else {
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo, props.history, redirect]);
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
