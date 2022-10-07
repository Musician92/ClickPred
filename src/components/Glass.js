import './Glass.css'
import { useState } from 'react'
import axios from 'axios'

function Glass() {
  const [BuLa, setGender] = useState('')
  const [Kampagnentyp, setBsc] = useState('')
  const [Netzwerk, setWorkex] = useState('')
  const [Monat, setEtest_p] = useState('')
  const [Kosten, setMsc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = { BuLa, Kampagnentyp, Netzwerk, Monat, Kosten }

    axios
      .post('http://localhost:8080/prediction', params)
      .then((res) => {
        const data = res.data.data
        const parameters = JSON.stringify(params)
        const msg = `Prediction: ${data.prediction}\nParameters: ${parameters}`
        alert(msg)
      })
      .catch((error) => alert(`Error: ${error.message}`))
  }

  const reset = () => {
    setGender('')
    setBsc('')
    setWorkex('')
    setEtest_p('')
    setMsc('')
  }

  return (
    <div className="glass">
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h4>Dealer Data</h4>
        <div className="glass__form__group">
          <input
            id="gender"
            className="glass__form__input"
            placeholder="Bundesland (1-16)"
            required
            autoFocus
            min="1"
            max="16"
            pattern="[0-9]{0,1}"
            title="Bundesland muss Wert von 1-16 haben."
            type="number"
            value={BuLa}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="bsc"
            className="glass__form__input"
            placeholder="Kampagnentyp (1)"
            required
            min="1"
            max="1"
            type="number"
            title="Kampagnentyp muss 1 sein"
            pattern="[0-9]+([\.,][0-9]+)?"
            value={Kampagnentyp}
            onChange={(e) => setBsc(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="workex"
            className="glass__form__input"
            placeholder="Netzwerk (1-2)"
            required
            min="1"
            max="2"
            type="number"
            title="Netzwerk muss entweder (1 = Suchnetzwerk-Partner oder 2 = Google Suche) sein"
            value={Netzwerk}
            onChange={(e) => setWorkex(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="etest_p"
            className="glass__form__input"
            placeholder="Monat (1 - 12)"
            required
            min="1"
            max="12"
            type="number"
            title="Monat muss im Bereich (1 -12) liegen."
            pattern="[0-9]+([\.,][0-9]+)?"
            value={Monat}
            onChange={(e) => setEtest_p(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <input
            id="msc"
            className="glass__form__input"
            placeholder="Kosten"
            required
            type="number"
            title="Kosten eingeben"
            pattern="[0-9]+([\.,][0-9]+)?"
            step="0.01"
            value={Kosten}
            onChange={(e) => setMsc(e.target.value)}
          />
        </div>

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
            Submit
          </button>
        </div>
        <div className="glass__form__group">
          <button type="reset" className="glass__form__btn">
            Reset
          </button>
        </div>
        <div className="glass__form__group">
          <p>
          Test
          </p>
        </div>
      </form>
    </div>
  )
}

export default Glass
