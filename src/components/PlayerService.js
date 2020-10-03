const PlayerService = {
  getTotalMinutes: (mins, matches) => {
      const totalSeconds = PlayerService.getTotalSeconds(mins, matches)
      const minutes = Math.trunc(totalSeconds / 60)
      const seconds = (totalSeconds % 60).toString().padStart(2,'0')
      return (mins !== undefined) ? minutes + ':' + seconds : ''
  },
  getTotalSeconds: (mins, matches) => {
    if (mins !== undefined && matches > 0) {
      const time = mins.split(':')
      const [minutes, seconds] = time
      return (minutes*60 + seconds*1) * matches
    } else {
      return 0
    }
  },
  getRatio: (made, attempted) => {
    if (attempted > 0) {
      const percentage = ((made / attempted) * 100).toFixed(2)
      return made+'/'+ attempted + ' ('+percentage+'%)'
    } else {
      return attempted !== undefined ? '0/0':''
    }
  },
  getRatioPerGame: (made, attempted, matches) => {
    if (attempted > 0) {
      const madePerMatch = (made / matches).toFixed(1)
      const attemptedPerMatch = (attempted / matches).toFixed(1)
      const percentage = ((made / attempted) * 100).toFixed(2)
      return madePerMatch+'/'+ attemptedPerMatch + ' ('+percentage+'%)'
    } else {
      return attempted !== undefined ? '0/0':''
    } 
  },
  getRatioPer40Minutes: (made, attempted, mins, matches) => {
    if (attempted > 0) {
      const seconds = PlayerService.getTotalSeconds(mins, matches)
      const madePer40Min = ((made / seconds) * 2400).toFixed(1)
      const attemptedPerMin = ((attempted / seconds) * 2400).toFixed(1)
      const percentage = ((made / attempted) * 100).toFixed(2)
      return madePer40Min+'/'+ attemptedPerMin + ' ('+percentage+'%)'
    } else {
      return attempted !== undefined ? '0/0':''
    }
  },
  getElementPer40Minutes: (element, mins, matches) => {
    if (mins !== undefined && matches > 0) {
      const seconds = PlayerService.getTotalSeconds(mins, matches)
      return ((element / seconds) * 2400).toFixed(2)
    } else {
      return mins !== undefined ? '0' : ''
    }
  },
  getNationality: (nationality, index) => {
    if (nationality !== undefined) {
      return nationality.split('/')[index - 1]
    } else {
      return ''
    }
  },
  hasDoubleNationality: (nationality) => {
    if (nationality !== undefined) {
      return nationality.includes('/')
    } else {
      return false
    }
  },
  getFlag: (nationality, countries) => {
    const listCountries = countries.filter(item => item.abr === nationality)
    if (listCountries.length === 1){
      const country = listCountries[0]
      return require('../assets/flags/'+country.flag)
    }
    else {
      return ""
    }
  },
  getEFG: (made2, made3, attempted2, attempted3) => {
    const efg = (made2 + made3 + 0.5 * made3) / (attempted2 + attempted3)
    return (efg * 100).toFixed(1)
  },
  getTS: (pts, attempted2, attempted3, attemptedFT) => {
    const ts = pts / (2 * (attempted2 + attempted3 + 0.44 * attemptedFT))
    return (ts * 100).toFixed(1)
  },
  get3Par: (attempted2, attempted3) => {
    const threePar = attempted3 / (attempted3 + attempted2)
    return (threePar * 100).toFixed(1)
  }
}

export default PlayerService