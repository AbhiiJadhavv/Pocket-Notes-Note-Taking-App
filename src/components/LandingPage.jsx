import './LandingPage.css'
import PocketNotesIMG from '../assets/PocketNotesIMG.png'

function LandingPage() {
  return (
    <div className="landingPage">
        <img src={PocketNotesIMG} alt="pocket notes image"/>
        <p>Pocket Notes</p>
        <div className="paraText"><p>Send and receive messages without keeping your phone online.<br/> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p></div>
        <span><i className="material-icons">lock</i> end-to-end encrypted</span>
    </div>
  );
}

export default LandingPage;