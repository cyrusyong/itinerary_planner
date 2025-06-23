import '../Styles/index.css'
import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard/SpotlightCard.jsx'
import SplitText from "./SplitText/SplitText.jsx"
import styles from '../Styles/Home.module.css'
import CardSwap, { Card } from "./CardSwap/CardSwap.jsx"
import RotatingText from "./RotatingText/RotatingText.jsx"

function Home() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.textTopContainer}>
            <SplitText
              text="Your Trip to "
              className={styles.splitText}
              delay={50}
              duration={0.6}
              ease="power3.out"
            />

            <RotatingText
              texts={["NC", "NYC", "Japan"]}
              rotationInterval={3500}
              staggerFrom={"first"}
              className={styles.rotatingText}
            />
          </div>
          <SplitText
            text="Expertly Guided"
            className={styles.splitText}
            delay={50}
            duration={0.6}
            ease="power3.out"
          />

          <Link to={"/app"} viewTransition>
          <button className={styles.spotlightButton}>
            <SpotlightCard spotlightColor='rgb(229, 229, 229)' className={styles.spotlightCard}>
            <h3 className={styles.launchText}>Launch App</h3>
          </SpotlightCard>
          </button>
          </Link>


        </div>

        <div className={styles.cardSwapContainer}>
          <CardSwap
            cardDistance={60}
            verticalDistance={120}
            delay={3500}
            pauseOnHover={false}
            width={"35vw"}
            height={"65vh"}
          >
            <Card>
              <img src="/shrine.jpg" alt="shrine" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/NC.jpg" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/timesquare.jpg" alt="times Square" className={styles.cardImage} />
            </Card>

          </CardSwap>
        </div>

      </div>
    </>
  )
}

export default Home
