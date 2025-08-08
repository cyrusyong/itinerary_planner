import { Link } from 'react-router-dom'
import SpotlightCard from '../spotlight-card/SpotlightCard.jsx'
import SplitText from "../split-text/SplitText.jsx"
import styles from './Home.module.css'
import CardSwap, { Card } from "../card-swap/CardSwap.jsx"
import RotatingText from "../rotating-text/RotatingText.jsx"

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
              texts={["Edinburgh", "New York", "Florence", "Shanghai", "London", "Venice", "Japan"]}
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
            skewAmount={3}
          >
            <Card>
              <img src="/japan.jpg" alt="japan" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/edinburgh.jpg" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/newyork.jpg" alt="newyork" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/florence.jpg" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/shanghai.jpg" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/london.jpg" className={styles.cardImage} />
            </Card>

            <Card>
              <img src="/venice.jpg" className={styles.cardImage} />
            </Card>

          </CardSwap>
        </div>

      </div>
    </>
  )
}

export default Home
