import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/authContexts";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Plans() {
  const { userLoggedIn, currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Plans";
  }, []);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    const uid = currentUser?.uid;
    if (uid) {
      GetPlans(uid).then(data => setUserData(data));
    }
  }, [currentUser]);

  return (
    <>
      { userData && (
        <>
          <p>Email: {userData.email}</p>
          <p>Plans: {
            Object.keys(userData.plans).map(key => {
              return ( <p> {key} </p> )
            })
          }</p>
        </>
      )}
    </>
  )
}

async function GetPlans(uid) {
  const docRef = doc(db, "users", uid);
  const userSnap = await getDoc(docRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return { email: data.email, plans: data.plans };
  } else {
    return null;
  }
}

export default Plans;